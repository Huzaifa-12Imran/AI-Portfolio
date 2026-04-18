'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useViewCount(slug: string) {
  const { data, isLoading } = useSWR(`/api/views/${slug}`, fetcher, {
    revalidateOnFocus: false,
  });
  return { count: data?.count as number | undefined, isLoading };
}
