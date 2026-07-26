import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Hide the Next.js dev badge so the brand mark is the only logo on screen
  devIndicators: false,
};

export default withNextIntl(nextConfig);
