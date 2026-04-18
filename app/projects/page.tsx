import type { Metadata } from 'next';
import { getGitHubStats } from '@/lib/github';
import ProjectsGrid from './_ProjectsGrid';
import { Project, GitHubRepo } from '@/types';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Full-stack projects by Huzaifa Imran — AI systems, Gmail clones, authentication systems, and modern web applications.',
};

function mapRepoToProject(repo: GitHubRepo): Project {
  return {
    slug: repo.name.toLowerCase(),
    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
    description: repo.description || 'View the source code on GitHub for more details.',
    techStack: repo.primaryLanguage ? [repo.primaryLanguage.name] : ['JavaScript'],
    githubUrl: repo.url,
    stars: repo.stargazerCount,
    lastCommit: new Date(repo.pushedAt).toLocaleDateString(),
    status: 'active',
    featured: repo.stargazerCount > 10,
  };
}

export default async function ProjectsPage() {
  const username = process.env.GITHUB_USERNAME || 'Huzaifa-12Imran';
  const stats = await getGitHubStats(username);
  const liveProjects = stats.repositories.nodes.map(mapRepoToProject);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gold/20 bg-gold/5 text-sm text-gold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {liveProjects.length} active repositories
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Project History
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            A live-synced collection of production systems, developer tools, and experimental prototypes directly from GitHub.
          </p>
        </div>

        <ProjectsGrid projects={liveProjects} />
      </div>
    </div>
  );
}
