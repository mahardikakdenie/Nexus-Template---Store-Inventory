import React, { useEffect, useState } from 'react';
import { Settings, Check, Type, Eclipse, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';

type Config = {
  theme: 'dark' | 'light' | 'blue' | 'green';
  direction: 'ltr' | 'rtl';
  font: 'space' | 'inter' | 'roboto';
};

const THEMES = [
  { id: 'dark', label: 'Dark Mode (Neon)', class: 'dark' },
  { id: 'light', label: 'Light Mode', class: 'light' },
];

const FONTS = [
  { id: 'space', label: 'Space Grotesk', class: 'font-space' },
  { id: 'inter', label: 'Inter', class: 'font-inter' },
  { id: 'roboto', label: 'Roboto Mono', class: 'font-roboto' },
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  
  const [config, setConfig] = useState<Config>(() => {
    const saved = localStorage.getItem('nexus-config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { theme: 'dark', direction: 'ltr', font: 'space' };
  });

  useEffect(() => {
    localStorage.setItem('nexus-config', JSON.stringify(config));
    
    const root = window.document.documentElement;
    // Set Direction
    root.dir = config.direction;

    // Set Theme (you would coordinate this with ThemeProvider, but we can manage standard classes for Demo)
    root.classList.remove('light', 'dark', 'font-space', 'font-inter', 'font-roboto');
    
    // Default Tailwind theme uses 'dark' class
    if (config.theme === 'dark') root.classList.add('dark');
    else if (config.theme === 'light') root.classList.add('light'); // We might not have a full light theme mapping, but it toggles
    
    // Add Font Class
    root.classList.add(`font-${config.font}`);

  }, [config]);

  const updateConfig = (key: keyof Config, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] bg-gradient-to-tr from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white z-50 animate-pulse-slow border border-white/20"
          >
            <Settings className="h-6 w-6" />
          </Button>
        }
      />
      <SheetContent className="w-80 p-6 border-l border-white/10 bg-slate-950/95 backdrop-blur-3xl z-[100] text-slate-200">
        <SheetHeader className="pb-6 border-b border-white/10">
          <SheetTitle className="text-white font-heading text-xl flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-cyan-400" />
            Theme Customizer
          </SheetTitle>
          <SheetDescription className="font-mono text-xs text-slate-400">
            Configure system UI preferences.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-8">
          {/* Direction */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LayoutTemplate className="w-3 h-3" />
              Direction
            </h3>
            <div className="flex gap-2">
              <Button
                variant={config.direction === 'ltr' ? 'default' : 'outline'}
                className={config.direction === 'ltr' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-white/10'}
                onClick={() => updateConfig('direction', 'ltr')}
              >
                LTR
              </Button>
              <Button
                variant={config.direction === 'rtl' ? 'default' : 'outline'}
                className={config.direction === 'rtl' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-white/10'}
                onClick={() => updateConfig('direction', 'rtl')}
              >
                RTL
              </Button>
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Eclipse className="w-3 h-3" />
              Mode
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((t) => (
                <Button
                  key={t.id}
                  variant={config.theme === t.id ? 'default' : 'outline'}
                  className={`justify-start text-xs ${config.theme === t.id ? 'bg-indigo-500 hover:bg-indigo-600' : 'border-white/10'}`}
                  onClick={() => updateConfig('theme', t.id)}
                >
                  {config.theme === t.id && <Check className="w-3 h-3 mr-2" />}
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Type className="w-3 h-3" />
              Typography
            </h3>
            <div className="grid gap-2">
              {FONTS.map((f) => (
                <Button
                  key={f.id}
                  variant={config.font === f.id ? 'default' : 'outline'}
                  className={`justify-start text-xs font-sans ${config.font === f.id ? 'bg-rose-500 hover:bg-rose-600' : 'border-white/10'}`}
                  onClick={() => updateConfig('font', f.id)}
                >
                  {config.font === f.id && <Check className="w-3 h-3 mr-2" />}
                  {f.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
