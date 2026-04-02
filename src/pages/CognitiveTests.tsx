import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Timer, Trophy, Play, RefreshCw, Zap, Target } from 'lucide-react';

type TestType = 'reaction' | 'memory' | 'focus';

export default function CognitiveTests() {
  const [activeTest, setActiveTest] = useState<TestType | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cognitive Assessment</h2>
          <p className="text-gray-400">Validate your digital twin with real-time performance tests.</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-panel px-4 py-2 flex items-center gap-2">
              <Trophy size={16} className="text-alert-yellow" />
              <span className="text-sm font-bold">Daily Rank: #4</span>
           </div>
        </div>
      </div>

      {!activeTest ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestCard 
            title="Reaction Time" 
            desc="Test your basic processing speed. Click as fast as you can when the color changes."
            icon={Zap}
            color="text-neon-blue"
            onClick={() => setActiveTest('reaction')}
          />
          <TestCard 
            title="Memory (N-Back)" 
            desc="Challenge your working memory. Recall numbers shown in sequence."
            icon={Brain}
            color="text-soft-purple"
            onClick={() => setActiveTest('memory')}
          />
          <TestCard 
            title="Focus Test" 
            desc="Identify target objects amidst distractions to measure selective attention."
            icon={Target}
            color="text-alert-green"
            onClick={() => setActiveTest('focus')}
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => setActiveTest(null)}
            className="mb-6 text-sm text-gray-400 hover:text-white flex items-center gap-2"
          >
            <RefreshCw size={14} /> Back to Selection
          </button>
          
          {activeTest === 'reaction' && <ReactionTest />}
          {activeTest === 'memory' && <MemoryTest />}
          {activeTest === 'focus' && <FocusTest />}
        </div>
      )}
    </div>
  );
}

function TestCard({ title, desc, icon: Icon, color, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-8 flex flex-col items-center text-center group cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
        <Icon size={40} />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-8 font-light">{desc}</p>
      <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition-colors flex items-center justify-center gap-2">
        <Play size={16} /> Start Test
      </button>
    </motion.div>
  );
}

function ReactionTest() {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const timeoutRef = useRef<any>(null);

  const startTest = () => {
    setGameState('waiting');
    const delay = 2000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      alert('Too early!');
      setGameState('idle');
    } else if (gameState === 'ready') {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setGameState('result');
    }
  };

  return (
    <div className="glass-panel p-12 flex flex-col items-center min-h-[400px] justify-center">
      <AnimatePresence mode="wait">
        {gameState === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to test your speed?</h3>
            <button onClick={startTest} className="bg-neon-blue text-space-dark font-bold py-4 px-12 rounded-full neon-glow">
              Start
            </button>
          </motion.div>
        )}

        {gameState === 'waiting' && (
          <motion.div 
            key="waiting" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full h-64 bg-alert-red/20 rounded-2xl flex items-center justify-center cursor-pointer"
            onClick={handleClick}
          >
            <span className="text-2xl font-orbitron animate-pulse">Wait for Green...</span>
          </motion.div>
        )}

        {gameState === 'ready' && (
          <motion.div 
            key="ready" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full h-64 bg-alert-green rounded-2xl flex items-center justify-center cursor-pointer neon-glow"
            onClick={handleClick}
          >
            <span className="text-4xl font-black text-space-dark">CLICK NOW!</span>
          </motion.div>
        )}

        {gameState === 'result' && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
            <h3 className="text-xl text-gray-400 mb-2 uppercase">Your Result</h3>
            <p className="text-6xl font-black text-neon-blue mb-8">{reactionTime}ms</p>
            <button onClick={startTest} className="bg-white/10 hover:bg-white/20 font-bold py-3 px-8 rounded-full transition-colors">
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MemoryTest() {
  return (
    <div className="glass-panel p-12 flex flex-col items-center min-h-[400px] justify-center text-center">
      <Brain size={64} className="text-soft-purple mb-6" />
      <h3 className="text-2xl font-bold mb-4">N-Back Memory Test</h3>
      <p className="text-gray-400 mb-8">This module is currently being calibrated for your mission profile.</p>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '65%' }}
          className="h-full bg-soft-purple"
        />
      </div>
      <span className="text-[10px] uppercase text-gray-500 mt-2">Calibration 65% Complete</span>
    </div>
  );
}

function FocusTest() {
  return (
    <div className="glass-panel p-12 flex flex-col items-center min-h-[400px] justify-center text-center">
      <Target size={64} className="text-alert-green mb-6" />
      <h3 className="text-2xl font-bold mb-4">Selective Attention Test</h3>
      <p className="text-gray-400 mb-8">This module is currently being calibrated for your mission profile.</p>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '40%' }}
          className="h-full bg-alert-green"
        />
      </div>
      <span className="text-[10px] uppercase text-gray-500 mt-2">Calibration 40% Complete</span>
    </div>
  );
}
