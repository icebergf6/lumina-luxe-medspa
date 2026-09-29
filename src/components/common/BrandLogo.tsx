import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label="Lumina Luxe MedSpa Brand Logo"
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      {/* Luxury Geometric Crest Monogram */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 group`}>
        {/* Ambient Halo Glow */}
        <div className="absolute inset-0 bg-[#C5A880]/25 rounded-xl blur-md group-hover:bg-[#C5A880]/40 transition-all duration-300" />
        
        {/* Outer Faceted Gold Bezel */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-[#F5E6D3] via-[#C5A880] to-[#7D5C2C] p-[1.5px] shadow-xl">
          <div className="w-full h-full bg-[#0B0F19] rounded-[10.5px] flex items-center justify-center relative overflow-hidden">
            {/* Subtle Inner Diamond Geometry */}
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full p-1"
            >
              {/* Outer Geometric Facet Ring */}
              <circle
                cx="20"
                cy="20"
                r="16.5"
                stroke="url(#goldGradientBorder)"
                strokeWidth="0.75"
                strokeDasharray="2 3"
                opacity="0.6"
              />
              <path
                d="M20 4L36 20L20 36L4 20L20 4Z"
                stroke="url(#goldGradientBorder)"
                strokeWidth="0.8"
                opacity="0.4"
              />
              {/* Luxury Double-L Radiance Monogram */}
              <path
                d="M14 12V27H25"
                stroke="url(#goldLetterGradient)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 16V24H26"
                stroke="url(#goldLetterGradient)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
              {/* Micro Radiance Diamond Star */}
              <circle cx="27" cy="13" r="1.5" fill="#F5E6D3" />
              <path
                d="M27 9V17M23 13H31"
                stroke="#F5E6D3"
                strokeWidth="0.75"
                strokeLinecap="round"
                opacity="0.9"
              />

              <defs>
                <linearGradient id="goldGradientBorder" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F5E6D3" />
                  <stop offset="0.5" stopColor="#C5A880" />
                  <stop offset="1" stopColor="#8E6835" />
                </linearGradient>
                <linearGradient id="goldLetterGradient" x1="14" y1="12" x2="26" y2="27" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="0.3" stopColor="#F5E6D3" />
                  <stop offset="0.7" stopColor="#C5A880" />
                  <stop offset="1" stopColor="#9C7741" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-serif-luxury ${textSizes[size]} font-bold tracking-[0.2em] text-white uppercase`}>
            LUMINA
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#C5A880] font-bold uppercase bg-gradient-to-r from-[#C5A880]/15 to-[#C5A880]/5 border border-[#C5A880]/40 px-1.5 py-0.5 rounded font-mono shadow-sm">
            LUXE
          </span>
        </div>
        
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1 text-[9px] tracking-[0.28em] text-slate-400 uppercase font-medium">
            <span>Beverly Hills</span>
            <span className="text-[#C5A880]">•</span>
            <span>Manhattan</span>
          </div>
        )}
      </div>
    </div>
  );
};
