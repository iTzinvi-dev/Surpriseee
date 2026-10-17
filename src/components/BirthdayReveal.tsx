import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { Volume2, VolumeX, Sparkles, RotateCcw, Coffee } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import BirthdayCake from './BirthdayCake';

interface BirthdayRevealProps {
  onRestart: () => void;
}

export default function BirthdayReveal({ onRestart }: BirthdayRevealProps) {
  const [isAudioMuted, setIsAudioMuted] = useState(soundEngine.getIsMuted());
  const [toastsCount, setToastsCount] = useState(1);
  const [showToastFeedback, setShowToastFeedback] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const teaserRef = useRef<HTMLParagraphElement>(null);
  const grandTitleRef = useRef<HTMLHeadingElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  const messageCardRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const shootCelebrationSparks = () => {
    const colors = ['#A37D32', '#C89B3C', '#E5DCBE', '#D4C5A9', '#FAF7F0'];
    
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 65,
      origin: { x: 0.1, y: 0.6 },
      colors
    });

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 65,
      origin: { x: 0.9, y: 0.6 },
      colors
    });

    confetti({
      particleCount: 35,
      spread: 90,
      origin: { y: 0.4 },
      colors,
      shapes: ['star', 'circle']
    });
  };

  useEffect(() => {
    soundEngine.startBirthdayBgm();
    shootCelebrationSparks();
    const secondBurst = setTimeout(shootCelebrationSparks, 1200);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        teaserRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }
      )
      .to(
        teaserRef.current,
        { opacity: 0, y: -10, duration: 0.8, delay: 2.0, ease: 'power2.in' }
      )
      .fromTo(
        grandTitleRef.current,
        { opacity: 0, scale: 0.9, y: 25, filter: 'blur(6px)' },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          filter: 'blur(0px)', 
          duration: 1.4, 
          ease: 'power3.out' 
        }
      )
      .fromTo(
        cakeRef.current,
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.4)' },
        "-=0.6"
      )
      .fromTo(
        messageCardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        "-=0.5"
      )
      .fromTo(
        actionsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.3"
      );
    });

    return () => {
      soundEngine.stopBirthdayBgm();
      clearTimeout(secondBurst);
      ctx.revert();
    };
  }, []);

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
    soundEngine.playClick();
  };

  const handleToastChai = () => {
    soundEngine.playClick();
    setToastsCount((prev) => prev + 1);
    setShowToastFeedback(true);
    shootCelebrationSparks();
    setTimeout(() => setShowToastFeedback(false), 2200);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-5 py-8 bg-[#FAF7F0] text-[#201D1A]"
    >
      <header className="w-full max-w-md mx-auto flex justify-between items-center text-xs tracking-wider font-mono text-[#8C8375] z-20">
        <span className="font-semibold text-[#3D3830]">CELEBRATION</span>
        <button
          type="button"
          onClick={handleToggleAudio}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E0D7C3] hover:border-[#A37D32] text-[#201D1A] shadow-xs transition-colors cursor-pointer"
          title={isAudioMuted ? "Unmute Lo-Fi" : "Mute Lo-Fi"}
        >
          {isAudioMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-[11px] font-medium">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#A37D32] animate-pulse" />
              <span className="text-[11px] font-medium">Lo-Fi Playing</span>
            </>
          )}
        </button>
      </header>

      <div className="my-auto max-w-md w-full text-center space-y-5 py-4 z-10">
        <p
          ref={teaserRef}
          className="font-handwritten text-xl sm:text-2xl text-[#8C733E] tracking-wide font-medium min-h-[32px]"
        >
          Ahare! Dawat pabo to amra mama? joldi e pawa Chai. But ajker jonno...
        </p>

        <div className="space-y-1">
          <h1
            ref={grandTitleRef}
            className="text-3xl sm:text-5xl font-serif-luxury font-black tracking-tight text-[#201D1A] leading-[1.15]"
          >
            HAPPY BIRTHDAY, <br />
            <span className="text-[#A37D32]">BROTHER!</span>
          </h1>
          <p className="font-handwritten text-lg sm:text-xl text-[#6B6355]">
            Shuvo Jonmodin Mama &bull; May your year be legendary
          </p>
        </div>

        <div ref={cakeRef} className="py-1">
          <BirthdayCake onCandleBlown={shootCelebrationSparks} />
        </div>

        <article
          ref={messageCardRef}
          className="relative max-w-md mx-auto p-6 sm:p-7 rounded-3xl bg-[#FFFFFF] border border-[#E5DCBE] shadow-[0_12px_40px_rgba(0,0,0,0.05)] text-left space-y-4 font-bengali"
        >
          <div className="flex items-center justify-between border-b border-[#F0E9DA] pb-3">
            <span className="font-serif-classic text-xl font-bold text-[#201D1A]">
              "নাহিদ মামা,"
            </span>
            <span className="text-[10px] font-mono text-[#A37D32] uppercase tracking-wider bg-[#F7F2E7] px-2.5 py-1 rounded-full border border-[#E5DCBE]">
              Brotherhood Forever
            </span>
          </div>

          <p className="text-sm sm:text-[15px] text-[#3D3830] leading-relaxed">
            জন্মদিনের অনেক অনেক শুভেচ্ছা, নাহিদ মামা! 🎉 তুই সব সময় বন্ধুদের যেভাবে আগলে রাখিস, তুই ছাড়া আমাদের আড্ডা আসলেই সব সময় ইনকমপ্লিট। এত বছরের বন্ধুত্ব আর এই সব সুন্দর মেমোরিগুলো আসলেই লাইফের সবচেয়ে বড় পাওয়া।
          </p>

          <p className="text-sm sm:text-[15px] text-[#3D3830] leading-relaxed">
            তুই যেভাবে সব সিচুয়েশনে সাথে থাকিস, তোর মতো একজন বন্ধু পাওয়া আসলেই ভাগ্যের ব্যাপার। আল্লাহ তোকে সব সময় সুস্থ রাখুক, তোর লাইফ আনন্দে ভরিয়ে দিক, আর তোর সব স্বপ্ন সত্যি হোক। আমিন! 🤲✨
          </p>

          <p className="text-sm sm:text-[15px] text-[#3D3830] leading-relaxed">
            আর হ্যাঁ... বিয়ের দাওয়াত এর কথা কিন্তু আমরা আসলেই কেউ ভুলি নাই! 👀 সব বন্ধু এখন শুধু তোর দাওয়াত খাওয়ার অপেক্ষায় আছে। জলদি জলদি ভাবিকে নিয়ে আয়, সবাই মিলে একটা সেরা সেলিব্রেশন করা লাগবে! 🥳🥳
          </p>

          <p className="text-sm sm:text-[15px] text-[#3D3830] font-medium leading-relaxed">
            আজকের দিনটা খুব ভালো কাটুক, অনেক অনেক ভালোবাসা তোর জন্য! 🎂❤️
          </p>

          <div className="pt-3 border-t border-[#F0E9DA] flex items-center justify-between gap-2">
            <div>
              <span className="block font-handwritten text-xl text-[#201D1A]">
                Always by your side,
              </span>
              <span className="text-[10px] font-mono text-[#8C8375]">
                Your brothers
              </span>
            </div>

            <button
              type="button"
              onClick={handleToastChai}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#F2ECE0] border border-[#DDD3BE] text-xs font-mono text-[#201D1A] transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-2xs"
            >
              <Coffee className="w-4 h-4 text-[#A37D32]" />
              <span>Toast Chai ({toastsCount})</span>
            </button>
          </div>

          {showToastFeedback && (
            <p className="text-center text-xs font-mono text-[#8C733E] pt-1">
              ☕ Ekta gorom cha ar toast kora holo mama!
            </p>
          )}
        </article>

        <div
          ref={actionsRef}
          className="flex items-center justify-center gap-3 pt-1"
        >
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              shootCelebrationSparks();
            }}
            className="min-h-[48px] px-6 py-2.5 rounded-full bg-[#201D1A] hover:bg-[#3D3830] active:scale-95 text-[#FAF7F0] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Drop More Confetti</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onRestart();
            }}
            className="min-h-[48px] px-4 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F5F0E6] active:scale-95 border border-[#DDD3BE] text-[#59544D] font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Start from beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>
        </div>
      </div>

      <footer className="w-full text-center text-[10px] font-mono text-[#A69B89] tracking-widest pt-4 uppercase">
        Happy Birthday Mama &bull; Crafted with love
      </footer>
    </section>
  );
}
