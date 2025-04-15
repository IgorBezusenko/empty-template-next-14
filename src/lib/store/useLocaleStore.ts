import { DEFAULT_LOCALE, RESET_COOKIES } from "@/lib/constants";
import { AcceptedLocale } from "@/types";
import Cookies from "js-cookie";
import { create } from "zustand";

interface LocaleStoreState {
  locale: AcceptedLocale;
  setLocale: (locale: AcceptedLocale) => void;
}

const useLocaleStore = create<LocaleStoreState>((set) => ({
  locale: DEFAULT_LOCALE,
  setLocale: (data) => {
    Cookies.set("locale", data, {
      expires: RESET_COOKIES
    });
    set(() => ({
      locale: data
    }));
  }
}));

export default useLocaleStore;
