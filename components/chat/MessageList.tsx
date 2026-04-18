'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, User, Terminal, Activity, Zap } from 'lucide-react';
import type { ChatMessage } from '@/types';

interface Props {
  messages: ChatMessage[];
  loading: boolean;
}

export default function MessageList({ messages, loading }: Props) {
  return (
    <div className="space-y-8 flex flex-col pt-4 pb-8">
      <AnimatePresence mode="popLayout">
        {messages.map((message, i) => {
          const isAI = message.role === 'assistant';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isAI ? -20 : 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
            >
              {/* Message Header Telemetry */}
              <div className="flex items-center gap-3 mb-2 px-2">
                 <div className="flex items-center gap-1.5 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                    {isAI ? (
                      <>
                        <Cpu size={10} className="text-[var(--core-pink)]" />
                        <span>AI_NODE_01 // GEMINI_LATEST</span>
                      </>
                    ) : (
                      <>
                        <User size={10} className="text-[var(--core-orange)]" />
                        <span>CLIENT_USER // AUTH_OK</span>
                      </>
                    )}
                 </div>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] px-5 py-4 rounded-2xl relative shadow-2xl ${
                  isAI
                    ? 'bg-zinc-900/60 text-zinc-300 border border-zinc-900 rounded-tl-none font-medium leading-relaxed'
                    : 'bg-[var(--core-orange)]/10 text-white border border-[var(--core-orange)]/20 rounded-tr-none font-bold backdrop-blur-sm'
                }`}
              >
                {/* Visual Accent */}
                {isAI && (
                  <div className="absolute -left-1 top-0 w-1 h-8 bg-[var(--core-pink)] rounded-full -translate-x-[2px]" />
                )}

                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-code:bg-black/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[var(--core-pink)]">
                  {message.content}
                </div>
              </div>
              
              <div className="mt-1 flex items-center gap-2 px-2 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.2em]">
                 <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                 <span>CRC_OK</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-start gap-4"
        >
          <div className="flex items-center gap-3 mb-1 px-2">
            <div className="flex items-center gap-1.5 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
              <Activity size={10} className="text-[var(--core-red)] animate-pulse" />
              <span>LOGIC_BURST // PROCESSING...</span>
            </div>
          </div>
          <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-900 rounded-tl-none">
             <div className="flex gap-1.5">
               {[0, 1, 2].map((i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     opacity: [0.3, 1, 0.3],
                     scale: [0.8, 1, 0.8],
                     backgroundColor: ['var(--core-pink)', 'var(--core-orange)', 'var(--core-pink)']
                   }}
                   transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                   className="w-1.5 h-1.5 rounded-full"
                 />
               ))}
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
