import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wind, 
  Moon, 
  Zap, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw,
  AlertCircle,
  Brain
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function Simulation() {
  const [sleep, setSleep] = useState(8);
  const [stress, setStress] = useState(20);
  const [co2, setCo2] = useState(400);
  const [isSimulating, setIsSimulating] = useState(false);

  const generateSimData = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const base = 250;
      const sleepImpact = (8 - sleep) * 15;
      const stressImpact = stress * 0.8;
      const co2Impact = (co2 - 400) * 0.05;
      return {
        hour: `${i}h`,
        performance: Math.max(100, base - sleepImpact - stressImpact - co2Impact + Math.random() * 20)
      };
    });
  };

  const [simData, setSimData] = useState(generateSimData());

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimData(generateSimData());
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mission Simulation</h2>
          <p className="text-gray-400">Stress-test your digital twin under extreme space conditions.</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full glass-panel ${isSimulating ? 'text-alert-yellow' : 'text-alert-green'}`}>
          <Activity size={16} className={isSimulating ? 'animate-spin' : ''} />
          <span className="text-xs font-bold uppercase tracking-widest">
            {isSimulating ? 'Simulating...' : 'Ready'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="glass-panel p-8 space-y-10">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Environmental Controls</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Moon size={18} className="text-soft-purple" />
                <span className="text-sm font-medium">Sleep Deprivation</span>
              </div>
              <span className="text-neon-blue font-orbitron">{sleep}h</span>
            </div>
            <input 
              type="range" min="0" max="12" step="0.5" value={sleep} 
              onChange={(e) => setSleep(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
            <div className="flex justify-between text-[10px] text-gray-500 uppercase">
              <span>Exhausted</span>
              <span>Rested</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-alert-yellow" />
                <span className="text-sm font-medium">Stress Level</span>
              </div>
              <span className="text-neon-blue font-orbitron">{stress}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={stress} 
              onChange={(e) => setStress(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
            <div className="flex justify-between text-[10px] text-gray-500 uppercase">
              <span>Calm</span>
              <span>Extreme</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Wind size={18} className="text-alert-red" />
                <span className="text-sm font-medium">CO₂ Concentration</span>
              </div>
              <span className="text-neon-blue font-orbitron">{co2} ppm</span>
            </div>
            <input 
              type="range" min="400" max="5000" step="100" value={co2} 
              onChange={(e) => setCo2(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
            <div className="flex justify-between text-[10px] text-gray-500 uppercase">
              <span>Normal</span>
              <span>Toxic</span>
            </div>
          </div>

          <button 
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-4 rounded-2xl bg-neon-blue text-space-dark font-black uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 neon-glow flex items-center justify-center gap-3"
          >
            {isSimulating ? <RotateCcw className="animate-spin" /> : <Play />}
            Run Simulation
          </button>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 h-[400px]">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Predicted Performance Output</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="hour" stroke="#ffffff20" fontSize={12} />
                <YAxis stroke="#ffffff20" fontSize={12} domain={[0, 300]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0F1A', border: '1px solid #ffffff20', borderRadius: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#00D4FF" 
                  strokeWidth={3} 
                  dot={{ fill: '#00D4FF', r: 4 }} 
                  activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-alert-red/10 text-alert-red">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Critical Threshold</p>
                <p className="font-bold">Predicted failure at T+8h</p>
              </div>
            </div>
            <div className="glass-panel p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-neon-blue/10 text-neon-blue">
                <Brain size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">AI Recommendation</p>
                <p className="font-bold">Increase O₂ flow by 15%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
