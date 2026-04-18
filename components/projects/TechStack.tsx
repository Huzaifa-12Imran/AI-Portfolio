'use client';

import { motion } from 'framer-motion';

const TECH_COLORS: Record<string, string> = {
  'Next.js': '#ffffff',
  'React': '#61dafb',
  'TypeScript': '#3178c6',
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Node.js': '#68a063',
  'PostgreSQL': '#336791',
  'Redis': '#d82c20',
  'Docker': '#0db7ed',
  'Kubernetes': '#326ce5',
  'Prisma': '#5a67d8',
  'Stripe': '#6772e5',
  'Supabase': '#3ecf8e',
  'Tailwind CSS': '#38bdf8',
  'D3.js': '#f9a03c',
  'Framer Motion': '#ff0055',
  'Gemini AI': '#4285f4',
  'pgvector': '#3ecf8e',
  'Kafka': '#000000',
  'Apache Spark': '#e25a1c',
  'Dart': '#00B4AB',
  'Cobra': '#00ADD8',
  'Shell': '#89e051',
  'gRPC': '#00acc1',
  'Prometheus': '#e6522c',
  'Radix UI': '#8b5cf6',
  'Vitest': '#6e9f18',
  'Storybook': '#ff4785',
};

interface Props {
  stack: string[];
  max?: number;
}

export default function TechStack({ stack, max = 6 }: Props) {
  const visible = stack.slice(0, max);
  const overflow = stack.length - max;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tech, i) => {
        const color = TECH_COLORS[tech] || '#8b8b9e';
        return (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border"
            style={{
              backgroundColor: `rgba(20,20,20,0.5)`,
              borderColor: `${color}30`,
              color: color === '#ffffff' ? '#A0A0A0' : color,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color === '#ffffff' ? '#d4d4d8' : color }} />
            {tech}
          </motion.span>
        );
      })}
      {overflow > 0 && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-[#6B6B72] border border-[rgba(212,175,55,0.1)]">
          +{overflow} more
        </span>
      )}
    </div>
  );
}
