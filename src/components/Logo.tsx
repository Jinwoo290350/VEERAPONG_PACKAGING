import Image from "next/image";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* Company VrP puzzle logo — on dark backgrounds it sits in a white chip */}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl ${
          dark ? "bg-white p-0.5" : ""
        }`}
      >
        <Image
          src="/logo-mark.png"
          alt="Veerapong Packaging logo"
          width={44}
          height={44}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-[15px] font-extrabold tracking-wide ${dark ? "text-white" : "text-[#14683c]"}`}
        >
          VEERAPONG
        </span>
        <span
          className={`block text-[10px] font-semibold tracking-[0.28em] ${dark ? "text-emerald-400" : "text-[#2f9e5e]"}`}
        >
          PACKAGING
        </span>
      </span>
    </span>
  );
}
