'use client';

export default function PortfolioFeature() {
  return (
    <section style={{
      background: '#080B12', padding: '120px 48px', position: 'relative', overflow: 'hidden',
      minHeight: '100vh', display: 'flex', alignItems: 'center',
    }} className="topo-texture">
      <div style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center',
      }}>
        {/* Left Side */}
        <div className="reveal" style={{ position: 'relative', zIndex: 2 }}>
          {/* Label */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.18em', color: 'var(--comet-tail)', marginBottom: 48,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            PORTFOLIO <span style={{ color: 'var(--starlight)', fontSize: 8 }}>▶</span>
          </div>

          {/* Section counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <span className="section-counter">03</span>
            <div style={{ width: 40, height: 1, background: 'var(--starlight)', opacity: 0.3 }} />
          </div>

          {/* Dot pagination */}
          <div style={{ display: 'flex', gap: 10, marginTop: 60 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i === 0 ? 'var(--starlight)' : 'transparent',
                border: `1px solid ${i === 0 ? 'var(--starlight)' : 'rgba(200,146,26,0.3)'}`,
                boxShadow: i === 0 ? '0 0 8px rgba(200,146,26,0.4)' : 'none',
              }} />
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="reveal" style={{ position: 'relative', zIndex: 2 }}>
          {/* Image placeholder - futuristic gallery interior */}
          <div style={{
            width: '100%', aspectRatio: '16/10', borderRadius: 4, marginBottom: 32,
            background: 'linear-gradient(160deg, #0E1320 0%, #1a0a2e 30%, #3d1f6d 55%, #7B3FA0 70%, #2d1b4e 90%)',
            position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(123,63,160,0.15)',
          }}>
            {/* Fake spotlight reflections */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
              background: 'linear-gradient(to top, rgba(123,63,160,0.15), transparent)',
            }} />
            <div style={{
              position: 'absolute', width: 3, height: '60%', top: '10%', left: '25%',
              background: 'rgba(200,146,26,0.08)', filter: 'blur(8px)',
            }} />
            <div style={{
              position: 'absolute', width: 3, height: '60%', top: '10%', left: '55%',
              background: 'rgba(123,63,160,0.15)', filter: 'blur(8px)',
            }} />
            <div style={{
              position: 'absolute', width: 3, height: '60%', top: '10%', left: '75%',
              background: 'rgba(200,146,26,0.08)', filter: 'blur(8px)',
            }} />
          </div>

          {/* Artist name */}
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.3em', color: 'var(--starlight)', marginBottom: 12,
          }}>Reina Ashford</p>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600,
            fontSize: 'clamp(32px, 4vw, 56px)', color: 'var(--moon-dust)',
            lineHeight: 1.1, margin: '0 0 20px 0',
          }}>Infinite Form: Digital Alchemy</h2>

          {/* Body */}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75,
            color: 'var(--comet-tail)', marginBottom: 32, maxWidth: 480,
          }}>
            Exploring the convergence of motion, mathematics, and material — a series
            of computational sculptures that breathe, fracture, and reform in infinite loops
            of digital transformation.
          </p>

          {/* CTA */}
          <button className="cta-btn">
            Read More <span style={{ color: 'var(--starlight)', marginLeft: 8, fontSize: 8 }}>▶</span>
          </button>
        </div>
      </div>
    </section>
  );
}
