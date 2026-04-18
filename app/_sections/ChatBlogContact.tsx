'use client';

import { useState, useEffect, useRef } from 'react';

const SUGGESTIONS = [
  "WHAT'S YOUR STRONGEST BACKEND SKILL?",
  "TELL ME ABOUT YOUR AI PROJECTS",
  "WHAT TECH STACK DO YOU PREFER?",
  "ARE YOU OPEN TO REMOTE WORK?",
];

export default function ChatBlogContact() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'assistant', text: "Hello. I'm an AI trained on Huzaifa's background. Ask me anything about his technical experience or availability." },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const next = [...messages, { role: 'user', text }];
    setMessages(next);
    setInput('');
    setTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.text })) }),
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');
      setTyping(false);
      setMessages(p => [...p, { role: 'assistant', text: '' }]);
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages(p => {
          const updated = [...p];
          updated[updated.length - 1] = { ...updated[updated.length - 1], text: updated[updated.length - 1].text + chunk };
          return updated;
        });
      }
    } catch {
      setTyping(false);
      setMessages(p => [...p, { role: 'assistant', text: "I'm having trouble connecting right now. Please try again or reach out directly via email." }]);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative dot-grid" 
      style={{ background: 'var(--cream)', borderTop: '1px solid var(--rule)', paddingBottom: '100px' }}
    >
      <div className="max-w-screen-xl mx-auto px-8 lg:px-14 py-24 relative z-10">
        
        {/* Contact Header */}
        <div className="mb-20 reveal">
          <p className="section-label mb-6">04 — CONTACT</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(52px, 11vw, 150px)', color: 'var(--ink)', lineHeight: 0.88, margin: 0, letterSpacing: '0.01em' }}>
            LET'S BUILD<br />
            <span className="text-outline">SOMETHING</span><br />
            REAL.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mt-12">
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Direct Email</span>
              <a href="mailto:sungpog89@gmail.com" className="nav-link" style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 600 }}>sungpog89@gmail.com</a>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Socials</span>
              <div className="flex gap-6">
                <a href="https://github.com/Huzaifa-12Imran" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 600 }}>GITHUB</a>
                <a href="#" className="nav-link" style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 600 }}>LINKEDIN</a>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Component — Elegant & Minimal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start reveal">
          
          <div className="lg:col-span-8">
            <div 
              style={{ 
                background: 'rgba(255,255,255,0.4)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--rule-2)',
                borderRadius: '4px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(18,16,8,0.03)'
              }}
            >
              {/* Chat Header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule)' }}>
                 <div className="flex items-center gap-3">
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }} />
                   <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ink)' }}>AI Assistant — Active</span>
                 </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      style={{ 
                        maxWidth: '85%',
                        padding: '16px 20px',
                        background: m.role === 'user' ? 'var(--gold)' : 'var(--cream-2)',
                        color: m.role === 'user' ? '#fff' : 'var(--ink)',
                        borderRadius: '2px',
                        fontFamily: m.role === 'user' ? 'var(--mono)' : 'var(--sans)',
                        fontSize: '14px',
                        lineHeight: 1.6,
                        boxShadow: '0 4px 12px rgba(18,16,8,0.02)'
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div style={{ padding: '16px 20px', background: 'var(--cream-2)', borderRadius: '2px' }}>
                      <div className="flex gap-1">
                        {[0, 0.2, 0.4].map(d => (
                          <div key={d} className="w-1.5 h-1.5 rounded-full bg-gold opacity-40 animate-pulse" style={{ animationDelay: `${d}s`, background: 'var(--gold)' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4" style={{ borderTop: '1px solid var(--rule)' }}>
                <div className="flex gap-3">
                  <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send(input)}
                    placeholder="ASK A QUESTION..."
                    className="flex-1 px-4 py-3"
                    style={{ 
                      background: 'transparent', 
                      border: '1px solid var(--rule-2)', 
                      fontFamily: 'var(--mono)', 
                      fontSize: '11px', 
                      letterSpacing: '0.1em',
                      color: 'var(--ink)',
                      outline: 'none',
                    }}
                  />
                  <button 
                    onClick={() => send(input)}
                    className="pill-btn"
                    style={{ paddingLeft: '32px', paddingRight: '32px' }}
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions Sidebar */}
          <div className="lg:col-span-4 lg:pt-4">
             <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '24px' }}>Quick Queries</span>
             <div className="space-y-3">
               {SUGGESTIONS.map(s => (
                 <button 
                  key={s}
                  onClick={() => send(s)}
                  className="w-full text-left py-4 px-6 no-underline transition-all"
                  style={{ 
                    border: '1px solid var(--rule)',
                    fontFamily: 'var(--display)',
                    fontSize: '18px',
                    letterSpacing: '0.05em',
                    color: 'var(--ink)',
                    background: 'transparent',
                    cursor: 'none'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--cream-2)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--rule)'; }}
                 >
                   {s}
                 </button>
               ))}
             </div>
          </div>

        </div>

        {/* Footer */}
        <div 
          className="mt-32 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 reveal"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <div style={{ fontFamily: 'var(--display)', fontSize: '32px', letterSpacing: '0.04em', color: 'var(--ink)' }}>
            HUZAIFA.
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', opacity: 0.6 }}>
            Designed & Engineered with Intent · © 2026
          </div>
          <div className="flex gap-8">
             <a href="#hero" className="nav-link">BACK TO TOP</a>
          </div>
        </div>

      </div>
    </section>
  );
}
