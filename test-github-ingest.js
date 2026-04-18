const { getGitHubStats, formatRepoForRAG } = require('./lib/github');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load .env.local
const envPath = path.join(__dirname, '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

async function test() {
  try {
    const username = process.env.GITHUB_USERNAME || 'Huzaifa-12Imran';
    console.log(`Testing GitHub fetch for ${username}...`);
    const stats = await getGitHubStats(username);
    console.log('Stats fetched:', stats.repositories?.nodes?.length, 'repos');
    if (stats.repositories?.nodes?.length > 0) {
      console.log('First repo:', stats.repositories.nodes[0].name);
      const text = formatRepoForRAG(stats.repositories.nodes[0]);
      console.log('Formatted text sample:\n', text);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
