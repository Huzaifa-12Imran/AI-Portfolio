'use client';

import useSWR from 'swr';
import type { GitHubStats } from '@/types';
import { mockGitHubStats } from '@/lib/mock-data';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useGitHubStats() {
  const { data, error, isLoading } = useSWR<GitHubStats>('/api/github', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 3600000, // 1 hour
    fallbackData: mockGitHubStats,
  });

  return {
    stats: data ?? mockGitHubStats,
    isLoading,
    isError: !!error,
  };
}
