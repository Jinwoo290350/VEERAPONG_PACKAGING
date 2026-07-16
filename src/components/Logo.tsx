import Image from "next/image";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* Company VrP puzzle logo — on dark backgrounds it sits in a white chip */}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center ${
          dark ? "rounded-xl bg-white p-1" : ""
        }`}
      >
        <Image
          src="/logo.svg"
          alt="VrP Packaging logo"
          width={44}
          height={44}
          className="h-full w-full object-contain"
        />
      </span>
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
