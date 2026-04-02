import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-space-dark/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-400 hover:text-white">
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search mission data..." 
            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-6 text-sm focus:outline-none focus:border-neon-blue/50 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-alert-red rounded-full" />
        </button>
        
        <div className="h-8 w-[1px] bg-white/10 mx-2" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold group-hover:text-neon-blue transition-colors">Alex Vance</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Commander</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-neon-blue transition-all">
             <User size={20} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
