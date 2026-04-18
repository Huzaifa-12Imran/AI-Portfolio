import { GitHubStats, Project, BlogPost } from '@/types';

// --- Generate a realistic contribution calendar ---
function generateCalendar(): GitHubStats['contributionsCollection']['contributionCalendar'] {
  const weeks = [];
  const today = new Date();
  for (let w = 52; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - w * 7 - (6 - d));
      const count = Math.random() > 0.35 ? Math.floor(Math.random() * 12) : 0;
      let color = '#161b22';
      if (count > 0) color = '#0e4429';
      if (count > 3) color = '#006d32';
      if (count > 6) color = '#26a641';
      if (count > 9) color = '#39d353';
      days.push({
        contributionCount: count,
        date: date.toISOString().split('T')[0],
        color,
      });
    }
    weeks.push({ contributionDays: days });
  }
  return { totalContributions: 1247, weeks };
}

export const mockGitHubStats: GitHubStats = {
  repositories: {
    nodes: [
      { name: 'portfolio', description: 'Personal portfolio featuring Obsidian Forge design.', url: 'https://github.com/Huzaifa-12Imran/portfolio', pushedAt: '2025-04-10T12:00:00Z', stargazerCount: 48, primaryLanguage: { name: 'TypeScript', color: '#3178c6' } },
      { name: 'ai-chatbot', description: 'RAG-powered AI assistant with pgvector.', url: 'https://github.com/Huzaifa-12Imran/ai-chatbot', pushedAt: '2025-04-09T12:00:00Z', stargazerCount: 213, primaryLanguage: { name: 'Python', color: '#3572A5' } },
      { name: 'ecommerce-app', description: 'Modern e-commerce platform with Stripe.', url: 'https://github.com/Huzaifa-12Imran/ecommerce-app', pushedAt: '2025-04-05T12:00:00Z', stargazerCount: 87, primaryLanguage: { name: 'TypeScript', color: '#3178c6' } },
      { name: 'data-pipeline', description: 'High-throughput ETL processing engine.', url: 'https://github.com/Huzaifa-12Imran/data-pipeline', pushedAt: '2025-03-20T12:00:00Z', stargazerCount: 34, primaryLanguage: { name: 'Python', color: '#3572A5' } },
      { name: 'mobile-app', description: 'Cross-platform productivity application.', url: 'https://github.com/Huzaifa-12Imran/mobile-app', pushedAt: '2025-03-15T12:00:00Z', stargazerCount: 22, primaryLanguage: { name: 'Dart', color: '#00B4AB' } },
      { name: 'cli-tools', description: 'Scaffolding and automation utility suite.', url: 'https://github.com/Huzaifa-12Imran/cli-tools', pushedAt: '2025-04-01T12:00:00Z', stargazerCount: 61, primaryLanguage: { name: 'Go', color: '#00ADD8' } },
      { name: 'react-components', description: 'Accessible Open Source Component Library.', url: 'https://github.com/Huzaifa-12Imran/react-components', pushedAt: '2025-04-08T12:00:00Z', stargazerCount: 129, primaryLanguage: { name: 'TypeScript', color: '#3178c6' } },
      { name: 'api-gateway', description: 'gRPC based microservices gateway.', url: 'https://github.com/Huzaifa-12Imran/api-gateway', pushedAt: '2025-03-25T12:00:00Z', stargazerCount: 55, primaryLanguage: { name: 'Go', color: '#00ADD8' } },
      { name: 'blog-engine', description: 'Static site generator with markdown support.', url: 'https://github.com/Huzaifa-12Imran/blog-engine', pushedAt: '2025-02-15T12:00:00Z', stargazerCount: 18, primaryLanguage: { name: 'JavaScript', color: '#f1e05a' } },
      { name: 'ml-experiments', description: 'Collection of neural network prototypes.', url: 'https://github.com/Huzaifa-12Imran/ml-experiments', pushedAt: '2025-03-10T12:00:00Z', stargazerCount: 76, primaryLanguage: { name: 'Python', color: '#3572A5' } },
    ],
  },
  contributionsCollection: {
    totalCommitContributions: 1247,
    contributionCalendar: generateCalendar(),
  },
  followers: { totalCount: 342 },
};

export const mockProjects: Project[] = [
  {
    slug: 'ai-chatbot',
    title: 'AI Portfolio Assistant',
    description: 'A RAG-powered chatbot trained on personal docs and résumé. Streams answers using Gemini with pgvector retrieval.',
    techStack: ['Next.js', 'TypeScript', 'Gemini AI', 'Supabase', 'pgvector'],
    githubUrl: 'https://github.com/Huzaifa-12Imran/ai-chatbot',
    liveUrl: '#',
    stars: 213,
    lastCommit: '2 days ago',
    status: 'active',
    featured: true,
  },
  {
    slug: 'ecommerce-app',
    title: 'Full-Stack E-Commerce Platform',
    description: 'Production-grade e-commerce app with cart, payments (Stripe), real-time inventory, and admin dashboard.',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Redis'],
    githubUrl: 'https://github.com/Huzaifa-12Imran/ecommerce-app',
    liveUrl: '#',
    stars: 87,
    lastCommit: '1 week ago',
    status: 'active',
    featured: true,
  },
  {
    slug: 'data-pipeline',
    title: 'Real-Time Data Pipeline',
    description: 'Scalable ETL pipeline processing 100K+ events/second using Kafka, Apache Spark, and PostgreSQL.',
    techStack: ['Python', 'Kafka', 'Apache Spark', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/Huzaifa-12Imran/data-pipeline',
    stars: 34,
    lastCommit: '3 weeks ago',
    status: 'active',
    featured: true,
  },
  {
    slug: 'cli-tools',
    title: 'Developer CLI Toolkit',
    description: 'A suite of productivity CLI tools for scaffolding projects, managing environments, and automating deployments.',
    techStack: ['Go', 'Cobra', 'Docker', 'Shell'],
    githubUrl: 'https://github.com/Huzaifa-12Imran/cli-tools',
    stars: 61,
    lastCommit: '1 month ago',
    status: 'active',
    featured: false,
  },
  {
    slug: 'react-components',
    title: 'Open-Source Component Library',
    description: 'Accessible, animated React component library with 40+ components, full TypeScript support, and Storybook docs.',
    techStack: ['React', 'TypeScript', 'Storybook', 'Vitest', 'Radix UI'],
    githubUrl: 'https://github.com/Huzaifa-12Imran/react-components',
    stars: 129,
    lastCommit: '5 days ago',
    status: 'active',
    featured: false,
  },
  {
    slug: 'api-gateway',
    title: 'Microservices API Gateway',
    description: 'High-performance API gateway with rate limiting, JWT auth, request logging, and service discovery.',
    techStack: ['Go', 'gRPC', 'Redis', 'Prometheus', 'Docker'],
    githubUrl: 'https://github.com/Huzaifa-12Imran/api-gateway',
    stars: 55,
    lastCommit: '2 weeks ago',
    status: 'active',
    featured: false,
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    slug: 'building-a-rag-portfolio',
    title: 'Building a RAG-Powered Portfolio with Gemini & pgvector',
    excerpt: 'How I built an AI assistant that answers questions about my projects using retrieval-augmented generation, Supabase pgvector, and Google Gemini.',
    date: '2025-03-15',
    tags: ['AI', 'Next.js', 'Supabase', 'RAG'],
    readingTime: '8 min read',
    viewCount: 2847,
  },
  {
    slug: 'nextjs-performance',
    title: 'Squeezing 99 Lighthouse Scores from Next.js 15',
    excerpt: 'A deep dive into App Router optimizations, image handling, server components, and edge caching strategies that got me to 99/100 Lighthouse.',
    date: '2025-02-28',
    tags: ['Next.js', 'Performance', 'Web Dev'],
    readingTime: '12 min read',
    viewCount: 5123,
  },
  {
    slug: 'd3-contribution-heatmap',
    title: 'Building GitHub-Style Contribution Heatmaps with D3.js',
    excerpt: 'Step-by-step guide to creating animated, interactive contribution calendar heatmaps using D3.js and React.',
    date: '2025-02-10',
    tags: ['D3.js', 'React', 'Data Viz'],
    readingTime: '10 min read',
    viewCount: 3411,
  },
  {
    slug: 'go-microservices',
    title: 'Lessons from Building a Production Go Microservices System',
    excerpt: 'What I learned deploying 12 Go microservices to production: observability, graceful shutdowns, gRPC patterns, and avoiding common pitfalls.',
    date: '2025-01-20',
    tags: ['Go', 'Microservices', 'Backend'],
    readingTime: '15 min read',
    viewCount: 1876,
  },
];
