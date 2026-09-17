import React from 'react';
import { AshokaChakra } from './AshokaChakra';

export const TricolorRibbon: React.FC = () => {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden z-10 select-none">
      {/* Subtle flowing tricolor ribbons */}
      <svg
        className="w-full h-24 md:h-32 opacity-90"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="saffron-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9933" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFAE52" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="white-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F8FAFC" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#138808" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#19990B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0E6805" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Saffron layer (top ribbon) */}
        <path
          d="M0 65 Q 360 40 720 58 T 1440 45 L 1440 60 Q 1080 75 720 70 T 0 78 Z"
          fill="url(#saffron-grad)"
        />

        {/* White layer (middle ribbon) */}
        <path
          d="M0 77 Q 360 52 720 70 T 1440 58 L 1440 72 Q 1080 87 720 82 T 0 90 Z"
          fill="url(#white-grad)"
        />

        {/* Green layer (bottom ribbon) */}
        <path
          d="M0 89 Q 360 64 720 82 T 1440 70 L 1440 98 Q 1080 110 720 102 T 0 115 Z"
          fill="url(#green-grad)"
        />
      </svg>

      {/* Subtle Ashoka Chakra placed gracefully over the ribbon wave near lower center area */}
      <div className="absolute bottom-4 left-[48%] md:left-[50%] -translate-x-1/2 opacity-75 hover:opacity-100 transition-opacity">
        <AshokaChakra size={44} color="#002663" animate={true} />
      </div>
    </div>
  );
};
