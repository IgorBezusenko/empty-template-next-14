import { AcceptedLocale } from "@/types";

export const DATE_FORMAT_DATEPICKER_WITH_LOCALE = "LLL dd, y";
export const ISO_DATE_FORMAT = "yyyy-MM-dd";
export const NAME_SPACES_COMMON = ["common"];

export const DEFAULT_LOCALE: AcceptedLocale = "ru";
export const ACCEPTED_LOCALES: AcceptedLocale[] = ["ru", "en"];
export const ACCEPT_LANGUAGE_MAP: Record<AcceptedLocale, string> = {
  ru: "ru-RU,ru",
  en: "en-US,en"
};

export const RESET_COOKIES = 24;

export const AXIOS_ERROR_WHITE_LIST = [];
export const AUTH_TOKEN_EXPIRATION_MESSAGE = "[invalid_grant] ";
