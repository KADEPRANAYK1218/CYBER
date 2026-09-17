import React from 'react';

interface AshokaChakraProps {
  size?: number;
  className?: string;
  color?: string;
  animate?: boolean;
}

export const AshokaChakra: React.FC<AshokaChakraProps> = ({
  size = 48,
  className = '',
  color = '#002663',
  animate = false,
}) => {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg
      id="ashoka-chakra-svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${animate ? 'animate-[spin_40s_linear_infinite]' : ''} ${className}`}
      aria-label="Ashoka Chakra"
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="3.5" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />

      {/* 24 Spoke hub */}
      <circle cx="50" cy="50" r="8.5" fill={color} />
      <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />

      {/* 24 Radial spokes */}
      <g>
        {spokes.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 50 50)`}>
            {/* Spoke needle */}
            <polygon
              points="49,10 51,10 50.6,44 49.4,44"
              fill={color}
            />
            {/* Outer tip circle / teardrop */}
            <circle cx="50" cy="9" r="1.5" fill={color} />
          </g>
        ))}
      </g>
    </svg>
  );
};
