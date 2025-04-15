"use client";

import i18nConfig from "../../../i18nConfig";
import useLocaleStore from "@/lib/store/useLocaleStore";
import { AcceptedLocale } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const setLocale = useLocaleStore((state) => state.setLocale);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router

    setLocale(newLocale as AcceptedLocale);
    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
    >
      <option value='en'>En</option>
      <option value='ru'>Ru</option>
    </select>
  );
}
