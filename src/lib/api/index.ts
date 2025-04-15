import useServerErrorStore from "../store/serverErrorStore";
//TODO
// import { edsLogout, logout } from "./auth";
import {
  ACCEPT_LANGUAGE_MAP,
  AUTH_TOKEN_EXPIRATION_MESSAGE,
  AXIOS_ERROR_WHITE_LIST
} from "@/lib/constants";
import { AcceptedLocale, ServerError } from "@/types";
import axios, { AxiosError } from "axios";

const isDocker = process.env.NEXT_PUBLIC_DEV_ENV;
export const baseURL =
  isDocker === "local" ? "/local/procur-gateway" : "/procur-gateway";

export const customAxios = axios.create({
  // baseURL
});

export const configDefaultHeaders = (locale: AcceptedLocale) => {
  customAxios.defaults.headers.common["Accept-Language"] =
    ACCEPT_LANGUAGE_MAP[locale];
};

let redirectOccurred = false;
let hasLoggedOut = false;

function showAuthDialog() {
  //TODO
  // window.location.href = "/procur-next?showLoginDialog=true";
}

customAxios.interceptors.response.use(
  async (response) => {
    if (response.status === 302) {
      if (!redirectOccurred) {
        redirectOccurred = true;
        //TODO
        // await logout();
        showAuthDialog();
      }
    }
    return response;
  },
  async (error: AxiosError<ServerError>) => {
    if (redirectOccurred) {
      return Promise.reject(error);
    }

    const statusCode = error?.response?.status;
    const errorStore = useServerErrorStore.getState();
    if (
      error.response &&
      statusCode &&
      !AXIOS_ERROR_WHITE_LIST.some((partialUrl) =>
        error.config?.url?.includes(partialUrl)
      )
    ) {
      if (statusCode >= 400 && statusCode < 500) {
        switch (statusCode) {
          case 400:
            errorStore.setError({
              ...error.response.data,
              errorMessageShort: "Bad Request 400",
              errorMessageFull: error.response.data?.errorMessageFull
                ? error.response.data?.errorMessageFull
                : `Url: ${error.response.data.instance}`
            });
            break;
          case 401:
            // errorStore.setError({
            //   ...error.response.data,
            //   errorMessageShort: "Unauthorized 401",
            //   errorMessageFull: "Unauthorized"
            // });
            showAuthDialog();
            break;
          case 403:
            errorStore.setError({
              ...error.response.data,
              errorMessageShort: "Forbidden 403",
              errorMessageFull: "Url: " + error.response.data.instance
            });
            break;
          case 404:
            errorStore.setError({
              ...error.response.data,
              errorMessageShort: "Not Found 404",
              errorMessageFull: "Url: " + error.response.data.instance
            });
            break;
          case 405:
            errorStore.setError({
              ...error.response.data,
              errorMessageShort: "Method Not Allowed 405",
              errorMessageFull: "Url: " + error.response.data.instance
            });
            break;
          default:
            errorStore.setError({
              ...error.response.data,
              errorMessageShort: `Client Error ${statusCode}`,
              errorMessageFull: "Url: " + error.response.data.instance
            });
        }
      } else if (statusCode >= 500 && statusCode < 600) {
        switch (statusCode) {
          case 500: {
            const { message, businessException } = error.response.data;
            const isAuthTokenExpired =
              message === AUTH_TOKEN_EXPIRATION_MESSAGE;
            const isEDSTokenExpired = message.includes("EDS");
            const isTokenExpired = isAuthTokenExpired || isEDSTokenExpired;

            if (isTokenExpired && !hasLoggedOut) {
              hasLoggedOut = true;
              //TODO
              // await (isAuthTokenExpired ? logout() : edsLogout());
              showAuthDialog();
            } else if (businessException) {
              errorStore.setMsgError(
                error.response.data.errorMessageShort,
                businessException
              );
            } else {
              errorStore.setError({
                ...error.response.data,
                errorMessageShort: "Server Error 500",
                errorMessageFull: JSON.stringify(error.response.data)
              });
            }
            break;
          }
          case 502:
            errorStore.setError({
              ...error.response.data,
              errorMessageShort: "Bad Gateway 502",
              errorMessageFull: JSON.stringify(error.response.data)
            });
            break;
          case 503:
            errorStore.setError({
              ...error.response.data,
              errorMessageShort: "Service Unavailable 503",
              errorMessageFull: JSON.stringify(error.response.data)
            });
            break;
          default:
            errorStore.setError({
              ...error.response.data,
              errorMessageShort: `Server Error ${statusCode}`,
              errorMessageFull: JSON.stringify(error.response.data)
            });
        }
      }
    }
  }
);
