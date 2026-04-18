import { supabase } from './supabase';
import { embedText } from './embeddings';

const MOCK_CONTEXT = `
Huzaifa Imran is a full-stack software engineer specializing in Next.js, TypeScript, Python, and Go.
He has built production systems including AI-powered Gmail clones (Nexus Mail), developer scaffolding tools (Claimax), and high-performance dashboards.
His strongest backend skills are Node.js, Go, and Python with expertise in system design and distributed systems.
On the frontend, he excels at React, Next.js, and creating complex HUD-style interfaces with Framer Motion.
He has deep experience with AI engineering, including building RAG pipelines, deploying LLMs from Groq and Gemini, and vector search with Supabase.

Contact him via the contact form on this portfolio or at GitHub: https://github.com/Huzaifa-12Imran
Huzaifa is open to remote work globally.
`;

/**
 * Dynamically fetches live repo data to inject into the chat context.
 * This bypasses RAG for fresh data and ensures accuracy.
 */
export async function getLiveGithubContext(): Promise<string> {
  try {
    const { getGitHubStats, formatRepoForRAG } = await import('./github');
    const username = process.env.GITHUB_USERNAME || 'Huzaifa-12Imran';
    const stats = await getGitHubStats(username);
    
    if (!stats.repositories?.nodes?.length) return "";
    
    const repoContext = stats.repositories.nodes
      .slice(0, 15) // Top 15 latest
      .map(repo => formatRepoForRAG(repo))
      .join('\n\n');
      
    return `### LIVE GITHUB DATA (Real-Time)\n${repoContext}`;
  } catch (err) {
    console.error('[Live Context Error]', err);
    return "";
  }
}


// Simple cosine similarity for vector matching
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    mA += vecA[i] * vecA[i];
    mB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(mA) * Math.sqrt(mB));
}

export async function retrieveContext(query: string, topK = 5): Promise<string> {
  if (!supabase) return MOCK_CONTEXT;

  try {
    const queryEmbedding = await embedText(query);
    
    // Fetch all documents (efficient for small portfolios)
    const { data: allDocs, error } = await supabase
      .from('documents')
      .select('content, embedding');

    if (error || !allDocs?.length) return MOCK_CONTEXT;

    // Perform manual similarity matching
    const matches = allDocs
      .map(doc => ({
        content: doc.content,
        similarity: cosineSimilarity(queryEmbedding, doc.embedding)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .filter(m => m.similarity > 0.3) // Match threshold
      .slice(0, topK);

    if (matches.length === 0) return MOCK_CONTEXT;
    return matches.map(m => m.content).join('\n\n');
  } catch (err) {
    console.error('[RAG Error]', err);
    return MOCK_CONTEXT;
  }
}

export function buildSystemPrompt(context: string): string {
  return `You are Huzaifa Imran's AI portfolio assistant — knowledgeable, concise, and professional.
Answer questions about Huzaifa's skills, projects, experience, and professional history using the context provided.
You have direct access to his GitHub repository logs and technical documentation. Use this data to provide specific project details, tech stacks, and links when asked.
Be direct and specific. Format code examples with markdown backticks when relevant.

CONTEXT:
${context}

If something isn't covered in the context, say: "I don't have that detail handy — reach out via the contact form or check GitHub directly: https://github.com/Huzaifa-12Imran"
Never fabricate information outside the provided context.`;
}
