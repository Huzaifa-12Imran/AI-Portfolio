import { getGitHubStats } from '@/lib/github';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || 'Huzaifa-12Imran';
    const stats = await getGitHubStats(username);
    return NextResponse.json(stats, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
  }
}
