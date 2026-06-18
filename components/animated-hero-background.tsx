"use client";

import React from "react";
import { SwimmingSquid } from "./swimming-squid";

function FloatingParticle({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) {
  return (
    <div
      className="hero-particle"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, hsl(185 70% 60% / 0.35), hsl(185 70% 60% / 0))`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

function CurrentLine({ delay, duration, pathD, viewBox }: { delay: number; duration: number; pathD: string; viewBox: string }) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      preserveAspectRatio="none"
    >
      <path
        d={pathD}
        fill="none"
        stroke="hsl(185 50% 55% / 0.06)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="hero-current-line"
        style={{
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    </svg>
  );
}

function GlowBlob({ className }: { className: string }) {
  return <div className={`hero-glow-blob ${className}`} />;
}

export function AnimatedHeroBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Glow blobs - slow drifting gradients */}
      <GlowBlob className="hero-glow-blob-cyan" />
      <GlowBlob className="hero-glow-blob-coral" />
      <GlowBlob className="hero-glow-blob-plum" />

      {/* Subtle dot-grid pattern */}
      <div
        className="absolute inset-0 hero-dot-grid"
        style={{
          backgroundImage: `radial-gradient(hsl(220 15% 40%) 0.5px, transparent 0.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ocean current lines */}
      <CurrentLine
        delay={0}
        duration={12}
        pathD="M-50 300 Q200 250 500 320 Q800 380 1100 300 Q1300 240 1500 290"
        viewBox="0 0 1500 600"
      />
      <CurrentLine
        delay={2}
        duration={15}
        pathD="M-30 400 Q300 350 600 420 Q900 470 1200 400 Q1400 350 1600 390"
        viewBox="0 0 1600 700"
      />
      <CurrentLine
        delay={4}
        duration={18}
        pathD="M-80 500 Q250 450 550 520 Q850 580 1150 510 Q1350 460 1550 500"
        viewBox="0 0 1600 800"
      />

      {/* Floating particles - more on desktop, fewer on mobile */}
      <div className="hidden sm:block">
        {[
          { delay: 0, duration: 14, x: "8%", y: "15%", size: 4 },
          { delay: 2, duration: 16, x: "22%", y: "60%", size: 3 },
          { delay: 4, duration: 12, x: "75%", y: "20%", size: 5 },
          { delay: 1, duration: 18, x: "85%", y: "55%", size: 3 },
          { delay: 3, duration: 15, x: "55%", y: "75%", size: 4 },
          { delay: 5, duration: 13, x: "35%", y: "40%", size: 3 },
          { delay: 7, duration: 17, x: "65%", y: "85%", size: 4 },
          { delay: 6, duration: 14, x: "15%", y: "80%", size: 3 },
          { delay: 8, duration: 16, x: "45%", y: "25%", size: 4 },
          { delay: 9, duration: 19, x: "92%", y: "35%", size: 3 },
        ].map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>
      {/* Mobile: fewer particles */}
      <div className="sm:hidden">
        {[
          { delay: 0, duration: 16, x: "15%", y: "20%", size: 3 },
          { delay: 3, duration: 18, x: "70%", y: "30%", size: 4 },
          { delay: 5, duration: 14, x: "50%", y: "70%", size: 3 },
          { delay: 2, duration: 17, x: "80%", y: "60%", size: 3 },
        ].map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* The swimming squid */}
      <div className="hero-squid-container">
        <SwimmingSquid />
      </div>

      {/* Cream overlay to keep center readable */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 40%, hsl(40 33% 97% / 0.7), hsl(40 33% 97% / 0) 70%)`,
        }}
      />
    </div>
  );
}
