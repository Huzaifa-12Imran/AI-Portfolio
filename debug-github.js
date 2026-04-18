const GITHUB_API = 'https://api.github.com/graphql';
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

async function testGitHub() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'Huzaifa-12Imran';
  
  if (!token) {
    console.error('No GITHUB_TOKEN found');
    return;
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        repositories(first: 20, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes { name description url }
        }
      }
    }
  `;

  try {
    const res = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    const json = await res.json();
    if (json.errors) {
      console.error('GitHub Errors:', json.errors);
    } else {
      console.log('Repos found:', json.data.user.repositories.nodes.map(n => n.name));
    }
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

testGitHub();
