import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Activity, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Layers,
  Cpu,
  RotateCcw
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

const radarData = [
  { subject: 'Reaction', A: 120, B: 110, fullMark: 150 },
  { subject: 'Memory', A: 98, B: 130, fullMark: 150 },
  { subject: 'Focus', A: 86, B: 130, fullMark: 150 },
  { subject: 'Logic', A: 99, B: 100, fullMark: 150 },
  { subject: 'Stress', A: 85, B: 90, fullMark: 150 },
  { subject: 'Speed', A: 65, B: 85, fullMark: 150 },
];

const comparisonData = [
  { name: 'Reaction', current: 248, baseline: 210 },
  { name: 'Memory', current: 85, baseline: 92 },
  { name: 'Focus', current: 78, baseline: 88 },
  { name: 'Logic', current: 92, baseline: 90 },
];

export default function DigitalTwin() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Digital Twin Profile</h2>
          <p className="text-gray-400">Deep neural representation of your cognitive architecture.</p>
        </div>
        <div className="flex gap-4">
           <button className="glass-panel px-6 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors">
              <RotateCcw size={16} />
              <span className="text-sm font-bold">Sync Model</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="glass-panel p-8 flex flex-col items-center">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-8 self-start">Cognitive Signature</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" stroke="#ffffff40" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="transparent" />
                <Radar
                  name="Current"
                  dataKey="A"
                  stroke="#00D4FF"
                  fill="#00D4FF"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Baseline"
                  dataKey="B"
                  stroke="#7B61FF"
                  fill="#7B61FF"
                  fillOpacity={0.2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="glass-panel p-8">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Current vs Baseline</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                <XAxis type="number" stroke="#ffffff20" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#ffffff20" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0F1A', border: '1px solid #ffffff20', borderRadius: '12px' }}
                />
                <Bar dataKey="current" fill="#00D4FF" radius={[0, 4, 4, 0]} />
                <Bar dataKey="baseline" fill="#ffffff10" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InsightCard 
          icon={Cpu} 
          title="Model Insights" 
          desc="User shows 15% slower response under stress compared to mission baseline." 
          color="text-neon-blue"
        />
        <InsightCard 
          icon={Layers} 
          title="Neural Layers" 
          desc="12 active layers monitoring executive function, memory, and spatial awareness." 
          color="text-soft-purple"
        />
        <InsightCard 
          icon={ShieldCheck} 
          title="Reliability" 
          desc="Model confidence at 98.4% based on 1,240 hours of mission data." 
          color="text-alert-green"
        />
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="glass-panel p-6">
      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${color}`}>
        <Icon size={24} />
      </div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
