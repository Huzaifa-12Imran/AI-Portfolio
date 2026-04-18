'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowRight, Hash, Shield } from 'lucide-react';
import type { BlogPost } from '@/types';

interface Props {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block mb-4">
        <article className="bento-card border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900 transition-all p-6 relative overflow-hidden group/card">
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thermal Indicator */}
            <div className="flex flex-col items-center justify-between py-1 px-2 rounded-lg bg-black border border-zinc-900 min-w-[60px] group-hover/card:border-[var(--core-yellow)] transition-colors">
               <div className="text-[10px] font-black text-white">{new Date(post.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</div>
               <div className="text-2xl font-black text-[var(--core-yellow)]">{new Date(post.date).getDate()}</div>
               <div className="text-[8px] font-mono text-zinc-700">ST_OK</div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              {/* Telemetry metadata */}
              <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                 <div className="flex items-center gap-1">
                    <Shield size={10} className="text-[var(--core-red)]" />
                    Verified_Audit
                 </div>
                 <div className="flex items-center gap-1 group-hover/card:text-[var(--core-yellow)] transition-colors">
                    <Clock size={10} />
                    {post.readingTime}
                 </div>
              </div>

              {/* Title & Excerpt */}
              <h2 className="text-xl font-bold text-white tracking-tight group-hover/card:text-[var(--core-yellow)] transition-colors line-clamp-1">
                {post.title}
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed line-clamp-2 max-w-3xl font-medium">
                {post.excerpt}
              </p>

              {/* Tags Matrix */}
              <div className="flex flex-wrap gap-4 mt-2">
                 {post.tags.slice(0, 3).map(tag => (
                   <div key={tag} className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover/card:text-zinc-400 transition-colors">
                      <span className="text-[var(--core-orange)] opacity-50 font-black">#</span>
                      {tag}
                   </div>
                 ))}
              </div>
            </div>

            {/* Action readout */}
            <div className="hidden lg:flex items-center gap-4 text-zinc-800 group-hover/card:text-[var(--core-yellow)] transition-all">
               <div className="flex flex-col items-end">
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] font-bold">Access Log</span>
                  <span className="text-[10px] font-mono">0x2F4A</span>
               </div>
               <ArrowRight size={20} className="group-hover/card:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Kinetic Glow effect */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[var(--core-yellow)] opacity-0 group-hover/card:opacity-[0.03] blur-3xl transition-opacity pointer-events-none" />
        </article>
      </Link>
    </motion.div>
  );
}
