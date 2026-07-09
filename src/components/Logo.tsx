import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  dark?: boolean;
}

export default function Logo({ className = '', showText = true, size = 'md', dark = false }: LogoProps) {
  // Define dimensions for different use cases
  const dimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 44, height: 44 },
    lg: { width: 64, height: 64 },
    xl: { width: 140, height: 140 }
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Crisp High-Fidelity SVG Replication of the Renova Logo */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_4px_12px_rgba(37,99,235,0.15)] hover:scale-105 hover:rotate-2 transition-transform duration-300"
      >
        <defs>
          {/* Main glossy blue gradient for the house frame and text */}
          <linearGradient id="renovaBlueGrad" x1="100" y1="50" x2="400" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="40%" stopColor="#1D4ED8" />
            <stop offset="80%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* Liquid highlight gradient for wave shine */}
          <linearGradient id="waveShineGrad" x1="100" y1="250" x2="450" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Mosaic tile gradients */}
          <linearGradient id="tileB1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="tileB2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="tileB3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="tileB4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="tileW1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="tileW2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Filters for 3D depth */}
          <filter id="depthShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* --- HOUSE STRUCTURE (Upper half) --- */}
        {/* Precise outline replicating the 3D glossy blue roof/walls of the house */}
        <g filter="url(#depthShadow)">
          {/* Left wall pillar, chimney offset, high pitch roof */}
          <path
            d="M 140 260 L 140 145 L 175 145 L 175 105 L 210 105 L 210 145 L 250 145 L 325 75 L 435 175 L 435 250"
            stroke="url(#renovaBlueGrad)"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Inner roof accent */}
          <path
            d="M 188 175 L 250 175 L 325 105 L 392 165"
            stroke="url(#renovaBlueGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* --- MOSAIC TILES AREA --- */}
        {/* Triangular grid resembling the tile work inside the pool/house */}
        <g filter="url(#depthShadow)">
          {[
            // Col 1 (x: 180)
            { x: 180, y: 232, fill: 'url(#tileB1)' },
            { x: 180, y: 252, fill: 'url(#tileB2)' },

            // Col 2 (x: 200)
            { x: 200, y: 212, fill: 'url(#tileB3)' },
            { x: 200, y: 232, fill: 'url(#tileB1)' },
            { x: 200, y: 252, fill: 'url(#tileW1)' },

            // Col 3 (x: 220)
            { x: 220, y: 192, fill: 'url(#tileB2)' },
            { x: 220, y: 212, fill: 'url(#tileB4)' },
            { x: 220, y: 232, fill: 'url(#tileW2)' },
            { x: 220, y: 252, fill: 'url(#tileB1)' },
            { x: 220, y: 272, fill: 'url(#tileB3)' },

            // Col 4 (x: 240)
            { x: 240, y: 172, fill: 'url(#tileW1)' },
            { x: 240, y: 192, fill: 'url(#tileB1)' },
            { x: 240, y: 212, fill: 'url(#tileB3)' },
            { x: 240, y: 232, fill: 'url(#tileB2)' },
            { x: 240, y: 252, fill: 'url(#tileW2)' },
            { x: 240, y: 272, fill: 'url(#tileB4)' },

            // Col 5 (x: 260)
            { x: 260, y: 172, fill: 'url(#tileB4)' },
            { x: 260, y: 192, fill: 'url(#tileB2)' },
            { x: 260, y: 212, fill: 'url(#tileW1)' },
            { x: 260, y: 232, fill: 'url(#tileB1)' },
            { x: 260, y: 252, fill: 'url(#tileB3)' },
            { x: 260, y: 272, fill: 'url(#tileW2)' },

            // Col 6 (x: 280)
            { x: 280, y: 152, fill: 'url(#tileB2)' },
            { x: 280, y: 172, fill: 'url(#tileW2)' },
            { x: 280, y: 192, fill: 'url(#tileB3)' },
            { x: 280, y: 212, fill: 'url(#tileB1)' },
            { x: 280, y: 232, fill: 'url(#tileB4)' },
            { x: 280, y: 252, fill: 'url(#tileW1)' },
            { x: 280, y: 272, fill: 'url(#tileB2)' },

            // Col 7 (x: 300)
            { x: 300, y: 152, fill: 'url(#tileW1)' },
            { x: 300, y: 172, fill: 'url(#tileB1)' },
            { x: 300, y: 192, fill: 'url(#tileB4)' },
            { x: 300, y: 212, fill: 'url(#tileW2)' },
            { x: 300, y: 232, fill: 'url(#tileB3)' },
            { x: 300, y: 252, fill: 'url(#tileB1)' },
            { x: 300, y: 272, fill: 'url(#tileB4)' },

            // Col 8 (x: 320)
            { x: 320, y: 132, fill: 'url(#tileB3)' },
            { x: 320, y: 152, fill: 'url(#tileB2)' },
            { x: 320, y: 172, fill: 'url(#tileW1)' },
            { x: 320, y: 192, fill: 'url(#tileB1)' },
            { x: 320, y: 212, fill: 'url(#tileB4)' },
            { x: 320, y: 232, fill: 'url(#tileW2)' },
            { x: 320, y: 252, fill: 'url(#tileB3)' },

            // Col 9 (x: 340)
            { x: 340, y: 132, fill: 'url(#tileW2)' },
            { x: 340, y: 152, fill: 'url(#tileB1)' },
            { x: 340, y: 172, fill: 'url(#tileB3)' },
            { x: 340, y: 192, fill: 'url(#tileW1)' },
            { x: 340, y: 212, fill: 'url(#tileB2)' },
            { x: 340, y: 232, fill: 'url(#tileB4)' },
            { x: 340, y: 252, fill: 'url(#tileB1)' },

            // Col 10 (x: 360)
            { x: 360, y: 112, fill: 'url(#tileB1)' },
            { x: 360, y: 132, fill: 'url(#tileW1)' },
            { x: 360, y: 152, fill: 'url(#tileB4)' },
            { x: 360, y: 172, fill: 'url(#tileB2)' },
            { x: 360, y: 192, fill: 'url(#tileW2)' },
            { x: 360, y: 212, fill: 'url(#tileB3)' },
            { x: 360, y: 232, fill: 'url(#tileB1)' },

            // Col 11 (x: 380)
            { x: 380, y: 112, fill: 'url(#tileB3)' },
            { x: 380, y: 132, fill: 'url(#tileB1)' },
            { x: 380, y: 152, fill: 'url(#tileW2)' },
            { x: 380, y: 172, fill: 'url(#tileB4)' },
            { x: 380, y: 192, fill: 'url(#tileB2)' },
            { x: 380, y: 212, fill: 'url(#tileW1)' },

            // Col 12 (x: 400)
            { x: 400, y: 132, fill: 'url(#tileW1)' },
            { x: 400, y: 152, fill: 'url(#tileB3)' },
            { x: 400, y: 172, fill: 'url(#tileB1)' },
            { x: 400, y: 192, fill: 'url(#tileW2)' },
            { x: 400, y: 212, fill: 'url(#tileB4)' },

            // Col 13 (x: 418)
            { x: 418, y: 152, fill: 'url(#tileB2)' },
            { x: 418, y: 172, fill: 'url(#tileW1)' },
            { x: 418, y: 192, fill: 'url(#tileB3)' },
          ].map((tile, i) => (
            <rect
              key={`tile-${i}`}
              x={tile.x}
              y={tile.y}
              width="19.5"
              height="19.5"
              fill={tile.fill}
              rx="2.5"
              stroke="#FFFFFF"
              strokeWidth="0.75"
            />
          ))}
        </g>

        {/* --- DYNAMIC LIQUID SWOOSH / WATER WAVE (Lower section) --- */}
        <g filter="url(#depthShadow)">
          {/* Main blue thick wave swoosh flowing below the house */}
          <path
            d="M 125 272 Q 185 342 300 295 T 445 282"
            stroke="url(#renovaBlueGrad)"
            strokeWidth="34"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cyan/Light Blue Glossy Highlight overlay to simulate reflection/transparency */}
          <path
            d="M 142 278 Q 192 334 296 291 T 425 283"
            stroke="url(#waveShineGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          {/* Brilliant highlight streak */}
          <path
            d="M 180 298 Q 220 324 280 296"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* Liquid Splash Droplets (3D Water droplets) */}
          <circle cx="452" cy="254" r="11" fill="url(#renovaBlueGrad)" />
          <circle cx="452" cy="254" r="5" fill="#38BDF8" opacity="0.6" />
          
          <circle cx="468" cy="272" r="7" fill="url(#renovaBlueGrad)" />
          <circle cx="418" cy="308" r="9" fill="url(#waveShineGrad)" />
          <circle cx="428" cy="316" r="5" fill="url(#renovaBlueGrad)" />
        </g>
      </svg>

      {/* --- PREMIUM BRAND TEXT (RENOVA / TALENTO EM TRANSFORMAR) --- */}
      {showText && (
        <div className="flex flex-col select-none">
          <span className={`font-display font-extrabold tracking-tight leading-none uppercase ${
            dark ? 'text-white' : 'text-slate-900'
          } ${
            size === 'sm' ? 'text-base' :
            size === 'md' ? 'text-xl sm:text-2xl' :
            size === 'lg' ? 'text-3xl' : 'text-4.5xl'
          }`}>
            RENOVA
          </span>
          <span className={`font-mono font-black tracking-[0.22em] leading-none mt-1.5 whitespace-nowrap ${
            dark ? 'text-slate-400' : 'text-slate-500'
          } ${
            size === 'sm' ? 'text-[6.5px]' :
            size === 'md' ? 'text-[8px] sm:text-[9.5px]' :
            size === 'lg' ? 'text-[11px]' : 'text-[13px]'
          }`}>
            TALENTO EM TRANSFORMAR
          </span>
        </div>
      )}
    </div>
  );
}
