import React, { useState } from 'react';

interface SetupModeProps {
  onStart: (goal: string, duration: number) => void;
}

const SetupMode: React.FC<SetupModeProps> = ({ onStart }) => {
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState(90); // Default to a 90-min block

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onStart(goal, duration);
    }
  };

  return (
    <div className="w-full max-w-md space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-2">
        <h2 className="text-zinc-400 uppercase tracking-[0.2em] text-xs font-semibold">
          Initiate Monk Mode
        </h2>
        <p className="text-zinc-500 text-sm italic">
          "Simplify to amplify."
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Goal Input */}
        <div className="group relative">
          <label className="block text-zinc-500 text-[10px] uppercase tracking-widest mb-2 transition-colors group-focus-within:text-blue-400">
            Current Objective
          </label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="What is the one thing?"
            className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl outline-none transition-all focus:border-zinc-100 placeholder:text-zinc-700"
            autoFocus
          />
        </div>

        {/* Duration Selector */}
        <div className="space-y-4">
          <label className="block text-zinc-500 text-[10px] uppercase tracking-widest">
            Session Length (Minutes)
          </label>
          <div className="flex justify-between gap-4">
            {[30, 60, 90].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDuration(mins)}
                className={`flex-1 py-2 rounded-md border text-sm transition-all ${
                  duration === mins
                    ? 'border-zinc-100 bg-zinc-100 text-black'
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        {/* Trigger */}
        <button
          type="submit"
          disabled={!goal.trim()}
          className="w-full py-4 bg-zinc-100 text-black font-bold uppercase tracking-widest text-sm rounded-sm transition-all hover:bg-white active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Enter Deep Work
        </button>
      </form>
    </div>
  );
};

export default SetupMode;