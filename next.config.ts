import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { BASE_PATH } from "./src/lib/base-path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
