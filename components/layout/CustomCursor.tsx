'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isGrab, setIsGrab] = useState(false);

  // Smooth springs for high-end movement
  const x = useSpring(0, { damping: 32, stiffness: 450 });
  const y = useSpring(0, { damping: 32, stiffness: 450 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Offset by 0 because it's center-aligned
      x.set(e.clientX);
      y.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const computedCursor = window.getComputedStyle(target).cursor;
      setIsPointer(
        computedCursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
      
      setIsGrab(computedCursor === 'grab' || computedCursor === 'grabbing');
    };
    
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0, top: 0,
        x, y,
        pointerEvents: 'none',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Central Precision Point */}
      <motion.div 
        animate={{ 
          scale: isPointer ? 0.6 : 1,
          backgroundColor: isPointer ? 'var(--gold)' : 'var(--gold)'
        }}
        style={{ width: 4, height: 4, borderRadius: '50%' }}
      />

      {/* Observational Brackets */}
      <motion.div
        animate={{
          width: isPointer ? 44 : 20,
          height: isPointer ? 44 : 20,
          rotate: isPointer ? 45 : 0,
          borderRadius: isPointer ? '2px' : '50%',
          opacity: isGrab ? 0.2 : 0.5
        }}
        style={{
          position: 'absolute',
          border: '1px solid var(--ink)',
        }}
      />

      {/* HUD Detail */}
      <AnimatePresence>
        {isPointer && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 30 }}
            exit={{ opacity: 0, x: 20 }}
            style={{
              position: 'absolute',
              fontFamily: 'var(--mono)',
              fontSize: '7px',
              color: 'var(--gold)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            01/Select
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
