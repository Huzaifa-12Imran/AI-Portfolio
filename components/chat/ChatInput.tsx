'use client';

import { useState } from 'react';
import { Send, Terminal, Loader2, Sparkles, Activity } from 'lucide-react';
import { Button } from '@/components/ui';

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
      <div className="flex items-center gap-3 px-3 mb-1">
         <div className="flex items-center gap-1.5 text-[8px] font-mono text-zinc-700 uppercase tracking-widest font-bold">
            <Terminal size={10} />
            Input_Terminal
         </div>
      </div>
      
      <div className="relative group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER_COMMAND_PROMPT..."
          disabled={loading}
          className="w-full bg-black border-[2px] border-zinc-900 rounded-2xl py-4 pl-12 pr-16 text-sm text-[var(--core-pink)] placeholder:text-zinc-800 focus:outline-none focus:border-[var(--core-pink)]/40 hover:border-zinc-800 transition-all font-mono selection:bg-[var(--core-pink)] selection:text-black uppercase tracking-tight"
        />
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-hover:text-[var(--core-pink)] transition-colors">
          <Terminal size={18} />
        </div>

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {input.length > 0 && !loading && (
             <div className="hidden md:flex flex-col items-end mr-3 opacity-30 select-none pointer-events-none">
                <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">Buffer_Size</span>
                <span className="text-[9px] font-mono text-zinc-500">{input.length}b</span>
             </div>
          )}

          <Button 
            type="submit" 
            disabled={!input.trim() || loading}
            size="sm"
            className="rounded-xl h-10 w-10 p-0 bg-zinc-900 hover:bg-[var(--core-pink)] text-white border border-zinc-800 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-[0_0_15px_rgba(255,62,158,0.2)] group/btn"
          >
            {loading ? (
              <Loader2 className="animate-spin text-[var(--core-pink)]" size={18} />
            ) : (
              <Send size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-3">
         <div className="flex items-center gap-4">
            <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">Sys_Status: Nominee</span>
            <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">Enc_Auth: {loading ? 'UPDATING...' : 'SYNCED'}</span>
         </div>
         {loading && (
           <div className="flex items-center gap-1 text-[8px] font-mono text-[var(--core-pink)] animate-pulse uppercase tracking-[0.2em] font-bold">
              <Activity size={10} />
              Neural_Burst_Active
           </div>
         )}
      </div>
    </form>
  );
}
