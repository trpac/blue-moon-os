import { useState, useEffect } from 'react';

interface DeepWorkModeProps {
  goal: string;
  duration: number; // in minutes
  onFinish: () => void;
}

const DeepWorkMode: React.FC<DeepWorkModeProps> = ({ goal, duration, onFinish }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      onFinish();
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onFinish]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in duration-1000">
      <div className="text-center space-y-2">
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold">
          Deep Work Session
        </p>
        <h2 className="text-2xl font-light tracking-tight text-zinc-200">
          {goal}
        </h2>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Subtle pulsing ring */}
        <div className="absolute inset-0 rounded-full border border-zinc-100/10 animate-ping opacity-20" />
        
        <div className="text-8xl md:text-9xl font-mono font-medium tracking-tighter text-zinc-100">
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => setIsActive(!isActive)}
          className="text-zinc-500 hover:text-zinc-100 text-xs uppercase tracking-widest transition-all"
        >
          {isActive ? '[ Pause ]' : '[ Resume ]'}
        </button>
      </div>
    </div>
  );
};

export default DeepWorkMode;