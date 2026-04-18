'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function EnergyTracers() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90
  });

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-30">
      <div className="absolute inset-0 blueprint-grid" />
      
      <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="tracerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--core-red)" />
            <stop offset="50%" stopColor="var(--core-orange)" />
            <stop offset="100%" stopColor="var(--core-yellow)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Primary Tracer Path */}
        <motion.path
          d="M 2,0 L 2,100 L 98,100 L 98,250 L 5,250 L 5,450 L 95,450 L 95,700 L 5,700 L 5,950 L 98,950 L 98,1000"
          fill="transparent"
          stroke="url(#tracerGradient)"
          strokeWidth="0.2"
          strokeDasharray="1 1"
          style={{ pathLength }}
          filter="url(#glow)"
        />

        {/* Pulse Effect */}
        <motion.circle
          r="0.5"
          fill="var(--core-pink)"
          style={{
            offsetPath: "path('M 2,0 L 2,100 L 98,100 L 98,250 L 5,250 L 5,450 L 95,450 L 95,700 L 5,700 L 5,950 L 98,950 L 98,1000')",
            offsetDistance: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
          }}
        />
      </svg>
    </div>
  );
}
