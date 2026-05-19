import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function UIKitCharts() {
  const chartData = [
    { name: '01', value: 400 },
    { name: '02', value: 300 },
    { name: '03', value: 550 },
    { name: '04', value: 200 },
    { name: '05', value: 700 },
    { name: '06', value: 450 },
    { name: '07', value: 600 }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="relative">
        <div className="absolute -left-10 w-20 h-20 bg-cyan-500/30 rounded-full blur-[40px] pointer-events-none" />
        <h1 className="text-3xl font-bold tracking-tight text-white font-heading">Data Visualization</h1>
        <p className="text-cyan-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Recharts configurations and implementations.</p>
      </div>

      <div className="grid gap-6">
        <Card className="glass-panel glow-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-white font-heading tracking-wide">Activity Matrix <span className="text-cyan-400/50 font-mono text-xs font-normal ml-2">7 DAY LOG</span></CardTitle>
            <CardDescription className="text-indigo-300/70 font-mono text-xs uppercase tracking-widest">Gradient Area Chart implementation.</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} fontFamily="'JetBrains Mono', monospace" />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} fontFamily="'JetBrains Mono', monospace" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}
                    labelStyle={{ color: '#cbd5e1', marginBottom: '8px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#2dd4bf" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs font-mono text-slate-500 p-4 bg-slate-950/30 rounded-lg border border-white/5 space-y-2">
              <p>Key Implementation Details:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use `<span className="text-cyan-400">{'<defs>'}</span>` for `<span className="text-cyan-400">linearGradient</span>` to create the fading floor effect.</li>
                <li>Set `<span className="text-cyan-400">CartesianGrid</span>` using `vertical={'{'}false{'}'}` and a subtle stroke `rgba(255,255,255,0.05)`.</li>
                <li>Customize `<span className="text-cyan-400">Tooltip</span>` with a `contentStyle` that uses `backdropFilter` and standard dark backgrounds.</li>
                <li>Ensure `<span className="text-cyan-400">ResponsiveContainer</span>` has an explicit height on its wrapper `div`.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
