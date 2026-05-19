import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UIKitTypography() {
  return (
    <div className="space-y-8 pb-10">
      <div className="relative">
        <div className="absolute -left-10 w-20 h-20 bg-indigo-500/30 rounded-full blur-[40px] pointer-events-none" />
        <h1 className="text-3xl font-bold tracking-tight text-white font-heading">Typography Protocol</h1>
        <p className="text-indigo-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Authorized font families and text sizes.</p>
      </div>

      <div className="grid gap-6">
        <Card className="glass-panel text-white hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all">
          <CardHeader>
            <CardTitle className="text-white font-heading tracking-wide">System Typography</CardTitle>
            <CardDescription className="text-indigo-300/70 font-mono text-xs uppercase tracking-widest">Core typescale for titles and data display.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-200">
            <div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl font-heading text-white neon-text-cyan">Header Alpha</h1>
              <p className="text-[10px] text-cyan-500/80 font-mono uppercase tracking-widest mt-2 border-l border-cyan-500/50 pl-2">font-heading neon-text-cyan</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-wide font-heading text-slate-100">Header Beta</h2>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-2 border-l border-slate-500/50 pl-2">font-heading tracking-wide</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium tracking-tight text-indigo-200">Header Gamma</h3>
              <p className="text-[10px] text-indigo-500 font-mono uppercase tracking-widest mt-2 border-l border-indigo-500/50 pl-2">text-2xl text-indigo-200</p>
            </div>
            <div>
              <p className="leading-7 font-sans text-slate-300 border-l px-4 border-slate-700">
                Standard text body sequence. Engineered for maximal optical reading velocity during prolonged exposure. Uses Inter geometric construction.<br/>
                <span className="text-white font-medium">Bold signal</span> and <span className="italic text-slate-400">italic resonance</span>.
              </p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-2 border-l border-slate-700 pl-2 ml-4">font-sans leading-7</p>
            </div>
            <div className="font-mono text-xs bg-slate-950/50 p-4 border border-white/10 rounded-md w-fit shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
               <span className="text-indigo-400">export const</span> <span className="text-cyan-400">SYSTEM_CORE</span> = <span className="text-emerald-400">"ONLINE"</span>;
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
