import React from 'react';

interface EmblemOfIndiaProps {
  size?: number;
  className?: string;
  variant?: 'gold' | 'monochrome' | 'navy' | 'white';
  showText?: boolean;
}

export const EmblemOfIndia: React.FC<EmblemOfIndiaProps> = ({
  size = 64,
  className = '',
  variant = 'white',
  showText = true,
}) => {
  const isGold = variant === 'gold';
  const isNavy = variant === 'navy';
  const isWhite = variant === 'white' || variant === 'monochrome';
  
  const primaryColor = isGold ? '#D4AF37' : isNavy ? '#0F2C59' : '#FFFFFF';
  const secondaryColor = isGold ? '#F3E5AB' : isNavy ? '#1B4D89' : '#FFFFFF';
  const accentColor = isGold ? '#B8860B' : isNavy ? '#081D3D' : '#E2E8F0';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        id="emblem-of-india-svg"
        width={size}
        height={size * 1.15}
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`emblem-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} />
            <stop offset="50%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
          <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#subtle-glow)">
          {/* Central Lion Head & Mane */}
          <path
            d="M50 8 C44 8 40 12 39 16 C37 17 35 20 36 24 C34 26 33 30 35 34 C36 38 39 41 42 43 C43 45 44 47 45 49 L55 49 C56 47 57 45 58 43 C61 41 64 38 65 34 C67 30 66 26 64 24 C65 20 63 17 61 16 C60 12 56 8 50 8 Z"
            fill={`url(#emblem-grad-${variant})`}
          />
          {/* Lion Crown/Forehead Detail */}
          <path
            d="M48 11 L52 11 L51 15 L49 15 Z"
            fill={accentColor}
          />
          {/* Lion Eyes and Snout */}
          <ellipse cx="46" cy="22" rx="1.8" ry="1.2" fill={accentColor} />
          <ellipse cx="54" cy="22" rx="1.8" ry="1.2" fill={accentColor} />
          <polygon points="50,25 47.5,28 52.5,28" fill={accentColor} />
          <path d="M47 30 Q50 32 53 30" stroke={accentColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Muzzle / Whisker Pads */}
          <ellipse cx="48" cy="29" rx="2" ry="1.2" fill={secondaryColor} opacity="0.6" />
          <ellipse cx="52" cy="29" rx="2" ry="1.2" fill={secondaryColor} opacity="0.6" />

          {/* Left Lion Profile */}
          <path
            d="M36 18 C31 19 27 23 26 27 C24 29 23 33 25 37 C26 41 29 44 32 46 C35 48 37 49 40 49 L41 44 C38 43 35 41 33 38 C31 34 31 30 33 26 C35 22 38 20 41 19 Z"
            fill={`url(#emblem-grad-${variant})`}
          />
          <ellipse cx="28" cy="28" rx="1.2" ry="0.9" fill={accentColor} />

          {/* Right Lion Profile */}
          <path
            d="M64 18 C69 19 73 23 74 27 C76 29 77 33 75 37 C74 41 71 44 68 46 C65 48 63 49 60 49 L59 44 C62 43 65 41 67 38 C69 34 69 30 67 26 C65 22 62 20 59 19 Z"
            fill={`url(#emblem-grad-${variant})`}
          />
          <ellipse cx="72" cy="28" rx="1.2" ry="0.9" fill={accentColor} />

          {/* Mane Curls & Details */}
          <path
            d="M40 32 C38 36 39 40 42 44 M60 32 C62 36 61 40 58 44 M47 36 C45 39 46 43 48 46 M53 36 C55 39 54 43 52 46"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
          />

          {/* Lion Paws / Forelegs */}
          <rect x="42" y="49" width="4.5" height="11" rx="2" fill={`url(#emblem-grad-${variant})`} />
          <rect x="53.5" y="49" width="4.5" height="11" rx="2" fill={`url(#emblem-grad-${variant})`} />
          <rect x="29" y="48" width="4" height="12" rx="1.8" fill={`url(#emblem-grad-${variant})`} />
          <rect x="67" y="48" width="4" height="12" rx="1.8" fill={`url(#emblem-grad-${variant})`} />

          {/* Abacus (Platform) */}
          <path
            d="M18 60 L82 60 C84 60 85 62 84 64 L81 72 C80.5 73.5 79 74.5 77.5 74.5 L22.5 74.5 C21 74.5 19.5 73.5 19 72 L16 64 C15 62 16 60 18 60 Z"
            fill={`url(#emblem-grad-${variant})`}
          />
          
          {/* Abacus Decorative Molding */}
          <line x1="17" y1="62" x2="83" y2="62" stroke={accentColor} strokeWidth="1" />
          <line x1="21" y1="73" x2="79" y2="73" stroke={accentColor} strokeWidth="0.8" />

          {/* Central Ashoka Chakra on Abacus */}
          <circle cx="50" cy="67.5" r="5.5" fill="none" stroke={isGold ? '#996515' : '#002663'} strokeWidth="1.2" />
          <circle cx="50" cy="67.5" r="1.2" fill={isGold ? '#996515' : '#002663'} />
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="62.5"
              x2="50"
              y2="72.5"
              stroke={isGold ? '#996515' : '#002663'}
              strokeWidth="0.8"
              transform={`rotate(${deg} 50 67.5)`}
            />
          ))}

          {/* Galloping Horse (Left of Chakra) */}
          <path
            d="M32 65 C34 64 36 65 37 66 C35 67 33 68 31 69 C33 70 34 71 33 72 C31 71 29 70 28 68 C27 66 29 64 32 65 Z"
            fill={accentColor}
          />

          {/* Bull (Right of Chakra) */}
          <path
            d="M68 65 C66 64 64 65 63 66 C65 67 67 68 69 69 C67 70 66 71 67 72 C69 71 71 70 72 68 C73 66 71 64 68 65 Z"
            fill={accentColor}
          />

          {/* Inverted Lotus Base */}
          <path
            d="M26 75 C32 82 40 86 50 86 C60 86 68 82 74 75 C70 79 61 82 50 82 C39 82 30 79 26 75 Z"
            fill={`url(#emblem-grad-${variant})`}
          />
          {/* Lotus Petals */}
          <path
            d="M38 76 C41 83 45 85 50 85 C55 85 59 83 62 76"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
          />
        </g>

        {/* Motto Banner: SATYAMEVA JAYATE */}
        {showText && (
          <g transform="translate(0, 89)">
            {!isWhite && (
              <>
                <rect x="20" y="2" width="60" height="15" rx="3" fill={isGold ? '#332600' : isNavy ? '#0A1C33' : '#1E293B'} />
                <rect x="20" y="2" width="60" height="15" rx="3" fill="none" stroke={primaryColor} strokeWidth="0.8" />
              </>
            )}
            <text
              x="50"
              y={isWhite ? "10" : "12"}
              textAnchor="middle"
              fill={isWhite ? '#FFFFFF' : isGold ? '#F3E5AB' : isNavy ? '#E2E8F0' : '#FFFFFF'}
              fontSize={isWhite ? "8.5" : "7.5"}
              fontFamily="sans-serif"
              fontWeight="bold"
              letterSpacing="0.8"
            >
              सत्यमेव जयते
            </text>
          </g>
        )}
      </svg>
      {showText && !isWhite && (
        <span
          className={`text-[9px] font-semibold tracking-wider uppercase mt-1 ${
            isGold ? 'text-amber-300' : isNavy ? 'text-slate-700' : 'text-slate-200'
          }`}
        >
          SATYAMEVA JAYATE
        </span>
      )}
    </div>
  );
};
