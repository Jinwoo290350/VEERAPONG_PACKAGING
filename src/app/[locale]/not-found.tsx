import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-7xl font-black text-navy-100">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-navy-950">{t("title")}</h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gold-500 px-7 py-3 font-bold text-navy-950 transition hover:bg-gold-400"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
