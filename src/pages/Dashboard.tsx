import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Brain, 
  AlertTriangle, 
  User, 
  TrendingUp, 
  Clock,
  Zap,
  Heart
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const mockData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  reaction: 250 + Math.random() * 50,
  heartRate: 70 + Math.random() * 15,
  errors: Math.floor(Math.random() * 3)
}));

export default function Dashboard() {
  const [status, setStatus] = useState<'Normal' | 'Warning' | 'Critical'>('Normal');
  const [riskScore, setRiskScore] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(prev => {
        const next = prev + (Math.random() > 0.5 ? 1 : -1);
        return Math.max(5, Math.min(95, next));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (riskScore > 70) setStatus('Critical');
    else if (riskScore > 40) setStatus('Warning');
    else setStatus('Normal');
  }, [riskScore]);

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Cognitive State" 
          value={status} 
          icon={Brain} 
          color={status === 'Normal' ? 'text-alert-green' : status === 'Warning' ? 'text-alert-yellow' : 'text-alert-red'}
          trend="+2.4%"
        />
        <StatCard 
          title="Reaction Time" 
          value="248ms" 
          icon={Clock} 
          color="text-neon-blue"
          trend="-12ms"
        />
        <StatCard 
          title="Heart Rate" 
          value="72 BPM" 
          icon={Heart} 
          color="text-soft-purple"
          trend="Stable"
        />
        <StatCard 
          title="Risk Score" 
          value={`${riskScore}%`} 
          icon={TrendingUp} 
          color={riskScore > 50 ? 'text-alert-red' : 'text-neon-blue'}
          trend={riskScore > 50 ? 'Increasing' : 'Low'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold uppercase tracking-wider">Real-Time Performance</h3>
            <div className="flex gap-4 text-xs font-orbitron">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-neon-blue rounded-full" />
                <span>Reaction Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-soft-purple rounded-full" />
                <span>Heart Rate</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorReaction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0F1A', border: '1px solid #ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="reaction" stroke="#00D4FF" fillOpacity={1} fill="url(#colorReaction)" strokeWidth={2} />
                <Line type="monotone" dataKey="heartRate" stroke="#7B61FF" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Prediction Panel */}
        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-6">AI Prediction</h3>
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <div className="relative w-40 h-40">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                 <circle 
                   cx="80" 
                   cy="80" 
                   r="70" 
                   stroke="currentColor" 
                   strokeWidth="8" 
                   fill="transparent" 
                   strokeDasharray={440} 
                   strokeDashoffset={440 - (440 * riskScore) / 100} 
                   className={`${riskScore > 70 ? 'text-alert-red' : riskScore > 40 ? 'text-alert-yellow' : 'text-neon-blue'} transition-all duration-1000`}
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-4xl font-black">{riskScore}%</span>
                 <span className="text-[10px] uppercase text-gray-500">Risk Level</span>
               </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">Predicted Decline in:</p>
              <p className="text-2xl font-orbitron text-neon-blue">12 Minutes</p>
            </div>
            <div className="w-full p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={16} className="text-alert-yellow" />
                <span className="text-xs font-bold uppercase">Insight</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Cognitive fatigue detected. Recommend 15-minute rest period or hydration protocol.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Box */}
        <div className={`glass-panel p-6 border-l-4 ${status === 'Critical' ? 'border-alert-red' : status === 'Warning' ? 'border-alert-yellow' : 'border-alert-green'}`}>
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${status === 'Critical' ? 'bg-alert-red/20 text-alert-red' : status === 'Warning' ? 'bg-alert-yellow/20 text-alert-yellow' : 'bg-alert-green/20 text-alert-green'}`}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-1">System Alert</h4>
              <p className="text-sm text-gray-400">
                {status === 'Normal' ? 'All cognitive parameters within baseline.' : status === 'Warning' ? 'Early signs of cognitive fatigue detected.' : 'Critical cognitive decline predicted. Immediate action required.'}
              </p>
            </div>
          </div>
        </div>

        {/* Astronaut Profile */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-blue to-soft-purple p-0.5">
              <div className="w-full h-full rounded-2xl bg-space-dark flex items-center justify-center">
                <User size={40} className="text-white/50" />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] uppercase text-gray-500 mb-1">Name</p>
                <p className="font-bold">Cmdr. Alex Vance</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 mb-1">Age</p>
                <p className="font-bold">34</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 mb-1">Mission</p>
                <p className="font-bold">Ares-IV</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-alert-green rounded-full" />
                  <span className="font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, trend }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
          <Icon size={20} />
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 ${trend.includes('+') || trend.includes('Increasing') ? 'text-alert-red' : 'text-alert-green'}`}>
          {trend}
        </span>
      </div>
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{title}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
    </motion.div>
  );
}
