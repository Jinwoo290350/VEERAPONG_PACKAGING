export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="2" width="36" height="36" rx="8" fill="#122a4a" />
        {/* isometric box mark */}
        <path d="M20 8l10 5.5v11L20 30l-10-5.5v-11L20 8z" fill="#1d3a62" />
        <path d="M20 8l10 5.5L20 19l-10-5.5L20 8z" fill="#f0a421" />
        <path d="M20 19v11l10-5.5v-11L20 19z" fill="#f6b83d" opacity="0.55" />
        <path d="M20 19v11l-10-5.5v-11L20 19z" fill="#f0a421" opacity="0.3" />
      </svg>
      <span className="leading-tight">
        <span
          className={`block text-[15px] font-extrabold tracking-wide ${dark ? "text-white" : "text-navy-900"}`}
        >
          VEERAPONG
        </span>
        <span
          className={`block text-[10px] font-semibold tracking-[0.28em] ${dark ? "text-gold-400" : "text-gold-600"}`}
        >
          PACKAGING
        </span>
      </span>
    </span>
  );
}
