import {i18n} from "next-i18next";

/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    basePath: process.env.NEXT_BASE_PATH || "",
    reactStrictMode: true,
    swcMinify: true,
    //allow domains below for image src
    images: {
        domains: [
            "localhost",
            "192.168.25.55",
            "185.108.183.44",
            "185.108.183.44:8443",
            "10.106.0.5",
            "10.106.0.5:3000",
            "127.0.0.1",
            "127.0.0.1:3000",
            "127.0.0.1:9000",
        ]
    },
    //target directories below for eslint checking
    eslint: {
        dirs: ["pages", "components", "lib"]
    }, //remove console.log in production build
    compiler: {
        removeConsole: isDev
            ? false
            : {
                exclude: ["error"]
            }
    },
    i18n,
    output: "standalone",
    productionBrowserSourceMaps: false
};

export default nextConfig;
