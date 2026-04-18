'use client';

import Link from 'next/link';
import { Heart, Terminal, Activity, Shield, Cpu, Zap } from 'lucide-react';
import { GithubIcon } from '@/components/ui/GithubIcon';
import { TwitterIcon, LinkedinIcon, YoutubeIcon } from '@/components/ui/SocialIcons';

const techStack = ['Next.js 16', 'TypeScript', 'D3.js', 'Gemini AI', 'Supabase', 'Framer Motion'];

const socialLinks = [
  { href: 'https://github.com/Huzaifa-12Imran', icon: GithubIcon, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: LinkedinIcon, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: TwitterIcon, label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--space-void)] py-24 px-6 lg:pl-32 overflow-hidden border-t border-[var(--space-border)]">
      {/* Background design elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--starlight)]/20 to-transparent" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[var(--starlight)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Branding Module */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-xl bg-[var(--space-surface)] border border-[var(--space-border)] text-[var(--starlight)]">
                <Cpu size={24} />
             </div>
             <div>
                <h4 className="text-xl font-black text-[var(--moon-dust)] tracking-tighter uppercase italic">Huzaifa <span className="text-[var(--starlight)] not-italic">Imran</span></h4>
                <div className="hud-label mt-1">Foundational Engineering</div>
             </div>
          </div>
          <p className="text-[var(--comet-tail)] text-sm leading-relaxed font-medium">
             Designing high-performance digital systems, 
             intelligent AI proxies, and deep-technical interfaces.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-black border border-[var(--space-border)] flex items-center justify-center text-zinc-600 hover:text-[var(--starlight)] hover:border-[var(--starlight)]/40 transition-all group"
                title={label}
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* System Status Module */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           <h3 className="hud-label">SYSTEM_TELEMETRY</h3>
           <div className="flex flex-col gap-3">
              {[
                { label: 'Uptime', value: '99.98%' },
                { label: 'Latency', value: '14ms' },
                { label: 'Core', value: 'OB_FORGE_v4' },
                { label: 'Status', value: 'OPERATIONAL', color: 'text-emerald-500' }
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between border-b border-[var(--space-border)] pb-2">
                   <span className="hud-label text-[8px]">{stat.label}</span>
                   <span className={`text-[10px] font-mono font-bold ${stat.color || 'text-[var(--comet-tail)]'}`}>{stat.value}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Global Access Module */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           <h3 className="hud-label">GLOBAL_ACCESS</h3>
           <ul className="space-y-4">
              {[
                { label: 'INIT_SEQ', href: '#hero' },
                { label: 'SKILLS_MAT', href: '#skills' },
                { label: 'DEPLOYMENTS', href: '#projects' },
              ].map(link => (
                <li key={link.label}>
                   <a href={link.href} className="text-[11px] font-mono text-zinc-600 hover:text-[var(--starlight)] transition-colors flex items-center gap-2 group italic no-underline">
                      <Zap size={10} className="text-zinc-800 group-hover:text-[var(--starlight)] transition-colors" />
                      {link.label}
                   </a>
                </li>
              ))}
           </ul>
        </div>

        {/* Audit Module */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           <h3 className="hud-label">SECURITY_AUDIT</h3>
           <div className="p-6 rounded-2xl bg-[#050505] border border-[var(--space-border)] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                 <Shield className="text-[var(--starlight)]" size={16} />
                 <span className="hud-label tracking-widest">AUTHENTICATED</span>
              </div>
              <div className="text-[9px] font-mono text-zinc-700 leading-relaxed uppercase">
                 This portfolio uses end-to-end telemetry and is ground-truth verified by the author.
              </div>
              <div className="flex gap-1.5 opacity-20">
                 {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-1 h-1 bg-[var(--starlight)]" />
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Global Meta Info */}
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-[var(--space-border)] flex flex-col sm:flex-row items-center justify-between gap-6 opacity-30">
        <div className="flex items-center gap-6 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} HI_CORE_SYSTEMS</span>
          <span className="hidden sm:inline">BUILD.FORGE_V4.2.0</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hud-label mr-4">STACK_LOAD:</span>
          {techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[9px] text-zinc-600 uppercase tracking-widest font-mono font-bold">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
