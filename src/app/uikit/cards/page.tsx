import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function UIKitCards() {
  return (
    <div className="space-y-8 pb-10">
      <div className="relative">
        <div className="absolute -left-10 w-20 h-20 bg-emerald-500/30 rounded-full blur-[40px] pointer-events-none" />
        <h1 className="text-3xl font-bold tracking-tight text-white font-heading">Card Components</h1>
        <p className="text-emerald-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Containers and content grouping.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-panel text-white hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all">
          <CardHeader>
            <CardTitle className="text-white font-heading tracking-wide">Standard Glass Panel</CardTitle>
            <CardDescription className="text-emerald-300/70 font-mono text-xs uppercase tracking-widest">Basic semi-transparent container.</CardDescription>
          </CardHeader>
          <CardContent className="text-slate-300 font-sans text-sm">
            This card uses the `glass-panel` class to create a frosted glass effect with a subtle border and background blur. It is ideal for most dashboard panels.
          </CardContent>
        </Card>

        <Card className="glass-panel text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all glow-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-white font-heading tracking-wide">Glow Border Panel</CardTitle>
            <CardDescription className="text-cyan-300/70 font-mono text-xs uppercase tracking-widest">Container with ambient lighting.</CardDescription>
          </CardHeader>
          <CardContent className="text-slate-300 font-sans text-sm relative z-10">
            This card features an ambient corner glow and a glowing top border. It adds emphasis to important data or interactive areas.
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel text-white hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all bg-grid-pattern">
        <div className="absolute inset-0 bg-slate-900/80 pointer-events-none rounded-xl" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-white font-heading tracking-wide">Grid Background Panel</CardTitle>
            <CardDescription className="text-indigo-300/70 font-mono text-xs uppercase tracking-widest">Container with technical aesthetic.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 font-sans text-sm">
              Use `bg-grid-pattern` to add a subtle technical blueprint aesthetic to the panel background.
            </p>
            <div className="mt-4 flex gap-2">
              <Badge variant="outline" className="font-mono uppercase tracking-widest text-[10px] text-cyan-400 border-cyan-500/30">Module Active</Badge>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
