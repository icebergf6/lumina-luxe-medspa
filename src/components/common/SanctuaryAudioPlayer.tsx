import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';

export const SanctuaryAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<any[]>([]);

  // Setup synthesized luxury spa ambient soundscape using Web Audio API
  // Creates a soothing 528Hz Solfeggio harmonic drone with gentle pink-filtered natural ocean/zen breeze
  const startZenAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      // Gentle fade in to very quiet background level (10% volume)
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Warm harmonic base drone (Solfeggio 528Hz octave: 132Hz & 264Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(132, ctx.currentTime);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(264, ctx.currentTime);

      const droneGain = ctx.createGain();
      droneGain.gain.value = 0.25;

      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(masterGain);

      // 2. Soft pink noise generator for spa waterfall/breeze ambiance
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.035; // gentle whisper
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass filter to make it velvet soft
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();
      whiteNoise.start();

      nodesRef.current = [osc1, osc2, whiteNoise];
      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio playback prevented by browser policy:', err);
    }
  };

  const stopZenAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        nodesRef.current.forEach((n) => {
          try { n.stop(); n.disconnect(); } catch (e) {}
        });
        nodesRef.current = [];
        ctx.close();
        audioCtxRef.current = null;
        gainNodeRef.current = null;
        setIsPlaying(false);
      }, 1300);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopZenAudio();
    } else {
      startZenAudio();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <button
        type="button"
        onClick={toggleSound}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-[#111827]/90 border-[#C5A880] text-white shadow-[#C5A880]/20'
            : 'bg-[#0B0F19]/80 border-slate-800 text-slate-400 hover:text-white hover:border-[#C5A880]/50'
        }`}
        title={isPlaying ? 'Pause Sanctuary Ambience' : 'Play Luxury Spa Ambience (528Hz)'}
        aria-label="Toggle Luxury Sanctuary Acoustic Soundscape"
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 bg-[#C5A880] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3.5" />
              <span className="w-0.5 bg-[#E2CFB6] rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-2" />
              <span className="w-0.5 bg-[#C5A880] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C5A880] transition-colors" />
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold tracking-wider uppercase font-mono leading-tight">
            {isPlaying ? 'Sanctuary Audio: On' : 'Spa Ambience'}
          </span>
          <span className="text-[8px] text-[#C5A880] tracking-widest font-mono leading-none">
            {isPlaying ? '528Hz Solfeggio' : 'Tap to Listen'}
          </span>
        </div>
      </button>
    </div>
  );
};
