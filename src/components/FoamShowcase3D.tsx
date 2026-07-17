"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Labels {
  hint: string;
  explode: string;
  collapse: string;
  caption: string;
  layers: [string, string, string];
}

// Sheet geometry (px in 3D space)
const W = 280; // width  (x)
const D = 190; // depth  (z)
const T = 46; // sheet thickness (y) — chunky like a real EPE block
const LAYERS = 3;
const REST_ROT = { x: -22, y: -30 };

export default function FoamShowcase3D({ labels }: { labels: Labels }) {
  const [rot, setRot] = useState(REST_ROT);
  const [exploded, setExploded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const interacted = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const frame = useRef<number>(0);

  // Slow auto-spin until the visitor grabs it
  useEffect(() => {
    if (interacted.current) return;
    const tick = () => {
      if (!interacted.current) {
        setRot((r) => ({ ...r, y: r.y + 0.12 }));
        frame.current = requestAnimationFrame(tick);
      }
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  function stopAutoSpin() {
    interacted.current = true;
    cancelAnimationFrame(frame.current);
  }

  function onPointerDown(e: React.PointerEvent) {
    stopAutoSpin();
    setDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setRot((r) => ({
      x: Math.max(-75, Math.min(15, r.x - dy * 0.4)),
      y: r.y + dx * 0.5,
    }));
  }

  function toggleExplode() {
    stopAutoSpin();
    // Snap back to the reference angle so the layer labels line up
    setRot(REST_ROT);
    setExploded((v) => !v);
  }

  const gap = exploded ? 78 : 4;
  // Label vertical anchors matching the exploded layer positions
  const labelTops = ["13%", "44%", "75%"];

  return (
    <div className="mx-auto max-w-xl">
      <div
        role="img"
        aria-label={labels.caption}
        className={`relative mx-auto h-[400px] touch-none select-none sm:h-[440px] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ perspective: "1300px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {/* floor shadow */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[78%] h-14 w-72 -translate-x-1/2 rounded-[50%] bg-navy-950/15 blur-xl"
        />
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transformStyle: "preserve-3d",
            transition: dragging ? "none" : "transform 0.7s ease-in-out",
          }}
        >
          {Array.from({ length: LAYERS }).map((_, i) => (
            <FoamSheet
              key={i}
              yOffset={(i - (LAYERS - 1) / 2) * (T + gap)}
              topLayer={i === 0}
              partLayer={i === 1}
            />
          ))}
        </div>

        {/* Layer callouts — appear when exploded */}
        {labels.layers.map((text, i) => (
          <div
            key={i}
            className={`absolute right-0 flex max-w-[45%] items-center gap-2 transition-all duration-500 sm:max-w-[38%] ${
              exploded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
            style={{ top: labelTops[i], transitionDelay: `${i * 120 + 250}ms` }}
            aria-hidden={!exploded}
          >
            <span className="h-px w-6 shrink-0 bg-gold-500 sm:w-10" />
            <span className="rounded-xl border border-gold-200 bg-white/95 px-3 py-2 text-left text-[11px] font-semibold leading-snug text-navy-900 shadow-md backdrop-blur sm:text-xs">
              <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-black text-navy-950">
                {i + 1}
              </span>
              {text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-col items-center gap-3">
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 11V6a1.5 1.5 0 013 0v5m0-2.5a1.5 1.5 0 013 0V11m0-1a1.5 1.5 0 013 0v4c0 4-2.5 7-6.5 7S6 18.5 5 15.5L4 12a1.4 1.4 0 012.6-1L8 13.5V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {labels.hint}
        </p>
        <button
          type="button"
          onClick={toggleExplode}
          className="rounded-full bg-navy-950 px-6 py-2.5 text-sm font-bold text-gold-400 shadow-lg shadow-navy-950/20 transition hover:bg-navy-800"
        >
          {exploded ? labels.collapse : labels.explode}
        </button>
        <p className="text-xs font-medium text-slate-500">{labels.caption}</p>
      </div>
    </div>
  );
}

/* ── one EPE sheet as a 3D cuboid ─────────────────────────── */

// EPE side walls: soft pearly ridges like extruded foam
const sideTexture: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, #e6ebef 0 4px, #f7f9fa 4px 13px)",
  backgroundColor: "#f7f9fa",
  borderRadius: 12,
};

// EPE top: near-white with faint wide waves + soft sheen
const topTexture: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.9), transparent 55%), repeating-linear-gradient(100deg, rgba(176,192,203,0.16) 0 16px, rgba(255,255,255,0) 16px 38px)",
  backgroundColor: "#fafcfd",
  borderRadius: 14,
};

function FoamSheet({
  yOffset,
  topLayer,
  partLayer,
}: {
  yOffset: number;
  topLayer: boolean;
  partLayer: boolean;
}) {
  return (
    <div
      className="absolute transition-transform duration-700 ease-in-out"
      style={{
        transform: `translateY(${yOffset}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* top */}
      <Face w={W} h={D} transform={`rotateX(90deg) translateZ(${T / 2}px)`} style={topTexture}>
        {topLayer && (
          <>
            <div
              className="absolute left-[19%] top-1/2 h-[86px] w-[86px] -translate-y-1/2 rounded-full"
              style={{ background: "#cfd9e0", boxShadow: "inset 0 12px 18px rgba(10,27,51,0.28)" }}
            />
            <div
              className="absolute right-[13%] top-1/2 h-[58px] w-[108px] -translate-y-1/2 rounded-2xl"
              style={{ background: "#cfd9e0", boxShadow: "inset 0 12px 18px rgba(10,27,51,0.28)" }}
            />
          </>
        )}
        {partLayer && (
          <svg
            viewBox="0 0 24 24"
            className="absolute left-[19%] top-1/2 h-[72px] w-[72px] -translate-y-1/2 translate-x-[7px]"
            aria-hidden="true"
          >
            <path
              d="M12 2l1 3 2-1 1 2 3-1 .5 3H22v3l-3 .5 1 3-2 1 1 2-3 1v3h-3l-.5-3-3 1-1-2-2 1-1-3-3-.5v-3l3-1-1-2 2-1-1-3 3-.5V4h3l.5-2z"
              fill="#e0181f"
              opacity="0.9"
            />
            <circle cx="12" cy="12" r="4" fill="#fafcfd" />
          </svg>
        )}
      </Face>
      {/* bottom */}
      <Face w={W} h={D} transform={`rotateX(-90deg) translateZ(${T / 2}px)`} style={{ background: "#e3e9ed", borderRadius: 14 }} />
      {/* front / back */}
      <Face w={W} h={T} transform={`translateZ(${D / 2}px)`} style={sideTexture} />
      <Face w={W} h={T} transform={`rotateY(180deg) translateZ(${D / 2}px)`} style={sideTexture} />
      {/* left / right */}
      <Face w={D} h={T} transform={`rotateY(-90deg) translateZ(${W / 2}px)`} style={sideTexture} />
      <Face w={D} h={T} transform={`rotateY(90deg) translateZ(${W / 2}px)`} style={sideTexture} />
    </div>
  );
}

function Face({
  w,
  h,
  transform,
  style,
  children,
}: {
  w: number;
  h: number;
  transform: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 overflow-hidden"
      style={{
        width: w,
        height: h,
        transform: `translate(-50%, -50%) ${transform}`,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
