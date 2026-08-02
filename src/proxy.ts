import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run only where a locale decision is actually needed: the bare root and any
  // path that is not already locale-prefixed. Prefixed pages are static and are
  // served straight from the CDN without paying for a middleware hop.
  // "/" is handled by a static redirect in next.config.ts
  matcher: ["/((?!api|_next|_vercel|th/|en/|ja/|zh/|th$|en$|ja$|zh$|.*\\..*).*)"],
};
