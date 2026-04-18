import { NextRequest, NextResponse } from 'next/server';
import { embedText, chunkText, upsertDocument } from '@/lib/embeddings';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';

// Protected with a secret key
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.INGEST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 503 });
  }

  const dirs = ['content/projects', 'content/blog', 'content'];
  let total = 0;

  for (const dir of dirs) {
    const fullDir = path.join(process.cwd(), dir);
    try {
      const files = readdirSync(fullDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
      for (const file of files) {
        const text = readFileSync(path.join(fullDir, file), 'utf-8');
        const chunks = await chunkText(text);
        for (const chunk of chunks) {
          const embedding = await embedText(chunk);
          await upsertDocument(chunk, embedding, file);
          total++;
        }
      }
    } catch (e: any) {
      console.error(`[Ingest] Error in dir ${dir}:`, e.message);
    }
  }
  
  // 2. Ingest GitHub Public Repositories
  const username = process.env.GITHUB_USERNAME || 'Huzaifa-12Imran';
  console.log(`[Ingest] Fetching GitHub repos for ${username}...`);
  try {
    const { getGitHubStats, formatRepoForRAG } = await import('@/lib/github');
    const stats = await getGitHubStats(username);
    console.log(`[Ingest] Found ${stats.repositories?.nodes?.length || 0} repos`);
    
    if (stats.repositories?.nodes) {
      for (const repo of stats.repositories.nodes) {
        console.log(`[Ingest] Processing repo: ${repo.name}`);
        const text = formatRepoForRAG(repo);
        const embedding = await embedText(text);
        await upsertDocument(text, embedding, `github:${repo.name}`);
        total++;
      }
    }
  } catch (err: any) {
    console.error('[Ingest] GitHub error:', err.message);
    return NextResponse.json({ success: false, error: err.message, total_so_far: total }, { status: 500 });
  }

  console.log(`[Ingest] Ingestion complete. Total chunks: ${total}`);
  return NextResponse.json({ success: true, chunks: total });
}
