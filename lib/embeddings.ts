import { supabaseAdmin } from './supabase';

const hasGemini = !!process.env.GEMINI_API_KEY;

// Chunk text into ~500-word pieces
export async function chunkText(text: string, size = 500): Promise<string[]> {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(' '));
  }
  return chunks;
}

// Embed a single piece of text using Gemini gemini-embedding-001
export async function embedText(text: string): Promise<number[]> {
  if (!hasGemini) throw new Error('GEMINI_API_KEY not set');

  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// Upsert a chunk + embedding into Supabase documents table
export async function upsertDocument(content: string, embedding: number[], source: string) {
  if (!supabaseAdmin) throw new Error('Supabase Admin not configured');
  const { error } = await supabaseAdmin.from('documents').insert({ content, embedding, source });
  if (error) throw error;
}
