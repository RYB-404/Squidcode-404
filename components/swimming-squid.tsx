"use client";

import React from "react";

export function SwimmingSquid() {
  return (
    <svg
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
      className="squid-creature"
      style={{
        position: "absolute",
        width: "clamp(180px, 22vw, 320px)",
        height: "auto",
        filter: "blur(0.5px) drop-shadow(0 0 40px hsl(185 75% 42% / 0.15))",
        opacity: 0.55,
      }}
    >
      <defs>
        <radialGradient id="squid-body-grad" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="hsl(185, 60%, 85%)" stopOpacity="0.7" />
          <stop offset="40%" stopColor="hsl(200, 50%, 75%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(220, 40%, 70%)" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="squid-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="hsl(185, 80%, 70%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(185, 80%, 70%)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="squid-head-highlight" cx="45%" cy="30%" r="35%">
          <stop offset="0%" stopColor="hsl(12, 80%, 85%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(12, 80%, 85%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow behind creature */}
      <ellipse cx="100" cy="130" rx="80" ry="90" fill="url(#squid-glow)" className="squid-glow-pulse" />

      {/* Main body / mantle */}
      <path
        d="M100 20 C60 20 38 60 38 100 C38 130 50 150 70 162 L130 162 C150 150 162 130 162 100 C162 60 140 20 100 20Z"
        fill="url(#squid-body-grad)"
        stroke="hsl(185, 50%, 75%)"
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />

      {/* Head highlight */}
      <ellipse cx="92" cy="70" rx="35" ry="45" fill="url(#squid-head-highlight)" />

      {/* Eyes */}
      <g className="squid-eyes">
        <ellipse cx="75" cy="95" rx="8" ry="10" fill="hsl(200, 40%, 80%)" fillOpacity="0.4" />
        <ellipse cx="125" cy="95" rx="8" ry="10" fill="hsl(200, 40%, 80%)" fillOpacity="0.4" />
        <ellipse cx="76" cy="94" rx="4" ry="5" fill="hsl(185, 70%, 55%)" fillOpacity="0.5" />
        <ellipse cx="126" cy="94" rx="4" ry="5" fill="hsl(185, 70%, 55%)" fillOpacity="0.5" />
        <ellipse cx="77" cy="93" rx="1.5" ry="2" fill="hsl(0, 0%, 100%)" fillOpacity="0.6" />
        <ellipse cx="127" cy="93" rx="1.5" ry="2" fill="hsl(0, 0%, 100%)" fillOpacity="0.6" />
      </g>

      {/* Lower body / skirt connecting to tentacles */}
      <path
        d="M70 162 Q60 175 55 195 M130 162 Q140 175 145 195 M100 162 L100 190"
        stroke="hsl(185, 45%, 75%)"
        strokeWidth="0.8"
        strokeOpacity="0.2"
        fill="none"
      />

      {/* Tentacles - each with independent wave animation */}
      {/* Left tentacle 1 (outermost) */}
      <path
        d="M55 195 Q45 220 35 245 Q25 270 30 300 Q33 315 40 310"
        stroke="hsl(185, 50%, 78%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.35"
        className="squid-tentacle squid-tentacle-1"
      />
      {/* Left tentacle 2 */}
      <path
        d="M62 190 Q55 215 48 240 Q42 265 50 290 Q55 305 60 300"
        stroke="hsl(190, 45%, 76%)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.35"
        className="squid-tentacle squid-tentacle-2"
      />
      {/* Left tentacle 3 */}
      <path
        d="M70 185 Q65 210 60 235 Q56 260 64 285 Q68 300 74 295"
        stroke="hsl(195, 40%, 74%)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.35"
        className="squid-tentacle squid-tentacle-3"
      />
      {/* Center-left tentacle */}
      <path
        d="M82 183 Q78 210 75 240 Q72 268 80 295 Q85 310 90 305"
        stroke="hsl(185, 40%, 72%)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.3"
        className="squid-tentacle squid-tentacle-4"
      />
      {/* Center tentacle */}
      <path
        d="M100 190 Q100 220 98 250 Q96 280 100 305 Q103 320 105 315"
        stroke="hsl(185, 45%, 70%)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.3"
        className="squid-tentacle squid-tentacle-5"
      />
      {/* Center-right tentacle */}
      <path
        d="M118 183 Q122 210 125 240 Q128 268 120 295 Q115 310 110 305"
        stroke="hsl(185, 40%, 72%)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.3"
        className="squid-tentacle squid-tentacle-6"
      />
      {/* Right tentacle 3 */}
      <path
        d="M130 185 Q135 210 140 235 Q144 260 136 285 Q132 300 126 295"
        stroke="hsl(195, 40%, 74%)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.35"
        className="squid-tentacle squid-tentacle-7"
      />
      {/* Right tentacle 2 */}
      <path
        d="M138 190 Q145 215 152 240 Q158 265 150 290 Q145 305 140 300"
        stroke="hsl(190, 45%, 76%)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.35"
        className="squid-tentacle squid-tentacle-8"
      />
      {/* Right tentacle 1 (outermost) */}
      <path
        d="M145 195 Q155 220 165 245 Q175 270 170 300 Q167 315 160 310"
        stroke="hsl(185, 50%, 78%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.35"
        className="squid-tentacle squid-tentacle-9"
      />

      {/* Small trailing particles near tentacles */}
      <circle cx="35" cy="310" r="2" fill="hsl(185, 60%, 75%)" fillOpacity="0.2" className="squid-trail-particle squid-trail-1" />
      <circle cx="60" cy="300" r="1.5" fill="hsl(185, 60%, 75%)" fillOpacity="0.15" className="squid-trail-particle squid-trail-2" />
      <circle cx="100" cy="320" r="1.8" fill="hsl(185, 60%, 75%)" fillOpacity="0.18" className="squid-trail-particle squid-trail-3" />
      <circle cx="140" cy="300" r="1.5" fill="hsl(185, 60%, 75%)" fillOpacity="0.15" className="squid-trail-particle squid-trail-4" />
      <circle cx="170" cy="310" r="2" fill="hsl(185, 60%, 75%)" fillOpacity="0.2" className="squid-trail-particle squid-trail-5" />
    </svg>
  );
}
