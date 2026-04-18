import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { mockBlogPosts } from '@/lib/mock-data';
import ViewCounter from '@/components/blog/ViewCounter';

interface Props {
  params: Promise<{ slug: string }>;
}

// Full MDX content per slug (mock)
const BLOG_CONTENT: Record<string, string> = {
  'building-a-rag-portfolio': `
## The Problem with Static Portfolios

Most developer portfolios are graveyards — a list of projects, a headshot, and a "contact me" button. They don't prove anything dynamically.

I wanted mine to *respond* — to answer questions about my work, to show live activity, and to demonstrate AI engineering skills in a way that can't be faked.

## The Architecture

The system has three layers:

\`\`\`
Client (Next.js App Router)
  └── /api/github  → GraphQL + Redis cache
  └── /api/chat    → Gemini streaming + pgvector RAG
  └── /api/views   → Supabase view counters
\`\`\`

## Building the RAG Pipeline

The RAG pipeline works in two phases: **ingestion** and **retrieval**.

### Ingestion
1. Read all MDX files from \`/content\`
2. Chunk each file into ~500-word segments
3. Embed each chunk using Gemini \`text-embedding-004\`
4. Store vectors in Supabase pgvector

### Retrieval
1. Embed the user's question
2. Run a cosine similarity search against stored chunks
3. Inject top-K chunks as context into the Gemini prompt
4. Stream the response back to the client

## The Result

Visitors can now ask questions like *"What's your strongest backend skill?"* and get accurate, context-grounded answers — not hallucinations.

The AI stays in scope. If you ask about something not in my docs, it says so.

## Key Lessons

- **pgvector + Supabase** is the easiest path to production RAG — one SQL function handles everything
- **Gemini 2.0 Flash** is fast and cheap enough for a portfolio (streaming latency is under 500ms)
- **Mock fallbacks everywhere** — the portfolio looks great even without API keys configured
`,
  'nextjs-performance': `
## Why Performance Matters

A slow portfolio is worse than no portfolio. Every 100ms of delay costs conversions — and in this case, costs the impression that you care about quality.

## The Audit Starting Point

Fresh Next.js 15 App Router project with Tailwind landed at:
- Performance: 78
- LCP: 4.2s
- CLS: 0.12
- FCP: 1.8s

Here's how I got to **99** without sacrificing design.

## 1. Server Components First

The rule: **render on the server unless you need client interactivity**.

Move all data fetching, static content, and layout into Server Components. Only mark components \`'use client'\` when they need \`useState\`, \`useEffect\`, or browser APIs.

\`\`\`tsx
// ❌ Before — fetching on the client
'use client';
const [stats, setStats] = useState(null);
useEffect(() => fetch('/api/github').then(...), []);

// ✅ After — server component
export default async function Page() {
  const stats = await getGitHubStats('Huzaifa-12Imran');
  return <StatsGrid stats={stats} />;
}
\`\`\`

## 2. next/image for Everything

Replace every \`<img>\` with \`<Image>\` from \`next/image\`. It handles:
- WebP conversion
- Lazy loading
- Correct \`width\`/\`height\` to prevent CLS

## 3. Font Optimization

Use \`next/font/google\` instead of a CSS \`@import\`. This eliminates the render-blocking Google Fonts request.

## Final Score

After all optimizations: **99 Performance, 100 Accessibility, 100 Best Practices, 100 SEO**.
`,
  'd3-contribution-heatmap': `
## Why Build Your Own?

GitHub's contribution graph is iconic. Building one yourself with D3.js proves frontend data visualization skills better than any list of buzzwords.

## Setting Up the SVG

\`\`\`tsx
const cellSize = 12;
const cellGap = 3;
const step = cellSize + cellGap;
const width = weeks.length * step + 40;
const height = 7 * step + 30;

svg.attr('viewBox', \`0 0 \${width} \${height}\`);
\`\`\`

## Rendering the Cells

\`\`\`tsx
weeks.forEach((week, wi) => {
  week.contributionDays.forEach((day, di) => {
    weeksGroup.append('rect')
      .attr('x', wi * step)
      .attr('y', di * step)
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('rx', 2)
      .attr('fill', day.color);
  });
});
\`\`\`

## The Animation

The trick is staggering the opacity transition by cell index:

\`\`\`tsx
rect.transition()
  .delay((wi * 7 + di) * 3)  // 3ms per cell
  .duration(400)
  .style('opacity', 1);
\`\`\`

This creates a wave-like reveal that makes the chart feel alive.

## Color Scale

GitHub uses five shades. Match them exactly:
- \`#161b22\` — no contributions
- \`#0e4429\` — 1–3
- \`#006d32\` — 4–6
- \`#26a641\` — 7–9
- \`#39d353\` — 10+
`,
  'go-microservices': `
## The Initial Architecture

We started with 3 services talking via REST. By month 3, we had 12 services and latency was becoming a problem.

## Switching to gRPC

gRPC over HTTP/2 reduced inter-service latency by ~60% compared to REST over HTTP/1.1:

\`\`\`proto
service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc ListUsers(ListUsersRequest) returns (stream User);
}
\`\`\`

## Graceful Shutdowns

This one burned us in production. Without graceful shutdown, in-flight requests get dropped during deployments.

\`\`\`go
quit := make(chan os.Signal, 1)
signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
<-quit

ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()
server.GracefulStop()
\`\`\`

## Observability

Every service exports Prometheus metrics. We monitor:
- Request rate (RPS)
- Error rate (4xx, 5xx)
- P99 latency per endpoint
- Goroutine count (memory leaks)

## Key Takeaways

1. **gRPC > REST** for internal service communication — always
2. **Graceful shutdown is non-negotiable** in Kubernetes
3. **Centralized logging** (structured JSON to stdout) beats per-service log files
4. **Start with tracing early** — adding OpenTelemetry later is painful
`,
};

export async function generateStaticParams() {
  return mockBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = BLOG_CONTENT[slug] || post.excerpt;

  // Simple markdown-to-HTML converter for static rendering
  const htmlContent = content
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code class="bg-violet-500/10 text-violet-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-zinc-900/80 border border-white/[0.06] rounded-xl p-5 overflow-x-auto my-5 text-sm font-mono text-zinc-300 leading-relaxed"><code>$2</code></pre>')
    .replace(/^- (.+)$/gm, '<li class="text-zinc-400 mb-1.5">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-zinc-400 mb-1.5"><span class="text-zinc-500">$1.</span> $2</li>')
    .replace(/\n\n/g, '</p><p class="text-zinc-400 leading-relaxed mb-4">')
    .replace(/^(?!<[hpluio])/gm, '');

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 text-sm"
        >
          <ArrowLeft size={15} />
          Back to Blog
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-violet-500/20 text-violet-400 bg-violet-500/5">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 pb-8 mb-10 border-b border-white/[0.06]">
          <span className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Calendar size={13} />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Clock size={13} />
            {post.readingTime}
          </span>
          <ViewCounter slug={post.slug} />
        </div>

        {/* Content */}
        <article className="prose-dark space-y-2">
          <p className="text-zinc-400 leading-relaxed mb-4 text-lg">{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>

        {/* Footer CTA */}
        <div className="mt-16 glass rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-3">Enjoyed this post?</h2>
          <p className="text-zinc-400 text-sm mb-5">Ask the AI for more deep dives or related topics.</p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            Chat with AI →
          </Link>
        </div>
      </div>
    </div>
  );
}
