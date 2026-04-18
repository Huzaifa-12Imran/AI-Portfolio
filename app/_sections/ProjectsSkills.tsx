'use client';

import { useEffect, useRef, useState } from 'react';
import type { GitHubStats } from '@/types';

const SKILLS = [
  { axis: 'Frontend', value: 90 },
  { axis: 'Backend',  value: 85 },
  { axis: 'DevOps',   value: 70 },
  { axis: 'AI/ML',    value: 80 },
  { axis: 'Systems',   value: 68 },
  { axis: 'Mobile',   value: 50 },
];

function drawRadar(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const dpr = window.devicePixelRatio || 1;
  const s = 280;
  canvas.width = s * dpr;
  canvas.height = s * dpr;
  canvas.style.width = s + 'px';
  canvas.style.height = s + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const cx = s / 2, cy = s / 2, r = 100, n = SKILLS.length;

  // Concentric hex/circles
  for (let ring = 1; ring <= 4; ring++) {
    ctx.strokeStyle = 'rgba(18,16,8,0.08)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    const rr = (r * ring) / 4;
    for (let i = 0; i <= n; i++) {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Axis lines
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    ctx.strokeStyle = 'rgba(18,16,8,0.06)';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.stroke();

    // Labels
    const lx = cx + Math.cos(a) * (r + 20);
    const ly = cy + Math.sin(a) * (r + 20);
    ctx.fillStyle = 'rgba(18,16,8,0.5)';
    ctx.font = '500 8px IBM Plex Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(SKILLS[i].axis.toUpperCase(), lx, ly);
  }

  // Data polygon
  ctx.fillStyle = 'rgba(175,112,32,0.12)';
  ctx.strokeStyle = 'rgba(175,112,32,0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const a = (Math.PI * 2 * idx) / n - Math.PI / 2;
    const val = (SKILLS[idx].value / 100) * r;
    const x = cx + Math.cos(a) * val;
    const y = cy + Math.sin(a) * val;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Data points
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const val = (SKILLS[i].value / 100) * r;
    const x = cx + Math.cos(a) * val;
    const y = cy + Math.sin(a) * val;
    ctx.fillStyle = '#AF7020';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ProjectsSkills() {
  const radarRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<GitHubStats | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then(d => { if (!d.error && d.repositories) setData(d); })
      .catch(() => { });
  }, []);

  useEffect(() => {
    if (radarRef.current) drawRadar(radarRef.current);
  }, []);

  const projects = (data?.repositories.nodes || []).slice(0, 4).map((r, i) => ({
    id: String(i + 1).padStart(2, '0'),
    title: r.name ? r.name.replace(/-/g, ' ').toUpperCase() : 'PROJECT',
    desc: r.description || 'Full-stack application built with high performance in mind.',
    tags: [r.primaryLanguage?.name || 'TypeScript', 'Web App'],
    year: '2024',
    url: r.url,
  }));

  return (
    <section 
      id="projects" 
      className="relative dot-grid" 
      style={{ background: 'var(--cream)', borderTop: '1px solid var(--rule)', paddingBottom: '120px' }}
    >
      <div className="max-w-screen-xl mx-auto px-8 lg:px-14 py-24 relative z-10">
        
        {/* Header */}
        <div className="mb-20 reveal">
          <p className="section-label mb-6">03 — WORK</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(52px, 10vw, 130px)', color: 'var(--ink)', lineHeight: 0.88, margin: 0, letterSpacing: '0.01em' }}>
            SELECTED<br />PROJECTS.
          </h2>
        </div>

        {/* Project List — Full width rows */}
        <div className="space-y-0 mb-32 reveal">
          {projects.map((p, i) => (
            <a 
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-row block group no-underline"
              style={{ borderBottom: i === projects.length - 1 ? '1px solid var(--rule)' : '' }}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <div className="py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4" style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.2em' }}>
                    <span>{p.id} — {p.tags.join(' / ').toUpperCase()}</span>
                  </div>
                  <h3 
                    style={{ 
                      fontFamily: 'var(--display)', 
                      fontSize: 'clamp(38px, 6vw, 84px)', 
                      color: hoverIdx === i ? 'var(--gold)' : 'var(--ink)',
                      lineHeight: 1,
                      margin: 0,
                      transition: 'color 0.4s ease, transform 0.4s ease',
                      transform: hoverIdx === i ? 'translateX(10px)' : 'translateX(0)',
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
                
                <div className="flex flex-col lg:items-end gap-1 max-w-sm">
                   <span style={{ fontFamily: 'var(--display)', fontSize: '24px', color: 'var(--ink)', opacity: 0.6 }}>YEAR: {p.year}</span>
                   <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.6, textAlign: 'left', lg: { textAlign: 'right' } }}>
                      {p.desc}
                   </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Skills/Radar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start reveal">
          <div>
            <p className="section-label mb-8">Technical Expertise</p>
            <div className="flex justify-center lg:justify-start">
               <canvas ref={radarRef} />
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '32px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '24px' }}>Core Stack</span>
            <div className="flex flex-wrap gap-4">
               {['Next.js 15', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'TailwindCSS'].map(s => (
                 <div 
                   key={s} 
                   style={{ 
                     fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 600, color: 'var(--ink)', 
                     padding: '8px 16px', background: 'var(--cream-2)', borderRadius: '4px' 
                   }}
                 >
                   {s}
                 </div>
               ))}
            </div>
            
            <div className="mt-12">
               <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '12px' }}>● Status update</span>
               <p style={{ fontFamily: 'var(--sans)', fontSize: '16px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.7, margin: 0, maxWidth: '480px' }}>
                  Available for select full-time opportunities or high-impact contract projects starting Q3 2026. Looking for engineering teams that value performance and aesthetics.
               </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
