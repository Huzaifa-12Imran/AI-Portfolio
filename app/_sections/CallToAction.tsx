'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

export default function CallToAction() {
  return (
    <section className="py-32 px-6 relative overflow-hidden dot-grid">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="mb-8 flex justify-center"
        >
          <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500">
            <Sparkles size={24} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-bold text-white tracking-tightest mb-6 leading-tight"
        >
          Ready to build the <br /> <span className="text-blue-500">future</span> of digital systems?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-zinc-500 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Whether you have a specific project in mind or just want to explore possibilities, I'm here to help you architect high-performance solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="mailto:sungpog89@gmail.com" className="w-full sm:w-auto">
            <Button size="lg" className="w-full rounded-full">
              Get in Touch <ArrowRight size={18} className="ml-1" />
            </Button>
          </Link>
          <Link href="/chat" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full rounded-full">
              <MessageSquare size={18} className="mr-2 text-blue-500" />
              Chat with AI
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
