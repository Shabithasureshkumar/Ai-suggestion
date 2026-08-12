import React from 'react';

export const StethoscopeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      
      {/* 2. SOFT PURPLE BACKGROUND GLOWS MATCHING FIGMA */}
      {/* Upper Left Glow */}
      <div 
        className="absolute -left-28 top-8 w-[34rem] h-[34rem] rounded-full opacity-45 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(221, 214, 254, 0.08) 70%, transparent 100%)' }}
      />

      {/* Upper Right Glow */}
      <div 
        className="absolute -right-24 top-10 w-[38rem] h-[38rem] rounded-full opacity-50 blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.42) 0%, rgba(196, 181, 253, 0.12) 70%, transparent 100%)' }}
      />

      {/* Right Middle Glow */}
      <div 
        className="absolute right-8 top-[46%] w-72 h-72 rounded-full opacity-45 blur-[85px]"
        style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, rgba(237, 233, 254, 0.1) 70%, transparent 100%)' }}
      />

      {/* Lower Right Glow */}
      <div 
        className="absolute -right-16 bottom-6 w-[32rem] h-[32rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(221, 214, 254, 0.08) 70%, transparent 100%)' }}
      />

      {/* Lower Left Glow */}
      <div 
        className="absolute left-4 bottom-12 w-[30rem] h-[30rem] rounded-full opacity-40 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.38) 0%, rgba(237, 233, 254, 0.08) 70%, transparent 100%)' }}
      />

      {/* 3. LARGE SUBTLE STETHOSCOPE BACKGROUND ILLUSTRATION */}
      <svg
        className="w-[96%] max-w-[1040px] h-auto opacity-[0.24] transform translate-y-2 select-none"
        viewBox="0 0 950 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="stethTubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#A78BFA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="chestpieceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.2" />
          </linearGradient>
          
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Eartips & Binaural Tubes (Upper Right) */}
        <g stroke="url(#stethTubeGrad)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer Loop */}
          <path d="M 680 80 Q 730 110 740 170 T 670 310" />
          {/* Inner Loop */}
          <path d="M 580 90 Q 620 130 620 190 T 600 290" />
        </g>

        {/* Eartip Oval Covers */}
        <ellipse cx="680" cy="75" rx="14" ry="10" fill="#7C3AED" opacity="0.4" />
        <ellipse cx="575" cy="85" rx="14" ry="10" fill="#7C3AED" opacity="0.4" />

        {/* Spring Bar connecting ear tubes */}
        <path
          d="M 590 160 C 610 150, 680 140, 715 155"
          stroke="url(#stethTubeGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Flexible Main Tubing framing the AI card */}
        <g stroke="url(#stethTubeGrad)" strokeWidth="28" strokeLinecap="round" opacity="0.75" filter="url(#glowEffect)">
          <path d="M 635 300 C 635 365, 555 395, 510 425 C 455 460, 340 480, 260 445 C 195 415, 185 310, 240 250 C 300 185, 460 220, 515 285 C 570 350, 520 470, 435 545 C 360 610, 250 615, 175 550" />
        </g>

        {/* Chestpiece Assembly (Bottom Left) */}
        <g transform="translate(155, 550) rotate(-22)">
          {/* Outer Ring */}
          <circle cx="0" cy="0" r="48" stroke="url(#stethTubeGrad)" strokeWidth="10" fill="white" fillOpacity="0.45" />
          {/* Diaphragm Membrane */}
          <circle cx="0" cy="0" r="34" fill="url(#chestpieceGrad)" opacity="0.75" />
          <circle cx="0" cy="0" r="18" fill="#8B5CF6" opacity="0.35" />
          {/* Stem Hub */}
          <rect x="-9" y="-66" width="18" height="26" rx="5" fill="url(#stethTubeGrad)" opacity="0.65" />
        </g>
      </svg>

    </div>
  );
};

