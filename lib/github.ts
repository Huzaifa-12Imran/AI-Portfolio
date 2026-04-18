import { redis } from './redis';
import { mockGitHubStats } from './mock-data';
import type { GitHubStats } from '@/types';

const GITHUB_API = 'https://api.github.com/graphql';
const CACHE_TTL = 60 * 60; // 1 hour

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  if (!process.env.GITHUB_TOKEN) {
    console.log('[GitHub] No token — using mock data');
    return mockGitHubStats;
  }

  const cacheKey = `github:stats:v4:${username}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return typeof cached === 'string' ? JSON.parse(cached) : (cached as GitHubStats);
    }

    const query = `
      query($login: String!) {
        user(login: $login) {
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
            nodes { name stargazerCount primaryLanguage { name color } description url pushedAt }
          }
          contributionsCollection {
            totalCommitContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays { contributionCount date color }
              }
            }
          }
          followers { totalCount }
        }
      }
    `;

    const res = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    const json = await res.json();
    if (json.errors || !json.data?.user) {
      console.error('[GitHub] API error:', json.errors);
      return mockGitHubStats;
    }

    const data: GitHubStats = json.data.user;
    await redis.set(cacheKey, JSON.stringify(data), { ex: CACHE_TTL });
    return data;
  } catch (err) {
    console.error('[GitHub] Fetch failed:', err);
    return mockGitHubStats;
  }
}

// Compute language distribution from repos
export function getLanguageBreakdown(stats: GitHubStats) {
  const langMap: Record<string, { count: number; color: string }> = {};
  for (const repo of stats.repositories.nodes) {
    if (repo.primaryLanguage) {
      const { name, color } = repo.primaryLanguage;
      if (!langMap[name]) langMap[name] = { count: 0, color };
      langMap[name].count += 1;
    }
  }
  const total = Object.values(langMap).reduce((a, b) => a + b.count, 0);
  return Object.entries(langMap)
    .map(([name, { count, color }]) => ({
      name,
      percentage: Math.round((count / total) * 100),
      color,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 8);
}

// Format repo data for RAG ingestion
export function formatRepoForRAG(repo: any): string {
  return `GitHub Repository: ${repo.name}
URL: ${repo.url}
Description: ${repo.description || 'No description provided.'}
Primary Language: ${repo.primaryLanguage?.name || 'Unknown'}
Last Updated: ${repo.pushedAt ? new Date(repo.pushedAt).toLocaleDateString() : 'N/A'}
Star Count: ${repo.stargazerCount || 0}
---`;
}
