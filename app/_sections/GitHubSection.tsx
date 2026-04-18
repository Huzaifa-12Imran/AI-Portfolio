'use client';

import { motion } from 'framer-motion';
import { GithubIcon } from '@/components/ui/GithubIcon';
import StatsGrid from '@/components/github/StatsGrid';
import ContributionHeatmap from '@/components/github/ContributionHeatmap';
import LanguageBar from '@/components/github/LanguageBar';
import ProjectCard from '@/components/projects/ProjectCard';
import type { GitHubStats, Project } from '@/types';

interface Props {
  stats: GitHubStats;
  languages: { name: string; percentage: number; color: string }[];
  projects: Project[];
}

export default function GitHubSection({ stats, languages, projects }: Props) {
  const totalStars = stats.repositories.nodes.reduce((sum, r) => sum + r.stargazerCount, 0);
  const totalCommits = stats.contributionsCollection.totalCommitContributions;
  const followers = stats.followers.totalCount;
  const repos = stats.repositories.nodes.length;

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="relative w-full py-10">
      {/* Module Header */}
      <div className="flex flex-col gap-2 mb-16 px-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-[var(--core-red)] shadow-[0_0_10px_rgba(255,62,62,0.5)]" />
          <div>
            <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Module_03 // Deployment_Hub</h2>
            <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Active <span className="text-[var(--core-red)]">Systems</span></h3>
          </div>
        </div>
      </div>

      {/* Stats Readout */}
      <div className="mb-12">
        <StatsGrid totalStars={totalStars} totalCommits={totalCommits} followers={followers} repos={repos} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-20">
        {/* Heatmap module */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-[2] bento-card border-zinc-900 bg-zinc-950/40 p-8 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-8">
            <div className="flex items-center gap-2">
               <GithubIcon size={14} className="text-[var(--core-red)]" />
               <h4 className="text-[10px] font-mono text-white uppercase tracking-widest">Global_Pulse // v4.2</h4>
            </div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase">Latency: 0.12ms</div>
          </div>
          <ContributionHeatmap data={stats.contributionsCollection.contributionCalendar} />
        </motion.div>

        {/* Language Module */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 bento-card border-zinc-900 bg-zinc-950/40 p-8 relative overflow-hidden"
        >
          <div className="border-b border-zinc-900 pb-4 mb-8">
            <h4 className="text-[10px] font-mono text-white uppercase tracking-widest">Protocol_Stack</h4>
          </div>
          <LanguageBar languages={languages} />
        </motion.div>
      </div>

      {/* Featured Projects Grid */}
      <div className="space-y-8">
         <div className="flex items-center justify-between border-b border-zinc-900/50 pb-4">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-[var(--core-orange)] shadow-[0_0_10px_rgba(255,140,62,0.5)]" />
               <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]">Critical_Deployments</h4>
            </div>
            <span className="text-[10px] font-mono text-zinc-700 uppercase">{featuredProjects.length} Modules Loaded</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
               <ProjectCard key={project.slug} project={project} index={i} />
            ))}
         </div>
      </div>

      {/* Data Visualization Design Accent */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-zinc-950 rounded-full opacity-10 pointer-events-none" />
    </div>
  );
}
