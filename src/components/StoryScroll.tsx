import { useEffect, useRef } from 'react';
import { ArrowDown, Feather } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../utils/audio';

interface StoryScrollProps {
  onContinueToVault: () => void;
}

export default function StoryScroll({ onContinueToVault }: StoryScrollProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              headlineRef.current,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
            );

            gsap.fromTo(
              bodyRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 1.0, delay: 0.3, ease: 'power2.out' }
            );

            gsap.fromTo(
              actionRef.current,
              { opacity: 0, scale: 0.96 },
              { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.5)' }
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProceed = () => {
    soundEngine.playClick();
    onContinueToVault();
  };

  return (
    <section
      id="story-scene"
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-5 py-8 bg-[#F5F0E6] text-[#201D1A] border-t border-[#E8E1CE]"
    >
      <header className="w-full max-w-md mx-auto flex justify-between items-center text-xs tracking-wider font-mono text-[#8C8375]">
        <div className="flex items-center gap-1.5">
          <Feather className="w-3.5 h-3.5 text-[#A37D32]" />
          <span className="font-semibold text-[#3D3830]">THE REALIZATION</span>
        </div>
        <span className="text-[11px] text-[#A69B89]">02 / 03 SCENE</span>
      </header>

      <article className="my-auto max-w-sm sm:max-w-md text-center space-y-6 py-4">
        <h2
          ref={headlineRef}
          className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#201D1A] leading-snug"
        >
          Na mama, bhuli nai...
          <span className="block mt-2 font-handwritten text-2xl sm:text-3xl text-[#8C733E] font-normal">
            Ajker ei special dine kemne bhuli?
          </span>
        </h2>

        <div
          ref={bodyRef}
          className="space-y-3.5 text-sm sm:text-base text-[#59544D] font-body leading-relaxed"
        >
          <p>
            Koto bochor gelo, koto shritir dhula jomlo... but bondhutwo ta shei ager motoi roye gelo. 
            Eto shohoje ki toke bhula jay re mama?
          </p>
          <p className="font-handwritten text-lg sm:text-xl text-[#3D3830] font-semibold">
            Tobe ashol surprise e jawar agey, toke chotto ekta private test pass korte hobe...
          </p>
        </div>

        <div ref={actionRef} className="pt-2">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-full bg-[#201D1A] hover:bg-[#3D3830] active:scale-95 text-[#FAF7F0] text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <span>Proceed to the Interrogation</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>

      <footer className="text-[11px] font-mono text-[#A69B89] tracking-widest uppercase">
        Step 2 of 3 &bull; Pass the gatekeeper
      </footer>
    </section>
  );
}
