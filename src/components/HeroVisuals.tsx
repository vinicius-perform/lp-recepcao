import React from 'react';

export const HeroVisuals: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Editorial Watermark Monogram RV (Background) */}
      <div className="hidden lg:block absolute -top-12 -left-16 opacity-[0.035] transform -rotate-6">
        <span className="font-serif italic font-light text-[420px] text-graphite leading-none select-none tracking-tighter">
          RV
        </span>
      </div>

      {/* Golden Architectural Arches & Curves */}
      <svg
        className="hidden md:block absolute top-10 right-0 w-[580px] h-[640px] opacity-[0.25] text-gold pointer-events-none"
        viewBox="0 0 580 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer elegant arch */}
        <path
          d="M 280 20 C 440 20, 560 140, 560 300 L 560 620"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Inner concentric arch */}
        <path
          d="M 330 60 C 460 60, 520 160, 520 300 L 520 620"
          stroke="#C79A5C"
          strokeWidth="1.2"
        />
        {/* Radial decorative compass circle */}
        <circle cx="330" cy="60" r="4" fill="#A77943" />
        <circle cx="520" cy="300" r="3" fill="#D4AD74" />
      </svg>

      {/* Delicate Champagne Radial Ambient Light */}
      <div className="hidden md:block absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-champagne-light/50 rounded-full blur-3xl opacity-40" />
      <div className="hidden md:block absolute -bottom-20 right-10 w-[400px] h-[400px] bg-gold-soft/10 rounded-full blur-2xl opacity-50" />
    </div>
  );
};
