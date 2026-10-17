class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgLoopTimeout: number | null = null;
  private isPlayingBgm: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Audio policy fallback
    }
  }

  public playUnlock() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.09);

        gain.gain.setValueAtTime(0.001, this.ctx!.currentTime + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.12, this.ctx!.currentTime + idx * 0.09 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.09 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.09);
        osc.stop(this.ctx!.currentTime + idx * 0.09 + 0.85);
      });
    } catch {
      // Audio policy fallback
    }
  }

  public startBirthdayBgm() {
    if (this.isPlayingBgm) return;
    this.isPlayingBgm = true;

    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25;

    const melody: [number, number][] = [
      [G4, 0.4], [G4, 0.4], [A4, 0.8], [G4, 0.8], [C5, 0.8], [B4, 1.4],
      [G4, 0.4], [G4, 0.4], [A4, 0.8], [G4, 0.8], [D4 * 2, 0.8], [C5, 1.4],
      [G4, 0.4], [G4, 0.4], [G4 * 2, 0.8], [E4 * 2, 0.8], [C5, 0.8], [B4, 0.8], [A4, 1.2],
      [F4 * 2, 0.4], [F4 * 2, 0.4], [E4 * 2, 0.8], [C5, 0.8], [D4 * 2, 0.8], [C5, 2.0]
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlayingBgm) return;

      if (!this.isMuted) {
        try {
          this.initCtx();
          if (this.ctx) {
            const [freq, dur] = melody[noteIndex];
            const osc = this.ctx.createOscillator();
            const sub = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            sub.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            sub.frequency.setValueAtTime(freq / 2, this.ctx.currentTime);

            gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur * 1.4);

            osc.connect(gain);
            sub.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            sub.start();
            osc.stop(this.ctx.currentTime + dur * 1.5);
            sub.stop(this.ctx.currentTime + dur * 1.5);
          }
        } catch {
          // Audio policy fallback
        }
      }

      const currentDur = melody[noteIndex][1];
      noteIndex = (noteIndex + 1) % melody.length;
      const pause = noteIndex === 0 ? 3000 : currentDur * 900;
      this.bgLoopTimeout = window.setTimeout(playNextNote, pause);
    };

    playNextNote();
  }

  public stopBirthdayBgm() {
    this.isPlayingBgm = false;
    if (this.bgLoopTimeout) {
      clearTimeout(this.bgLoopTimeout);
      this.bgLoopTimeout = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEngine = new SoundEngine();
