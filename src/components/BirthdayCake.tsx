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
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A37D32] rounded-3xl p-3 transition-transform active:scale-95 flex flex-col items-center"
      >
        {/* Straight Upright Candle & Flame */}
        <div className="relative flex flex-col items-center z-20 mb-0.5">
          {!isBlown ? (
            <div className={`relative transition-all duration-300 ${isBlowing ? 'opacity-30 scale-75' : 'opacity-100'}`}>
              {/* Straight Upright Flame */}
              <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 animate-pulse shadow-[0_0_16px_rgba(255,160,0,0.85)] mx-auto" />
              {/* Inner Bright Core */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white rounded-full opacity-85" />
            </div>
          ) : (
            <div className="h-6 flex flex-col items-center justify-end">
              <span className="w-1.5 h-3.5 bg-neutral-400/70 rounded-full animate-smoke blur-[0.5px]" />
            </div>
          )}

          {/* Candle Wick */}
          <div className="w-0.5 h-2 bg-neutral-800 rounded-full mt-0.5" />

          {/* Straight Candle Stick */}
          <div className="w-2.5 h-8 bg-gradient-to-b from-[#FFFDF9] via-[#EFE7D5] to-[#D8CEB7] rounded-xs shadow-xs border border-[#D0C5AD] relative overflow-hidden">
            <div className="absolute inset-x-0 top-2 h-1 bg-[#A37D32]/40" />
            <div className="absolute inset-x-0 top-4.5 h-1 bg-[#A37D32]/40" />
          </div>
        </div>

        {/* 2D Minimal Cake Body */}
        <div className="relative flex flex-col items-center -mt-0.5">
          {/* Top Tier */}
          <div className="w-28 h-9 bg-gradient-to-b from-[#FFFDF9] to-[#F5ECE0] rounded-t-xl rounded-b-md border border-[#DCD3BD] shadow-xs relative flex items-center justify-center">
            {/* Scalloped Frosting Line */}
            <div className="absolute top-0 inset-x-1.5 h-2.5 bg-[#FFFDF9] rounded-b-md border-b border-[#E8DFC9]" />
            <div className="flex gap-2.5 z-10 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A37D32]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#A37D32]" />
            </div>
          </div>

          {/* Bottom Tier */}
          <div className="w-40 h-13 bg-gradient-to-b from-[#FFFDF9] to-[#EFE4D3] rounded-t-lg rounded-b-2xl border border-[#DCD3BD] shadow-sm relative -mt-0.5 flex items-center justify-center">
            <div className="absolute top-0 inset-x-2 h-3 bg-[#FFFDF9] rounded-b-lg border-b border-[#E8DFC9]" />
            <div className="flex gap-3 z-10 pt-1">
              <span className="w-2 h-2 rounded-full bg-[#A37D32]" />
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="w-2 h-2 rounded-full bg-[#A37D32]" />
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            </div>
          </div>

          {/* Pedestal Plate */}
          <div className="w-48 h-2.5 bg-[#E2D8C3] rounded-full shadow-xs mt-0.5 border border-[#D0C4AC]" />
          <div className="w-18 h-2 bg-[#C8BCA2] rounded-b-md mx-auto" />
        </div>
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
