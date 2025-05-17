import { Config } from "next-i18n-router/dist/types";

const i18nConfig: Config = {
  locales: ["ru", "en"],
  defaultLocale: "ru",
  basePath: process.env.NEXT_BASE_PATH || ""
};

export default i18nConfig;
