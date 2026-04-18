'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import type { Project } from '@/types';
import { Badge } from '@/components/ui';

const FILTERS = ['All', 'Active', 'TypeScript', 'Python', 'Go'] as const;

interface Props {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: Props) {
  const [filter, setFilter] = useState<string>('All');

  const filtered = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return p.status === 'active';
    return p.techStack.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-zinc-900 pb-8 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
           Displaying {filtered.length} entries // System Scan
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-32 rounded-2xl border border-zinc-900 border-dashed">
          <div className="text-zinc-600 font-mono text-sm uppercase tracking-widest">
            Null Response // No projects matched filter
          </div>
        </div>
      )}
    </>
  );
}
