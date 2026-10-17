import { useState, useRef, FormEvent, useEffect } from 'react';
import { Lock, Unlock, HelpCircle, ArrowRight, ShieldAlert, KeyRound } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../utils/audio';

interface TheVaultProps {
  onUnlockSuccess: () => void;
}

export default function TheVault({ onUnlockSuccess }: TheVaultProps) {
  const [answer, setAnswer] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || isSuccess) return;

    const normalized = answer.trim().toLowerCase();
    const isCorrect = 
      normalized === 'biyar dawat' || 
      normalized === 'biar dawat' || 
      normalized === 'biye dawat' ||
      normalized === 'biya dawat';

    if (isCorrect) {
      setIsError(false);
      setIsSuccess(true);
      soundEngine.playUnlock();

      if (cardRef.current) {
        gsap.to(cardRef.current, {
          boxShadow: '0 0 40px rgba(163, 125, 50, 0.25)',
          borderColor: '#A37D32',
          scale: 1.02,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(onUnlockSuccess, 500);
          }
        });
      } else {
        setTimeout(onUnlockSuccess, 500);
      }
    } else {
      setAttemptCount((prev) => prev + 1);
      setIsError(true);
      soundEngine.playWrong();

      const taunts = [
        "Vuul mama! Eto shohoj kotha bhule geli?",
        "Na mama, eita na! Hint ta dekh: 'biyar daw**'",
        "Dawat na dile to khobor ache! Sothik ta lekh!"
      ];
      setErrorMessage(taunts[Math.min(attemptCount, taunts.length - 1)]);

      if (cardRef.current) {
        gsap.timeline()
          .to(cardRef.current, { x: -10, duration: 0.08, ease: 'power1.inOut' })
          .to(cardRef.current, { x: 10, duration: 0.08, ease: 'power1.inOut' })
          .to(cardRef.current, { x: -8, duration: 0.08, ease: 'power1.inOut' })
          .to(cardRef.current, { x: 8, duration: 0.08, ease: 'power1.inOut' })
          .to(cardRef.current, { x: 0, duration: 0.08, ease: 'power1.inOut' });
      }

      setShowHint(true);
    }
  };

  return (
    <section 
      id="vault-scene"
      className="min-h-[100dvh] w-full flex flex-col justify-between items-center px-5 py-8 bg-[#FAF7F0] text-[#201D1A] border-t border-[#E8E1CE]"
    >
      <header className="w-full max-w-md mx-auto flex justify-between items-center text-xs tracking-wider font-mono text-[#8C8375]">
        <div className="flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-[#A37D32]" />
          <span className="font-semibold text-[#3D3830]">THE VAULT</span>
        </div>
        <span className="text-[11px] text-[#A69B89]">03 / 03 SCENE</span>
      </header>

      <div 
        ref={cardRef}
        className={`w-full max-w-md p-6 sm:p-8 rounded-3xl transition-all duration-300 my-auto ${
          isError 
            ? 'bg-rose-50/80 border border-rose-300 shadow-[0_8px_30px_rgba(244,63,94,0.08)]' 
            : isSuccess
              ? 'bg-[#FFFFFF] border-2 border-[#A37D32] shadow-[0_12px_40px_rgba(163,125,50,0.18)]'
              : 'bg-[#FFFFFF]/90 border border-[#E8E1CE] shadow-[0_10px_35px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div className="text-center space-y-5">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-[#F5F0E6] border border-[#E0D7C3] flex items-center justify-center transition-transform">
            {isSuccess ? (
              <Unlock className="w-5 h-5 text-[#A37D32]" />
            ) : isError ? (
              <ShieldAlert className="w-5 h-5 text-rose-600" />
            ) : (
              <Lock className="w-5 h-5 text-[#3D3830]" />
            )}
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-mono tracking-widest text-[#8C8375] uppercase block">
              Tobe ashol kothay ashar agey bol...
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#201D1A] leading-snug">
              Mama <span className="underline decoration-[#A37D32]/50 decoration-wavy underline-offset-6 font-serif-classic">______</span> ta kobe pawa jaito?
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="pt-2 space-y-5">
            <div className="relative max-w-xs mx-auto">
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                inputMode="text"
                enterKeyHint="go"
                spellCheck="false"
                placeholder="type answer..."
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (isError) setIsError(false);
                }}
                disabled={isSuccess}
                className={`w-full text-center py-2.5 bg-transparent font-handwritten text-2xl sm:text-3xl tracking-wider text-[#201D1A] placeholder-[#BDB4A1] focus:outline-none transition-all ${
                  isError 
                    ? 'border-b-2 border-rose-500 text-rose-700' 
                    : isSuccess 
                      ? 'border-b-2 border-[#A37D32] text-[#A37D32] font-semibold' 
                      : 'border-b border-[#D4CBB4] focus:border-[#201D1A]'
                }`}
              />
            </div>

            {isError && (
              <p className="text-xs text-rose-600 font-mono">
                {errorMessage}
              </p>
            )}

            <div className="pt-1">
              <button
                type="submit"
                disabled={isSuccess || !answer.trim()}
                className={`w-full min-h-[48px] py-3 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                  isSuccess
                    ? 'bg-[#A37D32] text-white font-bold'
                    : answer.trim()
                      ? 'bg-[#201D1A] hover:bg-[#3D3830] text-[#FAF7F0] shadow-sm'
                      : 'bg-[#EFEAD9] text-[#9E9584] cursor-not-allowed'
                }`}
              >
                <span>{isSuccess ? 'ACCESS GRANTED' : 'SUBMIT ANSWER'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="pt-3 border-t border-[#F0E9DA] text-center">
            {showHint ? (
              <div className="py-2 px-3 rounded-xl bg-[#F5F0E6] border border-[#E5DCBE] text-xs font-mono text-[#5C5549] inline-block">
                💡 <span className="font-semibold text-[#201D1A]">Hint:</span> biyar daw**
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setShowHint(true);
                }}
                className="text-xs text-[#8C8375] hover:text-[#201D1A] font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>need a hint mama?</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <footer className="text-[11px] font-mono text-[#A69B89] tracking-widest uppercase">
        Step 3 of 3 &bull; Final check
      </footer>
    </section>
  );
}
