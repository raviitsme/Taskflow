import React from "react";

export default function StatsCard({ title, value, color = "text-primary", icon }) {
  return (
    <div 
      className="
        group relative w-full overflow-hidden
        rounded-4xl border border-white/5
        bg-linear-to-b from-white/5 to-transparent
        p-7 backdrop-blur-md
        transition-all duration-500 ease-out

        /* Premium Hover Effects */
        hover:-translate-y-1.5
        hover:border-white/10
        hover:bg-white/[0.07]
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
        cursor-pointer
      "
    >
      {/* 1. Top Border Accent (Matches the card's dynamic text color) */}
      <div
        className={`
          absolute left-0 top-0 h-0.5 w-0
          bg-current opacity-70 transition-all duration-500 ease-out
          group-hover:w-full ${color}
        `}
      />

      {/* 2. Top Section: Title & Optional Icon */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium tracking-wide uppercase text-white/40 transition-colors group-hover:text-white/50">
          {title}
        </p>

        {/* Decorative subtle icon container if passed */}
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/2 text-white/50 transition-all duration-500 group-hover:scale-110 group-hover:border-white/10 group-hover:text-white">
            {icon}
          </div>
        )}
      </div>

      {/* 3. Value Section */}
      <div className="mt-4 flex items-baseline gap-2">
        <h2 
          className={`
            text-4xl font-bold tracking-tight bg-clip-text
            transition-all duration-500 group-hover:scale-[1.02] origin-left
            ${color}
          `}
        >
          {value}
        </h2>
      </div>

      {/* 4. Soft Ambient Under-Glow on Hover */}
      <div
        className={`
          absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2
          rounded-full bg-current blur-2xl
          opacity-0 transition-opacity duration-500 pointer-events-none
          group-hover:opacity-15 ${color}
        `}
      />
    </div>
  );
}