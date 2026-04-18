'use client';

import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Cpu, CpuIcon, Activity, Terminal } from 'lucide-react';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';

const SUGGESTED_PROMPTS = [
  "What's your strongest backend skill?",
  'Tell me about your AI projects',
  'What tech stack do you use?',
  'System design philosophy?',
];

interface Props {
  isIntegrated?: boolean;
}

export default function ChatPageClient({ isIntegrated = false }: Props) {
  const { messages, loading, sendMessage, clearMessages } = useChat();

  return (
    <div className={`w-full flex flex-col ${isIntegrated ? '' : 'min-h-screen pt-20 bg-[#050505] dot-grid px-6'}`}>
      <div className={`w-full mx-auto flex flex-col flex-1 ${isIntegrated ? '' : 'max-w-4xl pb-10'}`}>
        
        {/* Header Telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-8 border-b border-zinc-900 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center text-[var(--core-pink)] shadow-[0_0_20px_rgba(255,62,158,0.2)] group hover:scale-110 transition-transform">
                <Cpu size={24} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white tracking-tight">NEURAL_HUB <span className="text-[var(--core-pink)] text-[10px] font-mono ml-2 uppercase opacity-50 tracking-[0.2em]">[ CORE_v4.2 ]</span></h1>
                <div className="flex items-center gap-2 text-[9px] text-zinc-600 font-mono uppercase tracking-widest mt-1">
                  <Activity size={10} className="text-[var(--core-red)] animate-pulse" />
                  Cluster: Verified // Logic: Active
                </div>
              </div>
            </div>
            
            <button
              onClick={clearMessages}
              className="flex items-center gap-2 text-[9px] text-zinc-600 hover:text-[var(--core-pink)] transition-all px-3 py-1.5 rounded-lg border border-zinc-900 bg-zinc-950 font-mono uppercase tracking-widest hover:border-zinc-800"
            >
              <RotateCcw size={10} />
              Clear_Buf
            </button>
          </div>
        </motion.div>

        {/* Chat window - Thermal Core */}
        <div className="flex-1 bento-card border-zinc-900 bg-zinc-950/40 p-0 flex flex-col overflow-hidden relative min-h-[500px]">
          
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--core-pink)] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pb-8"
              >
                <div className="text-[9px] text-zinc-700 font-mono uppercase tracking-[0.3em] mb-4">Neural_Sequence // Initialization</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      disabled={loading}
                      className="text-left text-[11px] px-5 py-3 rounded-xl bg-black border border-zinc-900 text-zinc-500 hover:text-white hover:border-[var(--core-pink)] hover:bg-[var(--core-pink)]/5 transition-all group/p"
                    >
                      <span className="text-[var(--core-pink)] opacity-40 group-hover:opacity-100 transition-opacity mr-2">{'>'}</span>
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            
            <MessageList messages={messages} loading={loading} />
          </div>

          <div className="border-t border-zinc-900 bg-black/40 backdrop-blur-xl p-4">
            <ChatInput onSend={sendMessage} loading={loading} />
          </div>
        </div>

        {/* HUD Stats */}
        <div className="flex items-center justify-between mt-6 px-2 opacity-50">
            <div className="flex items-center gap-4 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
               <span className="flex items-center gap-1"><Terminal size={10} /> E2E_CRYPTO</span>
               <span className="flex items-center gap-1"><Sparkles size={10} /> RAG_RECOVERY_01</span>
            </div>
            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Latency: 18ms</span>
        </div>
      </div>
    </div>
  );
}
