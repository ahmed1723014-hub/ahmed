import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Cpu, 
  Globe,
  ChevronRight,
  Save
} from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-gray-400">Manage your mission profile and digital twin parameters.</p>
      </div>

      <div className="space-y-4">
        <SettingsGroup title="Mission Profile">
          <SettingsItem icon={User} label="Astronaut Identity" value="Cmdr. Alex Vance" />
          <SettingsItem icon={Globe} label="Mission Assignment" value="Ares-IV (Mars Surface)" />
          <SettingsItem icon={Shield} label="Security Clearance" value="Level 5 (Command)" />
        </SettingsGroup>

        <SettingsGroup title="Digital Twin Configuration">
          <SettingsItem icon={Cpu} label="AI Model Version" value="v4.2.0-stable" />
          <SettingsItem icon={Database} label="Data Retention" value="Mission Duration + 5 Years" />
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white/5 text-neon-blue">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-medium">Real-time Alerts</p>
                <p className="text-xs text-gray-500">Enable haptic and visual warnings</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
            </label>
          </div>
        </SettingsGroup>

        <div className="pt-6 flex justify-end gap-4">
           <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition-colors">
              Reset Data
           </button>
           <button className="px-8 py-3 rounded-xl bg-neon-blue text-space-dark font-black flex items-center gap-2 neon-glow">
              <Save size={18} /> Save Changes
           </button>
        </div>
      </div>
    </div>
  );
}

function SettingsGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</h3>
      </div>
      <div className="divide-y divide-white/10">
        {children}
      </div>
    </div>
  );
}

function SettingsItem({ icon: Icon, label, value }: any) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-neon-blue transition-colors">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-xs text-gray-500">{value}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-600" />
    </div>
  );
}
