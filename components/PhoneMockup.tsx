"use client";

import { motion } from "framer-motion";

type Screen = "home" | "lesson" | "progress" | "real";

interface PhoneMockupProps {
  screen?: Screen;
  className?: string;
  delay?: number;
  tilt?: boolean;
  width?: number;
}

const PW = 393;
const PH = 852;
const OUTER_R = 52;
const BEZEL = 11;
const SCREEN_R = 44;
const SCR_W = PW - BEZEL * 2;
const SCR_H = PH - BEZEL * 2;
const DI_W = 126;
const DI_H = 37;
const DI_X = (PW - DI_W) / 2;
const DI_Y = BEZEL + 8;

const SILVER = [
  { o: "0%",   c: "#7e8082" },
  { o: "8%",   c: "#c4c6c8" },
  { o: "22%",  c: "#e6e8ea" },
  { o: "38%",  c: "#f2f3f5" },
  { o: "50%",  c: "#ffffff" },
  { o: "62%",  c: "#eaebec" },
  { o: "78%",  c: "#d0d2d4" },
  { o: "92%",  c: "#b8babc" },
  { o: "100%", c: "#7a7c7e" },
];

export default function PhoneMockup({
  screen = "home",
  className = "",
  delay = 0,
  tilt = false,
  width = 220,
}: PhoneMockupProps) {
  const h = Math.round(width * (PH / PW));
  const s = width / PW;
  const r = OUTER_R * s;

  const shadow = tilt
    ? "drop-shadow(16px 32px 48px rgba(0,0,0,0.6)) drop-shadow(4px 8px 16px rgba(0,0,0,0.35))"
    : "drop-shadow(0 24px 48px rgba(0,0,0,0.5)) drop-shadow(0 6px 16px rgba(0,0,0,0.3))";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex-shrink-0 ${className}`}
      style={tilt ? { perspective: "1400px" } : {}}
    >
      <motion.div
        animate={tilt ? { rotateY: -32, rotateX: 8 } : {}}
        transition={{ duration: 1.2, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Phone shape — clips everything to rounded rect */}
        <div
          style={{
            position: "relative",
            width,
            height: h,
            borderRadius: r,
            overflow: "hidden",
            boxShadow: tilt
              ? "16px 32px 56px rgba(0,0,0,0.55), 4px 8px 16px rgba(0,0,0,0.3)"
              : "0 24px 56px rgba(0,0,0,0.5), 0 6px 16px rgba(0,0,0,0.25)",
          }}
        >
          {/* Screenshot */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/screens/${screen}.png`}
            alt="app screen"
            style={{
              position: "absolute",
              top: BEZEL * s,
              left: BEZEL * s,
              width: SCR_W * s,
              height: SCR_H * s,
              borderRadius: SCREEN_R * s,
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />

          {/* SVG: silver frame ring + Dynamic Island + details */}
          <svg
            viewBox={`0 0 ${PW} ${PH}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`sg-${screen}`} x1="0" y1="0" x2="1" y2="0">
                {SILVER.map((s) => <stop key={s.o} offset={s.o} stopColor={s.c} />)}
              </linearGradient>
              <mask id={`m-${screen}`}>
                <rect width={PW} height={PH} rx={OUTER_R} fill="white" />
                <rect x={BEZEL} y={BEZEL} width={SCR_W} height={SCR_H} rx={SCREEN_R} fill="black" />
              </mask>
            </defs>

            {/* Silver frame (only the bezel ring) */}
            <rect width={PW} height={PH} rx={OUTER_R} fill={`url(#sg-${screen})`} mask={`url(#m-${screen})`} />

            {/* Subtle top highlight */}
            <rect x={1} y={1} width={PW - 2} height={PH - 2} rx={OUTER_R - 1}
              fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1"
              mask={`url(#m-${screen})`} />

            {/* Screen inner shadow */}
            <rect x={BEZEL} y={BEZEL} width={SCR_W} height={SCR_H} rx={SCREEN_R}
              fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />

            {/* Dynamic Island */}
            <rect x={DI_X} y={DI_Y} width={DI_W} height={DI_H} rx={DI_H / 2} fill="#000" />
            <circle cx={DI_X + DI_W - 18} cy={DI_Y + DI_H / 2} r={5} fill="#0a0a0a" />

            {/* Speaker dots */}
            {[-9, -3, 3, 9, 15, 21, 27].map((dx, i) => (
              <circle key={i} cx={PW / 2 + dx} cy={PH - 7} r={1.5}
                fill="rgba(0,0,0,0.35)" mask={`url(#m-${screen})`} />
            ))}
          </svg>
        </div>

        {/* Right side face — visible when phone is tilted */}
        {tilt && (
          <div style={{
            position: "absolute",
            top: 0,
            left: width,
            width: 14,
            height: h,
            transformOrigin: "0 50%",
            transform: "rotateY(90deg)",
            borderRadius: `0 ${r}px ${r}px 0`,
            background: "linear-gradient(to right, #b0b2b4, #d8dadc, #c4c6c8, #a8aaac)",
          }} />
        )}

        {/* Top face */}
        {tilt && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height: 14,
            transformOrigin: "50% 0",
            transform: "rotateX(-90deg)",
            borderRadius: `${r}px ${r}px 0 0`,
            background: "linear-gradient(to bottom, #c8cacc, #e0e2e4, #c0c2c4)",
          }} />
        )}

        {/* Side buttons — outside overflow:hidden so they're visible */}
        {/* Left: Action, Vol+, Vol- */}
        {[
          { top: h * 0.215, ht: h * 0.05 },
          { top: h * 0.305, ht: h * 0.08 },
          { top: h * 0.405, ht: h * 0.08 },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute",
            left: -4, top: b.top, width: 4, height: b.ht,
            borderRadius: "2px 0 0 2px",
            background: "linear-gradient(to right, #8a8c8e, #d4d6d8, #eaecee)",
          }} />
        ))}
        {/* Right: Sleep/Wake */}
        <div style={{
          position: "absolute",
          right: -4, top: h * 0.355, width: 4, height: h * 0.115,
          borderRadius: "0 2px 2px 0",
          background: "linear-gradient(to left, #8a8c8e, #d4d6d8, #eaecee)",
        }} />
      </motion.div>

      {/* Ground shadow */}
      <div style={{
        position: "absolute",
        bottom: tilt ? -24 : -16,
        left: "50%",
        transform: tilt ? "translateX(-50%) skewX(-14deg)" : "translateX(-50%)",
        width: width * 0.6,
        height: 16,
        background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
        filter: "blur(10px)",
      }} />
    </motion.div>
  );
}
