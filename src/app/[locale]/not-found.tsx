import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-7xl font-black text-forest-100">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-forest-950">{t("title")}</h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-forest-700 px-7 py-3 font-bold text-white transition hover:bg-forest-800"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
