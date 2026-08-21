import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Flame, Music, Sparkles } from 'lucide-react';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundMode, setSoundMode] = useState<'fire' | 'chimes' | 'both'>('both');
  const [volume, setVolume] = useState(0.25);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  // Initialize or start audio
  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      isPlayingRef.current = true;
      setIsPlaying(true);

      // Create continuous cozy fireplace crackle using filtered brown noise and random pops
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // boost brown noise
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 420;

      const fireGain = ctx.createGain();
      fireGain.gain.value = soundMode === 'chimes' ? 0 : 0.45;

      whiteNoise.connect(filter);
      filter.connect(fireGain);
      fireGain.connect(masterGain);
      whiteNoise.start();

      // Routine crackles / pops and occasional music box bells
      const playPopsAndChimes = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;
        const currentCtx = audioCtxRef.current;
        const now = currentCtx.currentTime;

        // Crackle pop
        if (soundMode !== 'chimes' && Math.random() > 0.3) {
          const pop = currentCtx.createBufferSource();
          const popBuffer = currentCtx.createBuffer(1, currentCtx.sampleRate * 0.05, currentCtx.sampleRate);
          const popData = popBuffer.getChannelData(0);
          for (let i = 0; i < popData.length; i++) {
            popData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (currentCtx.sampleRate * 0.008));
          }
          pop.buffer = popBuffer;
          const popFilter = currentCtx.createBiquadFilter();
          popFilter.type = 'bandpass';
          popFilter.frequency.value = 1200 + Math.random() * 2400;
          popFilter.Q.value = 3;

          const popGain = currentCtx.createGain();
          popGain.gain.setValueAtTime(Math.random() * 0.4 + 0.1, now);

          pop.connect(popFilter);
          popFilter.connect(popGain);
          popGain.connect(masterGain);
          pop.start(now);
        }

        // Gentle Holiday Bell Chime (C, E, G, B, D notes in pentatonic peace)
        if (soundMode !== 'fire' && Math.random() > 0.65) {
          const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
          const freq = freqs[Math.floor(Math.random() * freqs.length)];

          const osc = currentCtx.createOscillator();
          const chimeGain = currentCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          chimeGain.gain.setValueAtTime(0, now);
          chimeGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

          osc.connect(chimeGain);
          chimeGain.connect(masterGain);

          osc.start(now);
          osc.stop(now + 3.2);
        }
      };

      intervalRef.current = window.setInterval(playPopsAndChimes, 220);
    } catch (e) {
      console.warn('Web Audio error or not supported:', e);
    }
  };

  const stopAudio = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div
      id="holiday-ambient-player"
      className="flex items-center gap-2 rounded-full border border-[#e8dfd1] bg-white px-3 py-1.5 text-xs font-sans text-[#5a5a40] shadow-sm backdrop-blur-md transition-all hover:border-[#1e3a1e]"
    >
      <button
        id="ambient-toggle-btn"
        onClick={togglePlay}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium transition-all ${
          isPlaying
            ? 'bg-[#1e3a1e] text-white shadow-sm'
            : 'bg-[#f1ebe3] text-[#5a5a40] hover:text-[#1e3a1e] hover:bg-[#e8dfd1]'
        }`}
        title={isPlaying ? 'Pause Holiday Ambience' : 'Play Hearthside Hearth & Chimes Ambience'}
      >
        {isPlaying ? (
          <>
            <Flame className="h-3.5 w-3.5 animate-pulse text-[#dfb76c]" />
            <span>Hearth Ambience</span>
            <Volume2 className="h-3 w-3" />
          </>
        ) : (
          <>
            <Flame className="h-3.5 w-3.5 text-[#b91c1c]" />
            <span>Hearth Sounds</span>
            <VolumeX className="h-3 w-3 opacity-60" />
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-2 pl-1">
          <button
            onClick={() => setSoundMode(m => m === 'both' ? 'fire' : m === 'fire' ? 'chimes' : 'both')}
            className="rounded px-1.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider text-[#1e3a1e] hover:bg-[#e8efea]"
            title="Switch Ambience Mode"
          >
            {soundMode === 'both' ? 'Fire + Chimes' : soundMode === 'fire' ? 'Fire Only' : 'Chimes Only'}
          </button>
          <input
            id="ambient-volume-slider"
            type="range"
            min="0.05"
            max="0.8"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-1.5 w-14 cursor-pointer accent-[#1e3a1e]"
            title="Volume"
          />
        </div>
      )}
    </div>
  );
};
