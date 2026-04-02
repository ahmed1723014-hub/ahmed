import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Rocket, Brain, Activity, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-space-dark overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-soft-purple/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-gradient-to-r from-neon-blue to-soft-purple bg-clip-text text-transparent">
            AI-Powered Cognitive <br /> Digital Twin
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
            Predict cognitive decline before it happens. Advanced monitoring and simulation system for deep space missions.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-neon-blue hover:bg-neon-blue/80 text-space-dark font-bold py-4 px-8 rounded-full transition-all hover:scale-105 neon-glow"
          >
            Open Dashboard <ArrowRight size={20} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 relative"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/10 flex items-center justify-center relative">
             <div className="absolute inset-0 animate-pulse bg-neon-blue/5 rounded-full" />
             <Brain size={120} className="text-neon-blue animate-pulse" />
             <div className="absolute -top-4 -right-4 glass-panel p-4 flex items-center gap-3">
                <div className="w-3 h-3 bg-alert-green rounded-full animate-ping" />
                <span className="text-xs font-orbitron uppercase tracking-widest">System Online</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Activity, title: "Data Collection", desc: "Real-time biometric and performance metrics gathered during mission tasks." },
            { icon: Brain, title: "Personal AI Model", desc: "A unique digital twin that learns your baseline and predicts deviations." },
            { icon: ShieldCheck, title: "Prediction System", desc: "Early warning alerts triggered before cognitive fatigue impacts safety." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-panel p-8 text-center"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="text-neon-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white/5 border-y border-white/10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 tracking-tight">Advanced Mission Support</h2>
            <div className="space-y-6">
              {[
                "Real-time cognitive state monitoring",
                "Personalized performance modeling",
                "Stress-response simulation",
                "Automated fatigue intervention alerts"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neon-blue" />
                  </div>
                  <span className="text-lg text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 h-40 flex flex-col justify-end">
              <span className="text-3xl font-bold text-neon-blue">98%</span>
              <span className="text-xs text-gray-500 uppercase">Prediction Accuracy</span>
            </div>
            <div className="glass-panel p-6 h-40 flex flex-col justify-end translate-y-8">
              <span className="text-3xl font-bold text-soft-purple">24/7</span>
              <span className="text-xs text-gray-500 uppercase">Live Monitoring</span>
            </div>
            <div className="glass-panel p-6 h-40 flex flex-col justify-end">
              <span className="text-3xl font-bold text-alert-green">0ms</span>
              <span className="text-xs text-gray-500 uppercase">Latency</span>
            </div>
            <div className="glass-panel p-6 h-40 flex flex-col justify-end translate-y-8">
              <span className="text-3xl font-bold text-white">∞</span>
              <span className="text-xs text-gray-500 uppercase">Scalability</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
