'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

interface Props {
  languages: LanguageData[];
}

// Kinetic Core Logic: Map importance to colors
const KINETIC_COLORS = [
  '#FF3E3E', // Core Red
  '#FF8C3E', // Solar Orange
  '#FFDB3E', // High Yellow
  '#ea580c', // Deep Orange
  '#991b1b', // Dark Red
];

export default function LanguageBar({ languages }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-10">
      {/* Stacked bar - thermal energy visual */}
      <div className="flex h-2 rounded-full overflow-hidden bg-zinc-950 border border-zinc-900 shadow-inner p-0.5">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            className="h-full rounded-full"
            style={{ 
              backgroundColor: KINETIC_COLORS[i % KINETIC_COLORS.length],
              opacity: 0.8
            }}
            initial={{ width: 0 }}
            animate={{ width: visible ? `${lang.percentage}%` : 0 }}
            transition={{ duration: 1.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
          />
        ))}
      </div>

      {/* Legend - high density grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
        {languages.map((lang, i) => (
          <div key={lang.name} className="flex flex-col gap-2 group cursor-default">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,140,62,0.3)] animate-pulse"
                  style={{ backgroundColor: KINETIC_COLORS[i % KINETIC_COLORS.length] }}
                />
                <span className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                  {lang.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--core-yellow)] opacity-0 group-hover:opacity-100 transition-opacity">SYS_LOAD: {lang.percentage}%</span>
            </div>
            
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
               <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Protocol Optimization</span>
               <span className="text-[10px] font-mono text-zinc-500 group-hover:text-[var(--core-orange)] transition-colors">{lang.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
