import { useEffect, useState } from 'react';

const RecoveryMode = ({ onReset }: { onReset: () => void }) => {
  const [instruction, setInstruction] = useState<'Inhale' | 'Exhale'>('Inhale');

  useEffect(() => {
    // Simple 4-second breath cycle to help reset the nervous system
    const interval = setInterval(() => {
      setInstruction((prev) => (prev === 'Inhale' ? 'Exhale' : 'Inhale'));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-12 animate-in fade-in zoom-in duration-1000">
      <div className="text-center space-y-3">
        <h2 className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] font-bold">
          Recovery Phase
        </h2>
        <p className="text-zinc-400 font-light tracking-tight">
          Decompress and recalibrate.
        </p>
      </div>

      {/* Dynamic Breathing Guide */}
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Outer Glow Ring */}
        <div className={`absolute inset-0 rounded-full border border-zinc-100/10 transition-transform duration-[4000ms] ease-in-out ${
          instruction === 'Inhale' ? 'scale-150 opacity-20' : 'scale-100 opacity-5'
        }`} />
        
        {/* Inner Pulse Circle */}
        <div className={`w-32 h-32 rounded-full bg-zinc-100/5 border border-zinc-800 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
          instruction === 'Inhale' ? 'scale-110' : 'scale-90'
        }`}>
          <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-medium animate-pulse">
            {instruction}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <p className="text-zinc-600 text-[11px] italic max-w-[240px] text-center leading-relaxed">
          "The recovery is just as important as the effort."
        </p>
        
        <button 
          onClick={onReset}
          className="group relative px-10 py-3 overflow-hidden rounded-full border border-zinc-800 transition-all hover:border-zinc-100"
        >
          <span className="relative z-10 text-zinc-500 group-hover:text-zinc-100 text-[10px] uppercase tracking-[0.3em] transition-colors">
            End Session
          </span>
          <div className="absolute inset-0 bg-zinc-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out opacity-[0.03]" />
        </button>
      </div>
    </div>
  );
};

export default RecoveryMode;