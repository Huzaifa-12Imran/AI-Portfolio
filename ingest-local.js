const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load .env.local manually
const env = fs.readFileSync('.env.local', 'utf8');
const getVar = (name) => env.match(new RegExp(name + '=([^\\s]+)'))?.[1]?.replace(/[\"']/g, '');

const supabaseUrl = getVar('SUPABASE_URL');
const supabaseKey = getVar('SUPABASE_SERVICE_KEY');
const geminiKey = getVar('GEMINI_API_KEY');

if (!supabaseUrl || !supabaseKey || !geminiKey) {
  console.error('Missing configuration in .env.local');
  process.exit(1);
}

// Format repo data for RAG ingestion (copied from lib/github.ts to avoid TS dependency)
function formatRepoForRAG(repo) {
  return `GitHub Repository: ${repo.name}
URL: ${repo.url}
Description: ${repo.description || 'No description provided.'}
Primary Language: ${repo.primaryLanguage?.name || 'Unknown'}
Last Updated: ${repo.pushedAt ? new Date(repo.pushedAt).toLocaleDateString() : 'N/A'}
Star Count: ${repo.stargazerCount || 0}
---`;
}

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiKey);
const embedModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });

async function chunkText(text, size = 500) {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(' '));
  }
  return chunks;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function ingest() {
  const username = getVar('GITHUB_USERNAME') || 'Huzaifa-12Imran';
  console.log(`\n--- Starting Neural Hub Brain Ingestion for ${username} ---`);

  // --- GitHub Ingestion Bypassed (Restoration Pending) ---
  console.log('Skipping GitHub API phase...');

  const dirs = ['content/projects', 'content/blog', 'content'];
  let total = 0;

  for (const dir of dirs) {
    const fullDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    console.log(`\nScanning directory: ${dir} (${files.length} files found)`);
    
    for (const file of files) {
      console.log(`  Processing: ${file}...`);
      const text = fs.readFileSync(path.join(fullDir, file), 'utf-8');
      const chunks = await chunkText(text);
      console.log(`    Split into ${chunks.length} segments.`);

      for (let i = 0; i < chunks.length; i++) {
        try {
          process.stdout.write(`    Embedding segment ${i+1}/${chunks.length}... `);
          const result = await embedModel.embedContent(chunks[i]);
          const embedding = result.embedding.values;
          process.stdout.write('DONE. Syncing... ');

          const { error } = await supabase.from('documents').insert({
            content: chunks[i],
            embedding: embedding,
            source: file
          });

          if (error) throw error;
          process.stdout.write('SYNCED.\n');
          total++;
          
          // Throttling to prevent 'fetch failed' errors
          await sleep(250);
        } catch (e) {
          process.stdout.write('FAILED.\n');
          console.error(`    [ERROR] File: ${file}, Segment: ${i+1}:`, e.message);
          if (e.message.includes('fetch failed')) {
            console.log('    [RETRYING] Waiting 2 seconds before retry...');
            await sleep(2000);
            i--; // Retry this segment
          }
        }
      }
    }
  }

  console.log(`\n--- Ingestion Complete! Total Chunks Sync'd: ${total} ---`);
}

ingest();
