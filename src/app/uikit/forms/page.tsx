import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UIKitForms() {
  return (
    <div className="space-y-8 pb-10">
      <div className="relative">
        <div className="absolute -left-10 w-20 h-20 bg-rose-500/30 rounded-full blur-[40px] pointer-events-none" />
        <h1 className="text-3xl font-bold tracking-tight text-white font-heading">Forms & Inputs</h1>
        <p className="text-rose-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Data collection components.</p>
      </div>

      <div className="grid gap-6">
        <Card className="glass-panel text-white hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all">
          <CardHeader>
            <CardTitle className="text-white font-heading tracking-wide">Command Triggers</CardTitle>
            <CardDescription className="text-indigo-300/70 font-mono text-xs uppercase tracking-widest">Interactive action elements.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button className="font-mono uppercase tracking-widest text-xs h-10 px-4">Default</Button>
            <Button variant="secondary" className="font-mono uppercase tracking-widest text-xs h-10 px-4 bg-white/10 hover:bg-white/20 text-white">Secondary</Button>
            <Button variant="destructive" className="font-mono uppercase tracking-widest text-xs h-10 px-4 shadow-[0_0_15px_rgba(251,113,133,0.3)] hover:shadow-[0_0_25px_rgba(251,113,133,0.5)] bg-rose-600 hover:bg-rose-500">Destructive</Button>
            <Button variant="outline" className="font-mono uppercase tracking-widest text-xs h-10 px-4 border-indigo-500/30 bg-transparent text-indigo-300 hover:bg-indigo-500/10">Outline</Button>
            <Button variant="ghost" className="font-mono uppercase tracking-widest text-xs h-10 px-4 text-slate-300 hover:bg-white/10 hover:text-white">Ghost</Button>
            <Button variant="link" className="font-mono uppercase tracking-widest text-xs h-10 px-4 text-cyan-400 neon-text-cyan hover:text-cyan-300">Link Protocol</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] font-mono uppercase tracking-widest text-xs h-10 px-4">Brand Primary</Button>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card className="glass-panel text-white hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all bg-grid-pattern">
          <div className="absolute inset-0 bg-slate-900/80 pointer-events-none rounded-xl" />
          <div className="relative z-10">
            <CardHeader>
              <CardTitle className="text-white font-heading tracking-wide">Data Receptors</CardTitle>
              <CardDescription className="text-indigo-300/70 font-mono text-xs uppercase tracking-widest">Input mechanisms for system parameters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-sm">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="email" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Operator Identity</Label>
                <Input type="email" id="email" placeholder="OP-ID@nexus.sys" className="bg-slate-900/50 border-cyan-500/30 text-white focus-visible:ring-cyan-500/50 font-mono placeholder:text-slate-600" />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="search" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Global Search</Label>
                <Input type="text" id="search" placeholder="Query matrix..." className="bg-slate-900/50 border-white/10 text-white focus-visible:ring-indigo-500/50 font-mono placeholder:text-slate-600" />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="status" className="text-slate-400 font-mono text-xs uppercase tracking-widest">System Status Override</Label>
                <select id="status" className="w-full flex h-10 rounded-md border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500/50 font-mono">
                   <option className="bg-slate-900">Standard Operations</option>
                   <option className="bg-slate-900">Emergency Protocol</option>
                </select>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
