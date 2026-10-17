import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import StoryScroll from './components/StoryScroll';
import TheVault from './components/TheVault';
import BirthdayReveal from './components/BirthdayReveal';
import { soundEngine } from './utils/audio';

export default function App() {
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animFrameId = requestAnimationFrame(raf);

    const handleFirstInteraction = () => {
      soundEngine.playClick();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    // Track active scene for mobile progress bar
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const el2 = document.getElementById('story-scene');
      const el3 = document.getElementById('vault-scene');

      if (el3 && scrollPos >= el3.offsetTop) {
        setActiveStep(3);
      } else if (el2 && scrollPos >= el2.offsetTop) {
        setActiveStep(2);
      } else {
        setActiveStep(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animFrameId);
      lenis.destroy();
    };
  }, []);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.1 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setIsVaultUnlocked(false);
    setActiveStep(1);
    soundEngine.stopBirthdayBgm();
    setTimeout(() => {
      scrollToElement('hero-scene');
    }, 100);
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAF7F0] text-[#201D1A] font-body selection:bg-[#E8DFC9] selection:text-[#201D1A] overflow-x-hidden relative flex flex-col items-center">
      <div 
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.7)_0%,_rgba(240,234,220,0.4)_100%)] z-0" 
        aria-hidden="true" 
      />

      {/* Mobile Top Story Progress Indicators (Instagram/Stories style) */}
      {!isVaultUnlocked && (
        <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-2.5 pb-1 pointer-events-none">
          <div className="w-full max-w-md flex items-center gap-1.5">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className="h-1 flex-1 rounded-full overflow-hidden bg-[#D8CEB7]/50 backdrop-blur-xs transition-all"
              >
                <div 
                  className={`h-full bg-[#A37D32] transition-all duration-500 rounded-full ${
                    step <= activeStep ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Frame Container */}
      <main className="w-full max-w-md min-h-[100dvh] bg-[#FAF7F0] relative z-10 shadow-[0_0_60px_rgba(0,0,0,0.03)] sm:border-x sm:border-[#EBE3D0]/60 flex flex-col">
        {!isVaultUnlocked ? (
          <div className="flex flex-col mobile-snap-container">
            <div className="mobile-snap-section">
              <Hero onScrollToNext={() => scrollToElement('story-scene')} />
            </div>
            <div className="mobile-snap-section">
              <StoryScroll onContinueToVault={() => scrollToElement('vault-scene')} />
            </div>
            <div className="mobile-snap-section">
              <TheVault onUnlockSuccess={() => setIsVaultUnlocked(true)} />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in flex-1">
            <BirthdayReveal onRestart={handleRestart} />
          </div>
        )}
      </main>
    </div>
  );
}
