'use client';

import { motion } from 'framer-motion';
import { Star, GitCommit, Users, Code2, Cpu, Globe, Rocket, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/GithubIcon';
import StatsGrid from '@/components/github/StatsGrid';
import ContributionHeatmap from '@/components/github/ContributionHeatmap';
import LanguageBar from '@/components/github/LanguageBar';
import SkillRadar from '@/components/skills/SkillRadar';
import { Button, Card, Badge } from '@/components/ui';
import type { GitHubStats } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  stats: GitHubStats;
  languages: { name: string; percentage: number; color: string }[];
  projects: any[];
}

const SKILL_DATA = [
  { axis: 'Frontend', value: 90 },
  { axis: 'Backend', value: 95 },
  { axis: 'AI / ML', value: 80 },
  { axis: 'DevOps', value: 75 },
  { axis: 'Systems', value: 85 },
];

export default function BentoSection({ stats, languages, projects }: Props) {
  return (
    <section className="py-24 px-6 bg-black dot-grid">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tightest mb-4">Engineering Hub</h2>
          <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">Real-time Telemetry & Systems Overview</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4">
          
          {/* GitHub Pulse Card - 2x1 */}
          <div className="md:col-span-2 row-span-1 bento-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <GithubIcon size={18} className="text-zinc-400" />
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">GitHub Pulse</span>
              </div>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] uppercase tracking-tighter">Live</Badge>
            </div>
            <ContributionHeatmap data={stats.contributionsCollection.contributionCalendar} />
          </div>

          {/* Featured Project Card - 2x2 */}
          <div className="md:col-span-2 md:row-span-2 bento-card group p-0 overflow-hidden">
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">Featured Project</span>
                <Link href="/projects" className="p-2 bg-zinc-800 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={16} />
                </Link>
              </div>
              
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-zinc-800">
                <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                <Image 
                  src={projects[0]?.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"} 
                  alt={projects[0]?.title || "Project"} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{projects[0]?.title || "Velox System"}</h3>
              <p className="text-zinc-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                {projects[0]?.description || "High-performance distributed architecture for real-time data processing and AI integration."}
              </p>
              
              <div className="mt-auto flex flex-wrap gap-2">
                {projects[0]?.tech?.slice(0, 3).map((t: string) => (
                  <span key={t} className="text-[10px] px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 font-mono">{t}</span>
                )) || ['Next.js', 'Go', 'Redis'].map(t => (
                  <span key={t} className="text-[10px] px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Matrix Scan (Radar) - 1x2 */}
          <div className="md:col-span-1 md:row-span-1 bento-card flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={18} className="text-zinc-400" />
              <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">Matrix Scan</span>
            </div>
            <div className="py-2">
              <SkillRadar data={SKILL_DATA} />
            </div>
            <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest mt-4">Full-Stack Proficiency</div>
          </div>

          {/* Language Matrix - 1x1 */}
          <div className="md:col-span-1 md:row-span-1 bento-card">
            <div className="flex items-center gap-2 mb-8">
              <Code2 size={18} className="text-zinc-400" />
              <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">Stack Matrix</span>
            </div>
            <LanguageBar languages={languages.slice(0, 4)} />
          </div>

          {/* GitHub Stats Sub-Grid - Spans 2 cols */}
          <div className="md:col-span-2 bento-card p-4 bg-transparent border-none">
            <StatsGrid 
              totalStars={stats.repositories.nodes.reduce((sum, r) => sum + r.stargazerCount, 0)} 
              totalCommits={stats.contributionsCollection.totalCommitContributions} 
              followers={stats.followers.totalCount} 
              repos={stats.repositories.nodes.length} 
            />
          </div>
          
          {/* Action Card - 2x1 */}
          <div className="md:col-span-2 bento-card bg-blue-600 border-none p-10 flex flex-col justify-center items-center text-center group">
            <Rocket className="text-white mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-bold text-white mb-2">Build Systems Together</h3>
            <p className="text-blue-100 text-sm mb-6 max-w-xs">Ready to engineer high-performance solutions for your next big project.</p>
            <Link href="mailto:sungpog89@gmail.com">
              <Button variant="primary" className="bg-white text-black hover:bg-zinc-100 rounded-full px-8 py-2 text-sm font-bold">
                 Initialize Contact
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
