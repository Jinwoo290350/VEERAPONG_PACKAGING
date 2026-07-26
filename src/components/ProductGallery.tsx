"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { darkBackdropPhotos } from "@/data/products";

// Auto-advancing, swipeable photo carousel. Reusable for any category.
export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ startX: number; active: boolean }>({ startX: 0, active: false });

  const go = useCallback(
    (next: number) => setIdx((next + images.length) % images.length),
    [images.length],
  );

  // Auto-slide every 4s, pausing on hover/drag
  useEffect(() => {
    if (paused || images.length < 2) return;
    const t = setInterval(() => go(idx + 1), 4000);
    return () => clearInterval(t);
  }, [idx, paused, go, images.length]);

  function onPointerDown(e: React.PointerEvent) {
    drag.current = { startX: e.clientX, active: true };
    setPaused(true);
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.active = false;
    if (dx < -50) go(idx + 1);
    else if (dx > 50) go(idx - 1);
    setPaused(false);
  }

  if (!images.length) return null;

  return (
    <div
      className="group relative mx-auto max-w-3xl touch-pan-y select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-2 shadow-xl shadow-forest-900/5"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current.active = false)}
      >
        <div className="relative h-72 overflow-hidden rounded-2xl bg-white sm:h-[420px]">
          <div
            className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.22,.8,.25,1)]"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {images.map((src, i) => {
              const dark = darkBackdropPhotos.has(src);
              return (
                <div
                  key={src}
                  className={`relative h-full w-full shrink-0 ${dark ? "bg-forest-950" : ""}`}
                >
                  <Image
                    src={src}
                    alt={`${alt} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 48rem"
                    className={`object-contain ${dark ? "" : "mix-blend-multiply"}`}
                    priority={i === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <>
          {/* arrows */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(idx - 1)}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-forest-950/60 text-white opacity-0 backdrop-blur transition hover:bg-forest-950/85 group-hover:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(idx + 1)}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-forest-950/60 text-white opacity-0 backdrop-blur transition hover:bg-forest-950/85 group-hover:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* dots */}
          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === idx ? "w-7 bg-forest-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
