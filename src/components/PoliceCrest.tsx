import React from 'react';

interface PoliceCrestProps {
  size?: number;
  className?: string;
}

export const PoliceCrest: React.FC<PoliceCrestProps> = ({ size = 48, className = '' }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 60 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Outer Shield with Dark Navy Blue Fill */}
        <path
          d="M30 2 L54 10 V34 C54 50 43 62 30 68 C17 62 6 50 6 34 V10 L30 2 Z"
          fill="#0B2144"
        />
        {/* Inner Shield Border in Light Gold/Silver */}
        <path
          d="M30 5 L51 12 V34 C51 47.5 41.5 58 30 63.5 C18.5 58 9 47.5 9 34 V12 L30 5 Z"
          stroke="#38BDF8"
          strokeWidth="1"
          strokeOpacity="0.7"
          fill="none"
        />

        {/* Central 8-Pointed Star / Police Star Badge */}
        <g transform="translate(30, 32)">
          {/* Star rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <polygon
              key={deg}
              points="0,-16 2.5,-6 0,0 -2.5,-6"
              fill="#F8FAFC"
              transform={`rotate(${deg})`}
              opacity="0.95"
            />
          ))}

          {/* Central Blue Ring */}
          <circle cx="0" cy="0" r="7" fill="#0B2144" stroke="#FFFFFF" strokeWidth="1.2" />
          
          {/* Inner Ashoka Chakra / Star Center */}
          <circle cx="0" cy="0" r="4.5" fill="#38BDF8" />
          <circle cx="0" cy="0" r="2" fill="#FFFFFF" />

          {/* Laurel / Wreath Leaves surrounding lower half */}
          <path
            d="M-14 2 C-15 10 -8 16 0 16 C8 16 15 10 14 2"
            stroke="#F8FAFC"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
        </g>

        {/* Top Arc Motto text */}
        <path
          id="crest-text-path"
          d="M12 18 Q 30 14 48 18"
          fill="none"
        />
        <text fill="#FFFFFF" fontSize="3.5" fontWeight="bold" letterSpacing="0.8">
          <textPath href="#crest-text-path" startOffset="50%" textAnchor="middle">
            POLICE
          </textPath>
        </text>

        {/* Small Bottom Star */}
        <polygon
          points="30,57 31.5,60 35,60.5 32.5,62.5 33,66 30,64 27,66 27.5,62.5 25,60.5 28.5,60"
          fill="#38BDF8"
          transform="scale(0.5) translate(30, 56)"
        />
      </svg>
    </div>
  );
};
