import React from 'react';

export const IndiaGateGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width="68"
        height="82"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80 drop-shadow-md"
      >
        <defs>
          <linearGradient id="gate-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5D0A9" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E0A96D" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C68B45" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        {/* Top Dome / Pedestal */}
        <path d="M42 8 L58 8 L55 14 L45 14 Z" fill="url(#gate-grad)" />
        {/* Top Cornice */}
        <rect x="25" y="14" width="50" height="6" rx="1" fill="url(#gate-grad)" />
        <rect x="20" y="20" width="60" height="10" rx="1" fill="url(#gate-grad)" />
        <rect x="22" y="30" width="56" height="4" fill="#9C6B30" opacity="0.6" />
        
        {/* Left Pillar */}
        <rect x="22" y="34" width="22" height="74" fill="url(#gate-grad)" />
        <rect x="20" y="108" width="26" height="8" rx="1" fill="url(#gate-grad)" />
        
        {/* Right Pillar */}
        <rect x="56" y="34" width="22" height="74" fill="url(#gate-grad)" />
        <rect x="54" y="108" width="26" height="8" rx="1" fill="url(#gate-grad)" />

        {/* Central Arch */}
        <path
          d="M44 108 V64 C44 50 56 50 56 64 V108 Z"
          fill="#1C2B40"
          opacity="0.85"
        />
        <path
          d="M44 64 C44 50 56 50 56 64"
          stroke="#F5D0A9"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Side decorative small arches */}
        <path d="M28 85 V70 C28 66 38 66 38 70 V85 Z" fill="#1C2B40" opacity="0.5" />
        <path d="M62 85 V70 C62 66 72 66 72 70 V85 Z" fill="#1C2B40" opacity="0.5" />

        {/* Base Steps */}
        <rect x="14" y="116" width="72" height="4" rx="1" fill="url(#gate-grad)" />
      </svg>
    </div>
  );
};

export const ParliamentGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        width="110"
        height="44"
        viewBox="0 0 160 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-45 hover:opacity-75 transition-opacity"
      >
        {/* Central Domed Rotunda of Sansad Bhavan */}
        <path d="M70 12 C70 4 90 4 90 12 Z" fill="#94A3B8" />
        <rect x="74" y="12" width="12" height="6" fill="#94A3B8" />
        
        {/* Upper tier */}
        <rect x="25" y="18" width="110" height="4" rx="1" fill="#94A3B8" />

        {/* Colonade / Pillars */}
        {Array.from({ length: 24 }).map((_, i) => (
          <rect
            key={i}
            x={28 + i * 4.4}
            y={22}
            width="1.8"
            height="24"
            fill="#CBD5E1"
            opacity="0.75"
          />
        ))}

        {/* Main base */}
        <rect x="20" y="46" width="120" height="6" rx="1" fill="#94A3B8" />
        <rect x="15" y="52" width="130" height="4" rx="1" fill="#64748B" />
      </svg>
      <div className="mt-1 flex items-center justify-center gap-2 text-[9px] font-mono tracking-[0.22em] text-slate-400 uppercase font-semibold">
        <span>INTEGRITY</span>
        <span>|</span>
        <span>SECURITY</span>
        <span>|</span>
        <span>JUSTICE</span>
      </div>
    </div>
  );
};
