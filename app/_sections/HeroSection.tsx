'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ── PARTICLE GRID CONFIG ──
const GRID_ROWS = 12;
const GRID_COLS = 24;

function Particle({ x, y, mouseX, mouseY }: { x: number; y: number; mouseX: any; mouseY: any }) {
  const dist = useMemo(() => 80, []);
  const px = useSpring(0);
  const py = useSpring(0);

  useEffect(() => {
    const unsubX = mouseX.on('change', (v: number) => {
      const dx = v - x;
      const dy = mouseY.get() - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < dist) {
        px.set((dx / d) * (dist - d) * -0.5);
      } else {
        px.set(0);
      }
    });
    const unsubY = mouseY.on('change', (v: number) => {
      const dx = mouseX.get() - x;
      const dy = v - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < dist) {
        py.set((dy / d) * (dist - d) * -0.5);
      } else {
        py.set(0);
      }
    });
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, x, y, dist, px, py]);

  return (
    <motion.div
      style={{ 
        position: 'absolute', left: x, top: y, x: px, y: py,
        width: 2, height: 2, borderRadius: '50%', background: 'var(--ink)', opacity: 0.08
      }}
    />
  );
}

const SHARDS = [
  { id: 1, x: '15%', y: '25%', size: 44, delay: 0.2 },
  { id: 2, x: '82%', y: '18%', size: 52, delay: 0.4 },
  { id: 3, x: '75%', y: '65%', size: 38, delay: 0.6 },
  { id: 4, x: '12%', y: '72%', size: 48, delay: 0.8 },
  { id: 5, x: '50%', y: '10%', size: 32, delay: 1.0 },
  { id: 6, x: '88%', y: '80%', size: 40, delay: 1.2 },
];

export default function HeroSection({ loaded }: { loaded: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize); };
  }, [mouseX, mouseY]);

  const particles = useMemo(() => {
    if (!hasMounted) return [];
    const arr = [];
    const stepX = windowSize.w / GRID_COLS;
    const stepY = windowSize.h / GRID_ROWS;
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        arr.push(<Particle key={`${r}-${c}`} x={c * stepX + stepX / 2} y={r * stepY + stepY / 2} mouseX={mouseX} mouseY={mouseY} />);
      }
    }
    return arr;
  }, [windowSize, mouseX, mouseY, hasMounted]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between"
      style={{ background: 'var(--cream)', paddingTop: '88px' }}
    >
      {/* ── BACKGROUND PARTICLES ── */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        {particles}
      </div>

      {/* ── TOP NAV CONTEXT ── */}
      <div className="relative z-10 px-8 lg:px-14 flex justify-between items-start pt-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.4em', color: 'var(--gold)' }} className="uppercase mb-2">Architectural Logic</div>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: '48px', color: 'var(--ink)', margin: 0 }}>HUZAIFA IMRAN.</h1>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em' }} className="uppercase mt-1">Full-Stack Engineer & AI Builder</p>
          
          <motion.a 
            href="#projects"
            className="group mt-8 relative inline-flex items-center gap-4 px-10 py-5 no-underline bg-[#AF7020] rounded-sm transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(175,112,32,0.2)] hover:shadow-[0_20px_40px_rgba(175,112,32,0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-[#121008] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', position: 'relative', zIndex: 10 }} className="uppercase text-white group-hover:text-white transition-colors duration-300">Explore Portfolio</span>
            <div className="relative z-10 w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-500" />
          </motion.a>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-right"
        >
           <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--gold)' }} className="uppercase mb-2">Live Availability</div>
           <div style={{ fontFamily: 'var(--display)', fontSize: '28px', color: 'var(--ink)' }}>OPEN FOR HIRE.</div>
        </motion.div>
      </div>

      {/* ── KINETIC TYPOGRAPHY ── */}
      <div className="relative z-20 px-8 lg:px-14 flex flex-col items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              fontFamily: 'var(--display)', 
              fontSize: 'clamp(60px, 12vw, 160px)', 
              color: 'var(--ink)', 
              lineHeight: 0.82, 
              textAlign: 'center', 
              margin: 0
            }}
          >
            <span className="block">ENGINEERING</span>
            <span className="block text-outline" style={{ transition: 'letter-spacing 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.letterSpacing = '0.05em'} onMouseLeave={e => e.currentTarget.style.letterSpacing = 'normal'}>SCALABLE</span>
            <span className="block">DREAMS.</span>
          </motion.h2>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 px-8 lg:px-14 py-10 flex flex-col md:flex-row justify-between items-end gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xs"
        >
          <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.4em', color: 'var(--muted)', marginBottom: '12px' }} className="uppercase">Core Impact</div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span style={{ fontFamily: 'var(--display)', fontSize: '28px', color: 'var(--ink)' }}>05+</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '7px', color: 'var(--muted)', letterSpacing: '0.2em' }}>PRODUCTS</span>
            </div>
            <div style={{ width: 1, height: 40, background: 'var(--rule)' }} />
            <div className="flex flex-col">
              <span style={{ fontFamily: 'var(--display)', fontSize: '28px', color: 'var(--ink)' }}>04yr</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '7px', color: 'var(--muted)', letterSpacing: '0.2em' }}>EXP</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-end"
        >
          <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.4em', color: 'var(--muted)', marginBottom: '8px' }} className="uppercase">Contact Node</div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--ink)', margin: 0, fontWeight: 500 }}>SUNGPOG89@GMAIL.COM</p>
        </motion.div>
      </div>

      {/* ── DRAGGABLE SHARDS ── */}
      {SHARDS.map((s) => (
        <motion.div
          key={s.id}
          drag
          dragConstraints={containerRef}
          dragElastic={0.15}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ 
            position: 'absolute', left: s.x, top: s.y,
            width: s.size, height: s.size,
            border: '1px solid var(--gold)',
            background: 'rgba(175,112,32,0.08)',
            backdropFilter: 'blur(3px)',
            transform: 'rotate(45deg)',
            zIndex: 50,
            cursor: 'grab',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(175,112,32,0.15)', borderColor: 'var(--gold)' }}
          whileDrag={{ scale: 1.25, backgroundColor: 'rgba(175,112,32,0.2)', cursor: 'grabbing', zIndex: 60 }}
        >
          <div style={{ position: 'absolute', width: '20%', height: '1px', background: 'var(--gold)', opacity: 0.6 }} />
          <div style={{ position: 'absolute', width: '1px', height: '20%', background: 'var(--gold)', opacity: 0.6 }} />
        </motion.div>
      ))}

      {/* Instructions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 0.5 } : {}}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
      >
         <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'var(--gold)', letterSpacing: '0.4em' }} className="uppercase">Drag objects to interact · hover titles to distort</span>
      </motion.div>

    </div>
  );
}
