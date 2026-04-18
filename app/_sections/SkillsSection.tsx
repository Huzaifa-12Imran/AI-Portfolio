'use client';

import { motion } from 'framer-motion';
import { Cpu, Layers, HardDrive, Database, Globe, Smartphone, Shield, Code } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: "Backend Core",
    icon: Database,
    skills: ["Go", "Python", "PostgreSQL", "Redis", "gRPC", "Microservices"],
    color: "var(--core-red)"
  },
  {
    title: "Intelligence",
    icon: Cpu,
    skills: ["PyTorch", "RAG", "Vector DBs", "LangChain", "Gemini API"],
    color: "var(--core-pink)"
  },
  {
    title: "Frontend",
    icon: Layers,
    skills: ["Next.js", "TypeScript", "Tailwind v4", "D3.js", "Framer Motion"],
    color: "var(--core-orange)"
  },
  {
    title: "Infrastructure",
    icon: Shield,
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Security", "Terraform"],
    color: "var(--core-yellow)"
  }
];

export default function SkillsSection() {
  return (
    <div className="relative w-full py-10">
      {/* Header telemetry */}
      <div className="flex flex-col gap-2 mb-16 px-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-[var(--core-orange)] shadow-[0_0_10px_rgba(255,140,62,0.5)]" />
          <div>
            <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Module_02 // Competency</h2>
            <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Expertise <span className="text-[var(--core-orange)]">Matrix</span></h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILL_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bento-card border-zinc-900 bg-zinc-950/40 relative overflow-hidden group"
          >
            {/* Hover Energy Burst */}
            <div className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: cat.color }} />

            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                    <cat.icon size={20} />
                 </div>
                 <h4 className="text-lg font-bold text-white tracking-tight">{cat.title}</h4>
              </div>
              <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                Status: Operational
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cat.skills.map((skill, si) => (
                <div 
                  key={skill}
                  className="flex flex-col gap-1.5 p-3 rounded-lg bg-black border border-zinc-900 hover:border-zinc-700 transition-all group/skill"
                >
                   <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-zinc-400 group-hover/skill:text-white transition-colors">{skill}</span>
                   </div>
                   <div className="w-full h-0.5 bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 + (si * 0.1) }}
                        className="h-full"
                        style={{ backgroundColor: cat.color, opacity: 0.4 }}
                      />
                   </div>
                </div>
              ))}
            </div>

            {/* Background design dots */}
            <div className="absolute bottom-4 right-4 flex gap-1 opacity-20">
               {[1, 2, 3].map(d => (
                 <div key={d} className="w-1 h-1 rounded-full" style={{ backgroundColor: cat.color }} />
               ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Infrastructure Note */}
      <div className="mt-12 p-6 rounded-2xl border border-zinc-900 border-dashed bg-zinc-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
           <Shield size={16} className="text-[var(--core-red)]" />
           Security Protocol: AES-256-GCM // System Audited 2026.Q1
         </div>
         <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--core-red)] animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Neural Link Synchronized</span>
         </div>
      </div>
    </div>
  );
}
