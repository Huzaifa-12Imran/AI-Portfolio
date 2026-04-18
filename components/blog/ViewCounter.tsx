'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function increment() {
      try {
        const res = await fetch(`/api/views/${slug}`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      } catch {
        // Silently fail
      }
    }
    increment();
  }, [slug]);

  if (count === null) return null;

  return (
    <span className="flex items-center gap-1.5 text-zinc-500 text-sm">
      <Eye size={14} />
      {count.toLocaleString()} views
    </span>
  );
}
