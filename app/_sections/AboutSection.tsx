'use client';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative dot-grid" 
      style={{ background: 'var(--cream)', borderTop: '1px solid var(--rule)', paddingBottom: '80px' }}
    >
      <div className="max-w-screen-xl mx-auto px-8 lg:px-14 py-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Label / Counter */}
          <div className="lg:col-span-3 reveal">
            <p className="section-label mb-4">01 — ABOUT</p>
            <div 
              style={{ 
                fontFamily: 'var(--display)', 
                fontSize: '120px', 
                color: 'var(--ink)', 
                opacity: 0.1,
                lineHeight: 0.82,
                marginTop: '20px'
              }}
            >
              26.
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              Years of curiosity
            </span>
          </div>

          {/* Core Content */}
          <div className="lg:col-span-9 reveal">
            <h2 
              style={{ 
                fontFamily: 'var(--display)', 
                fontSize: 'clamp(44px, 6vw, 92px)', 
                color: 'var(--ink)', 
                lineHeight: 0.95, 
                margin: '0 0 48px 0',
                letterSpacing: '0.01em'
              }}
            >
              DRIVEN BY <span className="text-outline">SYSTEMS</span> AND AESTHETIC PRECISION.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <p 
                  style={{ 
                    fontFamily: 'var(--sans)', 
                    fontSize: '17px', 
                    color: 'var(--ink)', 
                    lineHeight: 1.7, 
                    fontWeight: 450,
                    margin: 0 
                  }}
                >
                  I'm a Full-Stack Engineer who believes that code is as much about architecture as it is about poetry. I build systems that are fast, accessible, and meaningful.
                </p>
                <div style={{ marginTop: '32px', borderTop: '1px solid var(--rule-2)', paddingTop: '24px' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Philosophy</span>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                    Minimize complexity. Maximize impact. Every pixel and every millisecond of latency matters.
                  </p>
                </div>
              </div>
              
              <div className="space-y-10">
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '16px' }}>Service Stack</span>
                  <ul className="list-none p-0 m-0 space-y-3">
                    {['AI Integration & RAG', 'Distributed Backend Systems', 'Immersive Frontend UX', 'Cloud Infrastructure (AWS/GCP)'].map(s => (
                      <li key={s} className="flex items-center gap-3">
                        <div style={{ width: '4px', height: '4px', background: 'var(--gold)', borderRadius: '50%' }} />
                        <span style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--ink)', fontWeight: 500 }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '16px' }}>Latest Endeavors</span>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                    Currently architecting high-performance developer tools and AI systems that help engineering teams scale their output without compromising on quality.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Decorative divider */}
        <div className="mt-24 reveal" style={{ width: '100%', height: '1px', background: 'var(--rule)', display: 'flex', justifyContent: 'center' }}>
           <div style={{ padding: '0 20px', background: 'var(--cream)', marginTop: '-8px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--rule-2)' }}>+</div>
        </div>

      </div>
    </section>
  );
}
