'use client';

export default function FeaturedWork() {
  return (
    <section style={{
      background: '#080B12', padding: '120px 48px 80px', position: 'relative', overflow: 'hidden',
    }} className="topo-texture">
      {/* Section counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64, maxWidth: 1200, margin: '0 auto 64px' }}>
        <span className="section-counter">04</span>
        <div style={{ width: 40, height: 1, background: 'var(--starlight)', opacity: 0.3 }} />
        <span className="section-label">Featured</span>
      </div>

      {/* Large Split Card */}
      <div className="reveal" style={{
        maxWidth: 1200, margin: '0 auto 48px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        border: '1px solid rgba(200,146,26,0.1)', overflow: 'hidden',
      }}>
        {/* Left: artwork placeholder - bioluminescent coral */}
        <div style={{
          aspectRatio: '1', minHeight: 400,
          background: 'linear-gradient(160deg, #080B12 0%, #0a1a1a 20%, #0d3333 45%, #1a6666 60%, #C8921A 85%, #080B12 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Organic glow effects */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 60% 40%, rgba(0,180,180,0.12) 0%, transparent 50%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 30% 70%, rgba(200,146,26,0.1) 0%, transparent 40%)',
          }} />
          {/* Pollen particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              width: 3, height: 3, borderRadius: '50%',
              background: i % 3 === 0 ? '#C8921A' : '#1a9999',
              opacity: 0.3 + Math.random() * 0.4,
              boxShadow: `0 0 6px ${i % 3 === 0 ? 'rgba(200,146,26,0.5)' : 'rgba(26,153,153,0.5)'}`,
            }} />
          ))}
        </div>

        {/* Right: project info */}
        <div style={{
          background: 'rgba(14,19,32,0.8)', padding: '64px 48px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {/* Small icon */}
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1.5px solid rgba(26,153,153,0.5)', marginBottom: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', background: '#1a9999',
              boxShadow: '0 0 8px rgba(26,153,153,0.5)',
            }} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-display)', color: 'var(--moon-dust)',
            fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.15,
            margin: '0 0 24px 0',
          }}>
            <span style={{ fontWeight: 400 }}>SHAPE /</span><br />
            <span style={{ fontWeight: 700, fontStyle: 'italic' }}>UNBOUND /</span><br />
            <span style={{ fontWeight: 600, color: 'var(--starlight)' }}>RADIANCE</span>
          </h2>

          {/* Label */}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.25em', color: 'var(--comet-tail)', opacity: 0.6,
          }}>Personal Project</span>
        </div>
      </div>

      {/* Dot pagination */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 80 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: i === 1 ? 'var(--starlight)' : 'transparent',
            border: `1px solid ${i === 1 ? 'var(--starlight)' : 'rgba(200,146,26,0.3)'}`,
          }} />
        ))}
      </div>

      {/* Bottom CTA Row */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid rgba(200,146,26,0.08)', paddingTop: 48,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
          letterSpacing: '0.18em', color: 'var(--comet-tail)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          Live Events <span style={{ color: 'var(--starlight)', fontSize: 8 }}>▶</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600,
            fontSize: 'clamp(24px, 3vw, 40px)', color: 'var(--moon-dust)', margin: 0,
          }}>Launching an installation?</h3>
          <button className="cta-btn">
            Contacts <span style={{ color: 'var(--starlight)', marginLeft: 8, fontSize: 8 }}>▶</span>
          </button>
        </div>
      </div>

      {/* Footer credits */}
      <div style={{
        maxWidth: 1200, margin: '80px auto 0', paddingTop: 32,
        borderTop: '1px solid rgba(200,146,26,0.05)',
        fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
        letterSpacing: '0.2em', color: 'var(--comet-tail)', opacity: 0.3,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>© 2026 Reina Ashford</span>
        <span>Digital Alchemy Studio</span>
      </div>
    </section>
  );
}
