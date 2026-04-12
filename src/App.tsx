import { useState, useEffect } from "react";
import { 
  SetupMode, 
  DeepWorkMode, 
  RecoveryMode, 
  type MonkModeState 
} from "./components/features/monk-mode";

function App() {
  const [mode, setMode] = useState<MonkModeState>('IDLE');
  const [session, setSession] = useState({ goal: '', duration: 0 });

  // Handle Global OS Guardrails
  useEffect(() => {
    if (mode === 'ACTIVE') {
      document.body.classList.add('overflow-hidden', 'monk-mode-active');
    } else {
      document.body.classList.remove('overflow-hidden', 'monk-mode-active');
    }
  }, [mode]);

  const handleStart = (goal: string, duration: number) => {
    setSession({ goal, duration });
    setMode('ACTIVE');
  };

  const handleComplete = () => {
    const newLog = {
      id: Date.now(),
      goal: session.goal,
      duration: session.duration,
      timestamp: new Date().toISOString()
    };
    
    // Persistence Logic
    const existingLogs = JSON.parse(localStorage.getItem('blue_moon_logs') || '[]');
    localStorage.setItem('blue_moon_logs', JSON.stringify([...existingLogs, newLog]));
    
    setMode('REST');
  };

  return (
    <main className={`min-h-screen transition-colors duration-1000 flex flex-col items-center justify-center p-6 text-zinc-100 selection:bg-zinc-100 selection:text-black ${
      mode === 'ACTIVE' ? 'bg-black' : 'bg-zinc-950'
    }`}>
      
      {/* 1. SETUP & HISTORY VIEW */}
      {mode === 'IDLE' && (
        <div className="flex flex-col items-center space-y-12">
          <SetupMode onStart={handleStart} />
          
          <div className="text-center space-y-3">
            <p className="text-zinc-600 uppercase tracking-[0.3em] text-[10px] font-bold">
              Daily Progress
            </p>
          </div>
        </div>
      )}

      {/* 2. ACTIVE DEEP WORK VIEW */}
      {mode === 'ACTIVE' && (
        <DeepWorkMode 
          goal={session.goal} 
          duration={session.duration} 
          onFinish={handleComplete} 
        />
      )}
      
      {/* 3. RECOVERY VIEW */}
      {mode === 'REST' && (
        <RecoveryMode onReset={() => setMode('IDLE')} />
      )}
      
    </main>
  );
}

export default App;