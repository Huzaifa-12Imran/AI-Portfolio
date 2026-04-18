'use client';

import { motion } from 'framer-motion';
import BlogCard from '@/components/blog/BlogCard';
import { TrendingUp, Hash, Shield, Search } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/types';

interface Props {
  posts: BlogPost[];
  isIntegrated?: boolean;
}

export default function BlogPageClient({ posts, isIntegrated = false }: Props) {
  const trending = [...posts].sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0)).slice(0, 3);

  return (
    <div className={`w-full ${isIntegrated ? '' : 'min-h-screen pt-24 pb-20 px-6 bg-black dot-grid'}`}>
      <div className={`w-full mx-auto ${isIntegrated ? '' : 'max-w-7xl'}`}>
        
        {!isIntegrated && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 border-b border-zinc-900 pb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[var(--core-red)]/20 bg-[var(--core-red)]/5 text-[10px] font-bold text-[var(--core-red)] mb-6 uppercase tracking-widest">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--core-red)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--core-red)]"></span>
              </span>
              {posts.length} entries // integrated feed
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tightest uppercase">
              NEURAL <span className="text-zinc-600">LOGS</span> <span className="text-[var(--core-yellow)]">_</span>
            </h1>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-8 flex flex-col gap-4">
             <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-700 uppercase tracking-[0.3em] mb-4">
                Latest_Transmissions // Feed_Active
             </div>
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {/* Sidebar Telemetry */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Priority Logs */}
            <div className="bento-card border-zinc-900 bg-zinc-950/40 p-8 space-y-8">
              <div className="flex items-center gap-3 text-zinc-500 pb-4 border-b border-zinc-900">
                 <TrendingUp size={16} />
                 <span className="text-[10px] font-mono font-black uppercase tracking-widest">High_Priority_Logs</span>
              </div>
              <div className="space-y-8">
                {trending.map((post, i) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-2">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl font-black text-zinc-900 font-mono group-hover:text-[var(--core-yellow)]/20 transition-colors mt-[-4px]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors leading-tight line-clamp-2 uppercase tracking-tight">
                          {post.title}
                        </h3>
                        <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">{post.viewCount?.toLocaleString()} ACCESSES</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Taxonomy */}
            <div className="bento-card border-zinc-900 bg-zinc-950/40 p-8">
               <div className="flex items-center gap-3 text-zinc-500 mb-8 border-b border-zinc-900 pb-4">
                 <Hash size={16} />
                 <span className="text-[10px] font-mono font-black uppercase tracking-widest">Taxonomy_Matrix</span>
               </div>
               <div className="flex flex-wrap gap-2">
                {Array.from(new Set(posts.flatMap((p) => p.tags))).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-3 py-1.5 rounded-lg bg-black border border-zinc-900 text-zinc-600 hover:text-[var(--core-orange)] hover:border-[var(--core-orange)]/40 transition-all cursor-pointer font-mono uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Assistant Promo */}
            <div className="bento-card bg-[var(--core-red)] border-none p-8 flex flex-col gap-4 text-white group relative overflow-hidden shadow-[0_0_30px_rgba(255,62,62,0.2)]">
               <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110">
                 <Search size={48} />
               </div>
               <div className="relative z-10 flex flex-col gap-6">
                 <div>
                   <h3 className="text-xl font-black tracking-tighter uppercase mb-2">Neural Search</h3>
                   <p className="text-xs text-white/70 leading-relaxed font-bold uppercase tracking-tight">
                     Initialize a neural query to retrieve specific technical modules.
                   </p>
                 </div>
                 <a href="#chat" className="flex items-center justify-center gap-3 text-[11px] font-black bg-white text-black px-6 py-3 rounded-xl hover:bg-zinc-100 transition-all w-full uppercase tracking-widest shadow-xl">
                   UPLINK_CHAT <Shield size={14} />
                 </a>
               </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
