type SoundType = 'beep' | 'scan' | 'servo' | 'hover' | 'select' | 'reveal' | 'pulse';

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled = true;

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  resume() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  play(type: SoundType) {
    if (!this.enabled) return;
    this.resume();
    const ctx = this.getContext();
    const now = ctx.currentTime;

    switch (type) {
      case 'beep':
        this.tone(ctx, 880, 0.08, 'sine', 0.12, now);
        break;
      case 'hover':
        this.tone(ctx, 1200, 0.05, 'sine', 0.06, now);
        break;
      case 'select':
        this.tone(ctx, 660, 0.06, 'square', 0.08, now);
        this.tone(ctx, 990, 0.08, 'sine', 0.06, now + 0.06);
        break;
      case 'scan':
        this.sweep(ctx, 400, 2400, 0.35, 0.1, now);
        break;
      case 'servo':
        this.servoWhir(ctx, now);
        break;
      case 'reveal':
        this.tone(ctx, 440, 0.15, 'sine', 0.1, now);
        this.tone(ctx, 880, 0.2, 'sine', 0.08, now + 0.1);
        this.tone(ctx, 1320, 0.25, 'sine', 0.06, now + 0.2);
        break;
      case 'pulse':
        this.tone(ctx, 220, 0.12, 'triangle', 0.04, now);
        break;
    }
  }

  private tone(
    ctx: AudioContext,
    freq: number,
    duration: number,
    type: OscillatorType,
    gain: number,
    start: number,
  ) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  private sweep(
    ctx: AudioContext,
    from: number,
    to: number,
    duration: number,
    gain: number,
    start: number,
  ) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, start);
    filter.Q.value = 8;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(from, start);
    osc.frequency.exponentialRampToValueAtTime(to, start + duration);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  private servoWhir(ctx: AudioContext, start: number) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, start);
    filter.frequency.linearRampToValueAtTime(800, start + 0.25);
    filter.Q.value = 4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(0.15, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
    noise.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    noise.start(start);
    noise.stop(start + 0.35);
  }
}

export const soundManager = new SoundManager();
