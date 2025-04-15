"use client";

import initServerTranslations from "@/app/i18n";
import { configDefaultHeaders } from "@/lib/api";
import {
  ACCEPTED_LOCALES,
  DEFAULT_LOCALE,
  NAME_SPACES_COMMON
} from "@/lib/constants";
import useLocaleStore from "@/lib/store/useLocaleStore";
import { AcceptedLocale } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createInstance, Resource } from "i18next";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

export default function Providers({
  children,
  locale,
  resources,
  namespaces = NAME_SPACES_COMMON
}: {
  children: ReactNode;
  locale: string;
  resources: Resource;
  namespaces?: string[];
}) {
  const i18n = createInstance();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false
          }
        }
      })
  );
  const localeFromCookies = Cookies.get("locale");
  const setLocale = useLocaleStore((state) => state.setLocale);

  initServerTranslations(locale, namespaces, i18n, resources);

  useEffect(() => {
    if (ACCEPTED_LOCALES.includes(localeFromCookies as AcceptedLocale)) {
      setLocale(localeFromCookies as AcceptedLocale);
    } else {
      Cookies.set("locale", locale || DEFAULT_LOCALE);
    }
  }, [localeFromCookies, setLocale]);

  useEffect(() => {
    configDefaultHeaders(locale as AcceptedLocale);
  }, [locale]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </QueryClientProvider>
  );
}
