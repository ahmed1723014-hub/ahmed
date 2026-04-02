import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Brain, 
  Activity, 
  Settings, 
  LineChart, 
  Shield, 
  Zap,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Zap, label: 'Tests', path: '/tests' },
  { icon: Brain, label: 'Digital Twin', path: '/twin' },
  { icon: LineChart, label: 'Analytics', path: '/analytics' },
  { icon: Activity, label: 'Simulation', path: '/simulation' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-space-dark border-r border-white/10 flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center neon-glow">
            <Shield size={20} className="text-space-dark" />
          </div>
          <span className="font-orbitron font-black text-xl tracking-tighter">ASTRO<span className="text-neon-blue">TWIN</span></span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
              isActive 
                ? "bg-neon-blue/10 text-neon-blue" 
                : "text-gray-500 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-transform group-hover:scale-110",
              "group-[.active]:text-neon-blue"
            )} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <div className="glass-panel p-4 mb-4">
           <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-alert-green rounded-full animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Sync Status</span>
           </div>
           <p className="text-xs font-medium">Model v4.2.0 - Stable</p>
        </div>
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:text-alert-red hover:bg-alert-red/5 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
