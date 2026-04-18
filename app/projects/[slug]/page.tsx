import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Star, Clock } from 'lucide-react';
import { GithubIcon } from '@/components/ui/GithubIcon';

import { mockProjects } from '@/lib/mock-data';
import TechStack from '@/components/projects/TechStack';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const statusColors = {
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    wip: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    archived: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 text-sm"
        >
          <ArrowLeft size={15} />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border font-medium ${statusColors[project.status]}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {project.status === 'wip' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            {project.stars !== undefined && (
              <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm">
                <Star size={14} fill="currentColor" />
                {project.stars} stars
              </span>
            )}
            {project.lastCommit && (
              <span className="flex items-center gap-1.5 text-zinc-500 text-sm">
                <Clock size={13} />
                Last commit: {project.lastCommit}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">{project.title}</h1>
          <p className="text-zinc-400 text-xl leading-relaxed mb-8">{project.description}</p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-medium transition-all"
              >
                <GithubIcon size={16} />
                View Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/20 text-violet-300 text-sm font-medium transition-all"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>

          {/* Tech stack */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Tech Stack</h2>
            <TechStack stack={project.techStack} max={20} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-10">
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Want to know more about this project?</h3>
            <p className="text-zinc-400 mb-6 text-sm">My AI assistant has been trained on all my project details.</p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
            >
              Ask the AI →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
