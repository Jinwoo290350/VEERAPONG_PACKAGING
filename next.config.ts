import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const ONE_YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  // Hide the Next.js dev badge so the brand mark is the only logo on screen
  devIndicators: false,
  poweredByHeader: false,
  images: {
    // AVIF first — typically 20–30% smaller than WebP for these product shots
    formats: ["image/avif", "image/webp"],
    // Product photography changes rarely; keep optimised variants for a month
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        // Static art is content-addressed by name; safe to cache hard
        source: "/photos/:path*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` },
        ],
      },
      {
        source: "/:file(poster.png|poster-preview.jpg|og.png|logo-mark.png|line-qr.png)",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
