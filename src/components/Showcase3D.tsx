"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export type ShowcaseVariant = "foam" | "ppboard" | "bubble";

interface Labels {
  hint: string;
  explode: string;
  collapse: string;
  caption: string;
  layers: [string, string, string];
}

const REST_ROT = { x: -22, y: -30 };

// Vertical anchor of each numbered callout, tuned per scene's exploded layout
const LABEL_TOPS: Record<ShowcaseVariant, [string, string, string]> = {
  foam: ["13%", "44%", "75%"],
  bubble: ["22%", "45%", "68%"],
  ppboard: ["8%", "42%", "76%"],
};

export default function Showcase3D({
  variant,
  labels,
}: {
  variant: ShowcaseVariant;
  labels: Labels;
}) {
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

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        role="img"
        aria-label={labels.caption}
        className={`relative mx-auto h-[380px] touch-none select-none sm:h-[420px] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
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
          {variant === "foam" && <FoamScene exploded={exploded} />}
          {variant === "bubble" && <BubbleScene exploded={exploded} />}
          {variant === "ppboard" && <PpboardScene exploded={exploded} />}
        </div>

        {/* Layer callouts — appear when exploded */}
        {labels.layers.map((text, i) => (
          <div
            key={i}
            className={`absolute right-0 flex max-w-[45%] items-center gap-2 transition-all duration-500 sm:max-w-[38%] ${
              exploded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
            style={{ top: LABEL_TOPS[variant][i], transitionDelay: `${i * 120 + 250}ms` }}
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

/* ══ shared primitives ══════════════════════════════════════ */

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
  style?: CSSProperties;
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

// Flat slab: 6 faces, sized w × d, thickness t, vertically offset by yOffset
function Slab({
  w,
  d,
  t,
  yOffset,
  topStyle,
  sideStyle,
  bottomStyle,
  topChildren,
}: {
  w: number;
  d: number;
  t: number;
  yOffset: number;
  topStyle: CSSProperties;
  sideStyle: CSSProperties;
  bottomStyle: CSSProperties;
  topChildren?: ReactNode;
}) {
  return (
    <div
      className="absolute transition-transform duration-700 ease-in-out"
      style={{ transform: `translateY(${yOffset}px)`, transformStyle: "preserve-3d" }}
    >
      <Face w={w} h={d} transform={`rotateX(90deg) translateZ(${t / 2}px)`} style={topStyle}>
        {topChildren}
      </Face>
      <Face w={w} h={d} transform={`rotateX(-90deg) translateZ(${t / 2}px)`} style={bottomStyle} />
      <Face w={w} h={t} transform={`translateZ(${d / 2}px)`} style={sideStyle} />
      <Face w={w} h={t} transform={`rotateY(180deg) translateZ(${d / 2}px)`} style={sideStyle} />
      <Face w={d} h={t} transform={`rotateY(-90deg) translateZ(${w / 2}px)`} style={sideStyle} />
      <Face w={d} h={t} transform={`rotateY(90deg) translateZ(${w / 2}px)`} style={sideStyle} />
    </div>
  );
}

function PartGear({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2l1 3 2-1 1 2 3-1 .5 3H22v3l-3 .5 1 3-2 1 1 2-3 1v3h-3l-.5-3-3 1-1-2-2 1-1-3-3-.5v-3l3-1-1-2 2-1-1-3 3-.5V4h3l.5-2z"
        fill="#e0181f"
        opacity="0.9"
      />
      <circle cx="12" cy="12" r="4" fill="#fafcfd" />
    </svg>
  );
}

/* ══ foam: die-cut EPE stack ════════════════════════════════ */

const FOAM_W = 280;
const FOAM_D = 190;
const FOAM_T = 46;

const foamSide: CSSProperties = {
  backgroundImage: "repeating-linear-gradient(0deg, #e6ebef 0 4px, #f7f9fa 4px 13px)",
  backgroundColor: "#f7f9fa",
  borderRadius: 12,
};

const foamTop: CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.9), transparent 55%), repeating-linear-gradient(100deg, rgba(176,192,203,0.16) 0 16px, rgba(255,255,255,0) 16px 38px)",
  backgroundColor: "#fafcfd",
  borderRadius: 14,
};

function FoamScene({ exploded }: { exploded: boolean }) {
  const gap = exploded ? 78 : 4;
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Slab
          key={i}
          w={FOAM_W}
          d={FOAM_D}
          t={FOAM_T}
          yOffset={(i - 1) * (FOAM_T + gap)}
          topStyle={foamTop}
          sideStyle={foamSide}
          bottomStyle={{ background: "#e3e9ed", borderRadius: 14 }}
          topChildren={
            i === 0 ? (
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
            ) : i === 1 ? (
              <PartGear className="absolute left-[19%] top-1/2 h-[72px] w-[72px] -translate-y-1/2 translate-x-[7px]" />
            ) : undefined
          }
        />
      ))}
    </>
  );
}

/* ══ bubble: air-bubble sheets around a part ════════════════ */

const BUB_W = 280;
const BUB_D = 190;
const BUB_T = 16;

const bubbleTop: CSSProperties = {
  backgroundImage:
    "radial-gradient(circle, rgba(148,178,196,0.5) 5px, rgba(255,255,255,0) 6.5px)",
  backgroundSize: "20px 20px",
  backgroundColor: "#f2f7fa",
  borderRadius: 12,
};

const bubbleSide: CSSProperties = {
  backgroundImage: "repeating-linear-gradient(90deg, #dce6ec 0 6px, #eef4f7 6px 14px)",
  backgroundColor: "#eef4f7",
  borderRadius: 8,
};

function BubbleScene({ exploded }: { exploded: boolean }) {
  const gap = exploded ? 70 : 3;
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Slab
          key={i}
          w={BUB_W}
          d={BUB_D}
          t={BUB_T}
          yOffset={(i - 1) * (BUB_T + gap)}
          topStyle={bubbleTop}
          sideStyle={bubbleSide}
          bottomStyle={{ background: "#e2ebf0", borderRadius: 12 }}
          topChildren={
            i === 1 ? (
              <PartGear className="absolute left-1/2 top-1/2 h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2" />
            ) : undefined
          }
        />
      ))}
    </>
  );
}

/* ══ ppboard: open returnable box with lifting partition ════ */

const BOX_W = 260;
const BOX_D = 180;
const BOX_H = 116; // wall height
const FLOOR_T = 10;

const flute = (base: string, stripe: string): CSSProperties => ({
  backgroundImage: `repeating-linear-gradient(90deg, ${stripe} 0 3px, rgba(0,0,0,0) 3px 10px)`,
  backgroundColor: base,
  borderRadius: 6,
});

const wallStyle: CSSProperties = {
  ...flute("#2456a8", "rgba(255,255,255,0.10)"),
  backfaceVisibility: "visible",
};

const partitionStyle: CSSProperties = {
  ...flute("#7fa8d9", "rgba(255,255,255,0.16)"),
  backfaceVisibility: "visible",
};

function PpboardScene({ exploded }: { exploded: boolean }) {
  const partitionY = exploded ? -152 : -6;
  return (
    <>
      {/* floor slab */}
      <Slab
        w={BOX_W}
        d={BOX_D}
        t={FLOOR_T}
        yOffset={BOX_H / 2 - FLOOR_T / 2}
        topStyle={{ background: "#1d3a62", borderRadius: 6 }}
        sideStyle={flute("#1d3a62", "rgba(255,255,255,0.08)")}
        bottomStyle={{ background: "#122a4a", borderRadius: 6 }}
      />
      {/* four walls */}
      <Face w={BOX_W} h={BOX_H} transform={`translateZ(${BOX_D / 2 - 3}px)`} style={wallStyle} />
      <Face w={BOX_W} h={BOX_H} transform={`rotateY(180deg) translateZ(${BOX_D / 2 - 3}px)`} style={wallStyle} />
      <Face w={BOX_D} h={BOX_H} transform={`rotateY(-90deg) translateZ(${BOX_W / 2 - 3}px)`} style={wallStyle} />
      <Face w={BOX_D} h={BOX_H} transform={`rotateY(90deg) translateZ(${BOX_W / 2 - 3}px)`} style={wallStyle} />
      {/* cross partition — lifts out when exploded */}
      <div
        className="absolute transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(${partitionY}px)`, transformStyle: "preserve-3d" }}
      >
        <Face w={BOX_W - 20} h={BOX_H - 26} transform="translateZ(0px)" style={partitionStyle} />
        <Face w={BOX_D - 20} h={BOX_H - 26} transform="rotateY(90deg) translateZ(0px)" style={partitionStyle} />
      </div>
    </>
  );
}
