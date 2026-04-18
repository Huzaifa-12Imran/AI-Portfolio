'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitCommit, Users, GitFork, Activity } from 'lucide-react';

interface Props {
  totalStars: number;
  totalCommits: number;
  followers: number;
  repos: number;
}

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1500;
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(step);
        else setDisplay(value);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return <span>{display.toLocaleString()}</span>;
}

export default function StatsGrid({ totalStars, totalCommits, followers, repos }: Props) {
  const stats = [
    { label: 'Network Points', value: totalStars, icon: Star, color: 'var(--core-yellow)' },
    { label: 'Commits', value: totalCommits, icon: GitCommit, color: 'var(--core-red)' },
    { label: 'Peers', value: followers, icon: Users, color: 'var(--core-pink)' },
    { label: 'Repositories', value: repos, icon: GitFork, color: 'var(--core-orange)' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden bento-card border-zinc-900 bg-zinc-950/80 p-6 hover:bg-zinc-900 transition-all cursor-default"
          >
            {/* Header Telemetry */}
            <div className="flex items-center justify-between mb-6">
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                <Icon size={16} />
              </div>
              <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{stat.label}</div>
            </div>

            {/* Value */}
            <div className="flex flex-col gap-1">
               <div className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
                 <AnimatedNumber value={stat.value} delay={i * 100} />
                 <Activity size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: stat.color }} />
               </div>
               <div className="w-full h-1 bg-zinc-900 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.5 + (i * 0.2) }}
                    className="h-full"
                    style={{ backgroundColor: stat.color, opacity: 0.3 }}
                  />
               </div>
            </div>
            
            {/* Background design accents */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: stat.color }} />
          </motion.div>
        );
      })}
    </div>
  );
}
