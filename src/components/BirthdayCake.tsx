import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BirthdayCakeProps {
  onCandleBlown?: () => void;
}

export default function BirthdayCake({ onCandleBlown }: BirthdayCakeProps) {
  const [isBlown, setIsBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleCandleAction = () => {
    if (isBlowing) return;

    if (!isBlown) {
      setIsBlowing(true);
      soundEngine.playUnlock();

      setTimeout(() => {
        setIsBlown(true);
        setIsBlowing(false);
        onCandleBlown?.();

        confetti({
          particleCount: 65,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#A37D32', '#C89B3C', '#E5DCBE', '#FAF7F0', '#FF7043']
        });
      }, 350);
    } else {
      soundEngine.playClick();
      setIsBlown(false);
    }
  };

  return (
    <figure className="flex flex-col items-center my-3 select-none">
      <div
        role="button"
        tabIndex={0}
        onClick={handleCandleAction}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCandleAction();
          }
        }}
        aria-label={isBlown ? "Relight birthday candle" : "Blow out birthday candle"}
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A37D32] rounded-3xl p-3 transition-transform active:scale-95"
      >
        <svg
          viewBox="0 0 240 190"
          className="w-44 sm:w-52 h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cakeCreamGradient" x1="120" y1="50" x2="120" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFDF9" />
              <stop offset="1" stopColor="#F5ECE0" />
            </linearGradient>

            <linearGradient id="cakeGoldTrim" x1="40" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A37D32" />
              <stop offset="0.5" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#A37D32" />
            </linearGradient>

            <linearGradient id="flameGradient" x1="120" y1="10" x2="120" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE082" />
              <stop offset="0.4" stopColor="#FF9800" />
              <stop offset="1" stopColor="#E65100" />
            </linearGradient>

            <filter id="flameGlow" x="100" y="0" width="40" height="50" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Pedestal Stand Base */}
          <path
            d="M 96 166 L 90 178 Q 90 182 96 182 L 144 182 Q 150 182 150 178 L 144 166 Z"
            fill="#D4C8AF"
            stroke="#BCB094"
            strokeWidth="1.2"
          />
          {/* Plate Rim */}
          <ellipse
            cx="120"
            cy="165"
            rx="86"
            ry="9"
            fill="#EFE8D6"
            stroke="#D4C8AF"
            strokeWidth="1.5"
          />
          <ellipse
            cx="120"
            cy="164"
            rx="80"
            ry="6"
            fill="#F7F3E7"
          />

          {/* Bottom Layer */}
          <rect
            x="48"
            y="112"
            width="144"
            height="48"
            rx="12"
            fill="url(#cakeCreamGradient)"
            stroke="#DCD3BE"
            strokeWidth="1.2"
          />
          {/* Bottom Layer Scalloped Frosting Drips */}
          <path
            d="M 48 122 Q 57 128 66 122 Q 75 128 84 122 Q 93 128 102 122 Q 111 128 120 122 Q 129 128 138 122 Q 147 128 156 122 Q 165 128 174 122 Q 183 128 192 122 L 192 114 Q 192 112 188 112 L 52 112 Q 48 112 48 114 Z"
            fill="#FFFDF9"
          />
          {/* Bottom Layer Gold Sprinkle Accents */}
          <circle cx="68" cy="142" r="2.2" fill="#A37D32" />
          <circle cx="94" cy="144" r="2.2" fill="#D4AF37" />
          <circle cx="120" cy="142" r="2.2" fill="#A37D32" />
          <circle cx="146" cy="144" r="2.2" fill="#D4AF37" />
          <circle cx="172" cy="142" r="2.2" fill="#A37D32" />

          {/* Top Layer */}
          <rect
            x="72"
            y="72"
            width="96"
            height="44"
            rx="10"
            fill="url(#cakeCreamGradient)"
            stroke="#DCD3BE"
            strokeWidth="1.2"
          />
          {/* Top Layer Frosting Drips */}
          <path
            d="M 72 80 Q 80 85 88 80 Q 96 85 104 80 Q 112 85 120 80 Q 128 85 136 80 Q 144 85 152 80 Q 160 85 168 80 L 168 74 Q 168 72 164 72 L 76 72 Q 72 72 72 74 Z"
            fill="#FFFDF9"
          />
          {/* Top Layer Gold Sprinkle Accents */}
          <circle cx="88" cy="98" r="2" fill="#D4AF37" />
          <circle cx="120" cy="100" r="2" fill="#A37D32" />
          <circle cx="152" cy="98" r="2" fill="#D4AF37" />

          {/* Candle Body */}
          <rect
            x="116.5"
            y="42"
            width="7"
            height="31"
            rx="2.5"
            fill="#FAF6EE"
            stroke="#D2C5A9"
            strokeWidth="1"
          />
          {/* Candle Gold Spiral Stripes */}
          <line x1="117" y1="48" x2="123" y2="52" stroke="#A37D32" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="117" y1="57" x2="123" y2="61" stroke="#A37D32" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="117" y1="66" x2="123" y2="70" stroke="#A37D32" strokeWidth="1.2" strokeLinecap="round" />

          {/* Candle Wick */}
          <line x1="120" y1="36" x2="120" y2="42" stroke="#4A453C" strokeWidth="1.5" strokeLinecap="round" />

          {/* Candle Flame or Smoke */}
          {!isBlown ? (
            <g className={`transition-all duration-300 ${isBlowing ? 'opacity-30 scale-75' : 'animate-candle-flicker'}`} filter="url(#flameGlow)">
              {/* Outer Flame Teardrop */}
              <path
                d="M 120 12 C 114 22 113 29 116 34 C 118 36.5 122 36.5 124 34 C 127 29 126 22 120 12 Z"
                fill="url(#flameGradient)"
              />
              {/* Inner Flame Core */}
              <path
                d="M 120 20 C 117.5 25 117 29 118.5 32 C 119.5 33.5 120.5 33.5 121.5 32 C 123 29 122.5 25 120 20 Z"
                fill="#FFF9C4"
              />
            </g>
          ) : (
            <g className="animate-smoke">
              {/* Whimsical Wisp of Smoke */}
              <path
                d="M 120 34 Q 116 26 122 20 T 118 10"
                stroke="#8C8375"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </svg>
      </div>

      <figcaption className="text-center mt-1">
        {!isBlown ? (
          <button
            type="button"
            onClick={handleCandleAction}
            className="text-xs font-mono tracking-wider text-[#A37D32] hover:text-[#7D5E21] inline-flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Tap candle to make a wish mama</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-xs font-mono tracking-wider text-[#3D3830] font-semibold animate-fade-in">
              ✨ Wish granted, Nahid Mama!
            </p>
            <button
              type="button"
              onClick={handleCandleAction}
              className="text-[11px] font-mono text-[#8C8375] hover:text-[#A37D32] inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Relight candle</span>
            </button>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
