'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FolderGit2 } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import type { Project } from '@/types';

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section className="py-24 px-4 border-t border-[rgba(212,175,55,0.1)] bg-transparent">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center justify-center mb-16 gap-4">
          <div>
            <div className="section-accent-bar mb-8 mx-auto" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center gap-2 mb-4 badge-brutalist !bg-[rgba(212,175,55,0.05)] rounded-full backdrop-blur-md"
            >
              <FolderGit2 size={14} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37]">Featured Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-[#A0A0A0] uppercase tracking-[0.1em]"
            >
              Selected<br/>Projects
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 mt-4 rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(20,20,20,0.5)] hover:bg-[rgba(212,175,55,0.05)] transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center justify-center gap-2 text-xs text-[#A0A0A0] hover:text-[#D4AF37] transition-colors font-mono uppercase tracking-[0.2em] px-8 py-4 rounded-full"
            >
              View all projects
              <ArrowRight size={14} className="text-[#D4AF37]" />
            </Link>
          </motion.div>
        </div>

        {/* Rather than a strict 1px grid, use subtle gap with transparent background for elegant layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div className="h-full" key={project.slug}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-center mt-10 sm:hidden"
        >
          <Link
            href="/projects"
            className="inline-flex glass rounded-full overflow-hidden items-center justify-center gap-2 text-xs text-[#A0A0A0] hover:text-[#D4AF37] font-mono uppercase tracking-[0.2em] w-full py-4 border-[rgba(212,175,55,0.2)] bg-[rgba(20,20,20,0.4)]"
          >
            View all projects <ArrowRight size={14} className="text-[#D4AF37] ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
