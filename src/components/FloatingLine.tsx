import { useTranslations } from "next-intl";
import { company } from "@/data/company";

export default function FloatingLine() {
  const t = useTranslations("chat");

  return (
    <a
      href={company.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("lineLabel")}
      className="fixed bottom-5 right-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#06C755] text-white shadow-lg shadow-forest-950/20 transition hover:scale-105"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3.5c-5.1 0-9.2 3.4-9.2 7.6 0 3.8 3.3 6.9 7.8 7.5.3.1.7.2.8.5.1.2.1.6 0 .8l-.1.8c0 .2-.2.9.8.5s5.2-3.1 7.1-5.3c1.3-1.4 1.9-2.9 1.9-4.8 0-4.2-4.1-7.6-9.1-7.6zM8.4 13.3H6.6a.5.5 0 01-.5-.5V9.6a.5.5 0 011 0v2.7h1.3a.5.5 0 010 1zm1.8-.5a.5.5 0 01-1 0V9.6a.5.5 0 011 0v3.2zm4.4 0a.5.5 0 01-.9.3l-1.9-2.5v2.2a.5.5 0 01-1 0V9.6a.5.5 0 01.9-.3l1.9 2.5V9.6a.5.5 0 011 0v3.2zm3-2.1a.5.5 0 010 1H16.3v.6h1.3a.5.5 0 010 1h-1.8a.5.5 0 01-.5-.5V9.6a.5.5 0 01.5-.5h1.8a.5.5 0 010 1H16.3v.6h1.3z" />
      </svg>
    </a>
  );
}
