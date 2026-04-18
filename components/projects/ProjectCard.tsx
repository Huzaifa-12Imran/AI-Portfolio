'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Clock, ArrowUpRight, Shield } from 'lucide-react';
import { GithubIcon } from '@/components/ui/GithubIcon';

import type { Project } from '@/types';

const statusColors = {
  active: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  wip: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  archived: { bg: 'bg-zinc-500/10', text: 'text-zinc-500', border: 'border-zinc-500/20' },
};

interface Props {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const status = statusColors[project.status] || statusColors.archived;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col h-full rounded-2xl border border-zinc-900 bg-zinc-950 p-6 transition-all hover:bg-zinc-900/50 hover:border-zinc-700 overflow-hidden"
    >
      {/* Background Blueprint Grid - faint */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      {/* Header telemetry */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.text}`} style={{ backgroundColor: 'currentColor' }} />
            <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] ${status.text}`}>
              {project.status === 'wip' ? 'In_Progress' : project.status} // st_active
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[var(--core-orange)] transition-colors">
            {project.title}
          </h3>
        </div>
        {project.stars !== undefined && (
          <div className="flex items-center gap-1.5 text-zinc-600 font-mono text-[10px] group-hover:text-[var(--core-yellow)] transition-colors">
            <Star size={12} />
            <span>{project.stars}</span>
          </div>
        )}
      </div>

      <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-3 relative z-10">
        {project.description}
      </p>

      {/* Tech Stack Callouts */}
      <div className="flex flex-wrap gap-2 mb-10 mt-auto relative z-10">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="text-[9px] px-2 py-1 bg-black border border-zinc-900 rounded text-zinc-500 font-mono uppercase tracking-widest">
            {tech}
          </span>
        ))}
      </div>

      {/* Terminal Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50 relative z-10">
        <div className="flex items-center gap-2 text-zinc-700 font-mono text-[9px] uppercase tracking-widest">
           <Clock size={11} />
           <span>Sync_{project.lastCommit || 'Latest'}</span>
        </div>
        
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-white transition-colors"
              title="View Repository"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded bg-[var(--core-red)] text-white hover:bg-[var(--core-pink)] transition-all hover:scale-110 shadow-[0_0_15px_rgba(255,62,62,0.3)]"
              title="Initialize Module"
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Hover Kinetic Underlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--core-orange)] to-transparent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity pointer-events-none" />
    </motion.div>
  );
}
