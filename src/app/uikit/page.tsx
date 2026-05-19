import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Type, Component, LineChart, TextCursorInput } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UIKit() {
  const sections = [
    {
      title: 'Typography Protocol',
      description: 'Authorized font families, headers, and body text sequences.',
      icon: Type,
      path: '/uikit/typography',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    },
    {
      title: 'Card Components',
      description: 'Standard panels, glassmorphism, and structural containers.',
      icon: Component,
      path: '/uikit/cards',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Data Visualization',
      description: 'Recharts configurations and dynamic area charts.',
      icon: LineChart,
      path: '/uikit/charts',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      title: 'Forms & Inputs',
      description: 'Data receptors, command triggers, and system overrides.',
      icon: TextCursorInput,
      path: '/uikit/forms',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10'
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="relative">
        <div className="absolute -left-10 w-20 h-20 bg-indigo-500/30 rounded-full blur-[40px] pointer-events-none" />
        <h1 className="text-3xl font-bold tracking-tight text-white font-heading">Neural UI Kit</h1>
        <p className="text-indigo-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Interface Component Library Overview</p>
      </div>

      <Card className="glass-panel text-white bg-grid-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/80 pointer-events-none" />
        <CardContent className="relative z-10 pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 glow-border">
              <Sparkles className="w-12 h-12 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white mb-2">Design System Documentation</h2>
              <p className="text-slate-300 font-sans text-sm leading-relaxed max-w-2xl">
                This environment catalogs the primary components, styling variables, and structural paradigms used across the Nexus architecture. Use these components to maintain consistency and rapid optical reading velocity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link key={section.title} to={section.path} className="group">
            <Card className="glass-panel h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:bg-slate-800/50 cursor-pointer border-white/5 group-hover:border-white/20 relative overflow-hidden">
             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors pointer-events-none" />
              <CardContent className="p-6 flex gap-4 relative z-10">
                <div className={`p-3 rounded-xl h-fit border border-white/5 ${section.bg}`}>
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg mb-1 flex items-center gap-2">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{section.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  );
}
