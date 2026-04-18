'use client';

const projects = [
  { id: '01', name: 'FORGE STUDIO', icon: '◆' },
  { id: '02', name: 'AXIOM', icon: '▲' },
  { id: '03', name: 'NEBULA', nameBold: 'VOL.1', active: true },
  { id: '04', name: 'HELIX', nameBold: '3.0', icon: '◎' },
];

export default function ProjectCarousel() {
  return (
    <section style={{
      background: '#080B12', padding: '120px 48px', position: 'relative', overflow: 'hidden',
    }} className="topo-texture">
      {/* Section counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 }}>
        <span className="section-counter">02</span>
        <div style={{ width: 40, height: 1, background: 'var(--starlight)', opacity: 0.3 }} />
        <span className="section-label">Selected Works</span>
      </div>

      {/* Cards Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
        maxWidth: 1200, margin: '0 auto',
      }}>
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`project-card ${p.active ? 'active shimmer' : ''}`}
            style={{
              height: p.active ? 420 : 340,
              alignSelf: p.active ? 'stretch' : 'center',
              transition: 'all 0.4s ease',
            }}
          >
            {p.active ? (
              /* Active card: placeholder nebula artwork */
              <div style={{
                width: '100%', flex: 1, borderRadius: 4, marginBottom: 20,
                background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #7B3FA0 50%, #C8921A 80%, #080B12 100%)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Fake star dots */}
                {Array.from({ length: 15 }).map((_, j) => (
                  <div key={j} style={{
                    position: 'absolute',
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    width: 2, height: 2, borderRadius: '50%',
                    background: '#E5A91D',
                    opacity: 0.4 + Math.random() * 0.6,
                    boxShadow: '0 0 4px rgba(229,169,29,0.6)',
                  }} />
                ))}
              </div>
            ) : (
              /* Inactive card: icon */
              <div style={{
                fontSize: 32, color: 'rgba(200,146,26,0.25)', marginBottom: 24,
                fontFamily: 'var(--font-display)',
              }}>{p.icon}</div>
            )}

            {/* Index */}
            <span style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: 'var(--starlight)', fontSize: 12, marginBottom: 8,
            }}>{p.id}</span>

            {/* Name */}
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              color: p.active ? 'var(--moon-dust)' : 'var(--comet-tail)',
            }}>
              {p.name}{p.nameBold && <strong style={{ fontWeight: 700 }}> {p.nameBold}</strong>}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar under active card */}
      <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingLeft: '50%', paddingRight: '0' }}>
        <div className="progress-bar" style={{ width: '22%', margin: '0 auto' }} />
      </div>
    </section>
  );
}
