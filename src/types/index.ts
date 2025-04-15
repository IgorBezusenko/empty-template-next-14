export type AcceptedLocale = "en" | "ru";
export type SortDirection = "ASC" | "DESC";

export interface ServerError {
  args: null;
  businessException: boolean;
  errorMessageFull: string;
  errorMessageShort: string;
  key: null;
  message: string;
  translated: boolean;
  instance?: string | undefined;
}
