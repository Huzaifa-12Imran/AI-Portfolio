'use client';

import { useEffect, useRef, useState } from 'react';
import { mockGitHubStats } from '@/lib/mock-data';
import type { GitHubStats } from '@/types';

const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3B82F6', Python: '#FBBF24', JavaScript: '#F59E0B',
  Go: '#5DC9C0', Dart: '#6ABADB', Rust: '#E07848', CSS: '#A78BFA',
};

function getLangs(stats: GitHubStats) {
  const m: Record<string, number> = {};
  for (const r of stats.repositories.nodes)
    if (r.primaryLanguage) m[r.primaryLanguage.name] = (m[r.primaryLanguage.name] || 0) + 1;
  const tot = Object.values(m).reduce((a, b) => a + b, 0);
  return Object.entries(m).map(([n, c]) => ({ n, pct: Math.round((c / tot) * 100) }))
    .sort((a, b) => b.pct - a.pct).slice(0, 6);
}

export default function GitHubActivity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<GitHubStats | null>(null);

  useEffect(() => {
    fetch('/api/github').then(r => r.json())
      .then(d => setData(!d.error && d.repositories ? d : mockGitHubStats))
      .catch(() => setData(mockGitHubStats));
  }, []);

  useEffect(() => {
    if (!data || !canvasRef.current) return;
    const weeks = data.contributionsCollection.contributionCalendar.weeks;
    const cv = canvasRef.current, ctx = cv.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const cell = 10, gap = 3, tot = cell + gap, pad = 2;
    const w = weeks.length * tot + pad * 2, h = 7 * tot + pad * 2;
    cv.width = w * dpr; cv.height = h * dpr;
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Light-mode heatmap: very light → gold
    const lvl = [
      'rgba(18,16,8,0.05)',
      'rgba(175,112,32,0.25)',
      'rgba(175,112,32,0.50)',
      'rgba(175,112,32,0.78)',
      '#AF7020',
    ];

    let drawn = 0; const total = weeks.length * 7;
    const batch = () => {
      for (let b = 0; b < 40 && drawn < total; b++, drawn++) {
        const wi = Math.floor(drawn / 7), di = drawn % 7;
        const day = weeks[wi]?.contributionDays[di]; if (!day) continue;
        const x = pad + wi * tot, y = pad + di * tot;
        const c = day.contributionCount;
        let ci = 0; if (c > 0) ci = 1; if (c > 3) ci = 2; if (c > 6) ci = 3; if (c > 9) ci = 4;
        ctx.fillStyle = lvl[ci];
        ctx.beginPath(); ctx.roundRect(x, y, cell, cell, 2); ctx.fill();
      }
      if (drawn < total) requestAnimationFrame(batch);
    };
    batch();
  }, [data]);

  if (!data) return (
    <section className="dot-grid py-32 flex items-center justify-center" style={{ borderTop: '1px solid var(--rule)' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.3em' }} className="animate-pulse">LOADING…</span>
    </section>
  );

  const totStars = data.repositories.nodes.reduce((a, r) => a + r.stargazerCount, 0);
  const langs = getLangs(data);

  return (
    <section
      className="relative dot-grid"
      style={{ background: 'var(--cream)', borderTop: '1px solid var(--rule)', paddingTop: '80px', paddingBottom: '80px' }}
    >
      <div className="max-w-screen-xl mx-auto px-8 lg:px-14 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 pb-8 reveal" style={{ borderBottom: '1px solid var(--rule)' }}>
          <div>
            <p className="section-label mb-4">02 — GitHub</p>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(52px, 8vw, 110px)', letterSpacing: '0.02em', color: 'var(--ink)', lineHeight: 0.88, margin: 0 }}>
              CODE STATS.
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} className="animate-pulse" />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#22c55e', opacity: 0.8 }}>Live data</span>
          </div>
        </div>

        {/* Stats — single clean line */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 reveal">
          {[
            { label: 'Commits this year', val: data.contributionsCollection.totalCommitContributions.toLocaleString() },
            { label: 'Public repos',      val: data.repositories.nodes.length.toString()                                },
            { label: 'GitHub followers',  val: data.followers.totalCount.toString()                                     },
            { label: 'Total stars',       val: totStars.toString()                                                      },
          ].map(s => (
            <div key={s.label} style={{ borderTop: '2px solid var(--rule)', paddingTop: '16px' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px,4vw,56px)', color: 'var(--ink)', lineHeight: 0.9, letterSpacing: '0.02em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '8px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div className="mb-12 reveal">
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)' }}>52-week contributions</span>
            <div className="flex items-center gap-1.5">
              {['rgba(18,16,8,0.06)', 'rgba(175,112,32,0.25)', 'rgba(175,112,32,0.50)', 'rgba(175,112,32,0.78)', '#AF7020'].map((c, i) => (
                <div key={i} style={{ width: '8px', height: '8px', background: c, borderRadius: '2px' }} />
              ))}
            </div>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* Language bars */}
        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '32px' }} className="reveal">
          <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '20px' }}>Language breakdown</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
            {langs.map(l => (
              <div key={l.n}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: LANG_COLOR[l.n] || 'var(--gold)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink)' }}>{l.n}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--muted)' }}>{l.pct}%</span>
                </div>
                <div style={{ height: '1px', background: 'var(--rule-2)' }}>
                  <div style={{ height: '1px', width: `${l.pct}%`, background: LANG_COLOR[l.n] || 'var(--gold)', transition: 'width 1.4s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link */}
        <div className="flex justify-end mt-10 reveal">
          <a href="https://github.com/Huzaifa-12Imran" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', opacity: 0.7 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}>
            github.com/Huzaifa-12Imran →
          </a>
        </div>
      </div>
    </section>
  );
}
