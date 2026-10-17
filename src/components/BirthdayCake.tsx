import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BirthdayCakeProps {
  onCandleBlown?: () => void;
}

export default function BirthdayCake({ onCandleBlown }: BirthdayCakeProps) {
  const [isBlown, setIsBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown || isBlowing) return;
    setIsBlowing(true);
    soundEngine.playUnlock();

    setTimeout(() => {
      setIsBlown(true);
      setIsBlowing(false);
      onCandleBlown?.();

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#A37D32', '#C89B3C', '#E5DCBE', '#FAF7F0', '#FF7043']
      });
    }, 400);
  };

  return (
    <figure className="flex flex-col items-center my-4 select-none">
      <div 
        onClick={handleBlowCandle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleBlowCandle();
        }}
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A37D32] rounded-3xl p-4 transition-transform active:scale-95"
      >
        <div className="relative w-44 h-36 flex flex-col items-center justify-end">
          {/* Flame & Candle */}
          <div className="relative flex flex-col items-center mb-1 z-20">
            {!isBlown ? (
              <div className={`relative transition-opacity duration-300 ${isBlowing ? 'opacity-40 scale-75' : 'opacity-100'}`}>
                <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 animate-pulse shadow-[0_0_15px_rgba(255,165,0,0.8)] mx-auto" />
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white rounded-full opacity-80" />
              </div>
            ) : (
              <div className="h-6 flex flex-col items-center justify-end">
                <span className="w-1.5 h-3 bg-slate-400/60 rounded-full animate-fade-in blur-[0.5px]" />
              </div>
            )}
            <div className="w-0.5 h-2 bg-neutral-800" />
            <div className="w-2.5 h-9 bg-gradient-to-b from-[#FFFDF9] via-[#E8DFC9] to-[#C8B896] rounded-xs shadow-xs" />
          </div>

          {/* Top Layer */}
          <div className="relative z-10 w-28 h-10 bg-gradient-to-b from-[#FFFDF9] to-[#EBE2CF] rounded-t-2xl rounded-b-lg border border-[#DCD3BD] shadow-sm flex items-center justify-center">
            <div className="absolute top-0 inset-x-2 h-2.5 bg-[#FAF7F0] rounded-b-md border-b border-[#D8CEB7]" />
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A37D32]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#A37D32]" />
            </div>
          </div>

          {/* Bottom Layer */}
          <div className="w-40 h-14 bg-gradient-to-b from-[#FFFDF9] to-[#E3D8C0] rounded-t-xl rounded-b-2xl border border-[#D8CEB7] shadow-md relative -mt-1 flex items-center justify-center">
            <div className="absolute top-0 inset-x-3 h-3 bg-[#FAF7F0] rounded-b-lg border-b border-[#D8CEB7]" />
            <div className="flex gap-3 pt-1">
              <span className="w-2 h-2 rounded-full bg-[#A37D32]/70" />
              <span className="w-2 h-2 rounded-full bg-[#C89B3C]/70" />
              <span className="w-2 h-2 rounded-full bg-[#A37D32]/70" />
              <span className="w-2 h-2 rounded-full bg-[#C89B3C]/70" />
            </div>
          </div>

          {/* Cake Stand */}
          <div className="w-48 h-2.5 bg-[#D2C5A9] rounded-full shadow-sm mt-0.5" />
          <div className="w-20 h-2 bg-[#BCAD8F] rounded-b-md mx-auto" />
        </div>
      </div>

      <figcaption className="text-center mt-1">
        {!isBlown ? (
          <button
            type="button"
            onClick={handleBlowCandle}
            className="text-xs font-mono tracking-wider text-[#A37D32] hover:text-[#7D5E21] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tap candle to make a wish mama</span>
          </button>
        ) : (
          <p className="text-xs font-mono tracking-wider text-[#3D3830] font-semibold animate-fade-in">
            ✨ Wish granted! May your year be legendary mama!
          </p>
        )}
      </figcaption>
    </figure>
  );
}
