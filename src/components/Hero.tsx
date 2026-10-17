import { useEffect, useRef } from 'react';
import { ChevronDown, Compass } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../utils/audio';

interface HeroProps {
  onScrollToNext: () => void;
}

export default function Hero({ onScrollToNext }: HeroProps) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 2.0, 
          delay: 1.0, 
          ease: 'power3.out' 
        }
      );

      gsap.fromTo(
        subtextRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 1.4, delay: 2.0, ease: 'power2.out' }
      );

      gsap.fromTo(
        arrowRef.current,
        { opacity: 0, scale: 0.85, y: -8 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1.0, 
          delay: 3.0, 
          ease: 'back.out(1.7)',
          onComplete: () => {
            gsap.to(arrowRef.current, {
              y: 7,
              duration: 1.4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    soundEngine.playClick();
    onScrollToNext();
  };

  return (
    <section 
      id="hero-scene"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-5 py-8 select-none bg-[#FAF7F0] text-[#201D1A]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-[#EFEAD9]/60 blur-[80px]" />
      </div>

      <header className="w-full max-w-md mx-auto flex justify-between items-center text-xs tracking-wider font-mono text-[#8C8375] z-10">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#A37D32]" />
          <span className="font-semibold text-[#3D3830]">MEMOIR</span>
        </div>
        <span className="text-[11px] text-[#A69B89]">01 / 03 SCENE</span>
      </header>

      <div className="my-auto text-center max-w-sm sm:max-w-md px-3 z-10 space-y-4">
        <h1 
          ref={textRef} 
          className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold tracking-tight text-[#201D1A] leading-[1.25] opacity-0"
        >
          Vuilai gecos mama ehon <span className="inline-block text-2xl sm:text-3xl animate-bounce">😮‍💨</span>
        </h1>

        <p 
          ref={subtextRef}
          className="font-handwritten text-xl sm:text-2xl text-[#8C733E] opacity-0 tracking-wide font-medium"
        >
          ekbar o mone porlo na, na?
        </p>
      </div>

      <div className="flex flex-col items-center pb-4 z-10 w-full max-w-xs">
        <button
          ref={arrowRef}
          onClick={handleClick}
          aria-label="Scroll down to next scene"
          className="opacity-0 group w-full py-3 px-5 rounded-full border border-[#DCD3BE] bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] shadow-xs backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <span className="text-xs tracking-widest font-mono text-[#5C5549] uppercase font-medium">
            scroll down mama
          </span>
          <div className="p-1 rounded-full bg-[#EFEAD9] text-[#201D1A]">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </section>
  );
}
