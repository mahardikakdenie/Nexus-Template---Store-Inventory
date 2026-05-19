import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useInventory } from '@/src/contexts/InventoryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, ArrowDownToLine, ArrowUpFromLine, Activity } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Dashboard() {
  const { items, transactions } = useInventory();

  const totalItems = items.length;
  const totalStock = items.reduce((acc, item) => acc + item.stock, 0);
  
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);
  
  const recentTransactions = transactions.filter(t => new Date(t.date) >= thirtyDaysAgo);
  const masukCount = recentTransactions.filter(t => t.type === 'masuk').reduce((acc, t) => acc + t.quantity, 0);
  const keluarCount = recentTransactions.filter(t => t.type === 'keluar').reduce((acc, t) => acc + t.quantity, 0);

  // Generate chart data for last 7 days
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(today, 6 - i);
    const dayTransactions = transactions.filter(
      (t) => new Date(t.date).toDateString() === d.toDateString()
    );
    
    return {
      name: format(d, 'EEE', { locale: id }),
      masuk: dayTransactions.filter(t => t.type === 'masuk').reduce((acc, t) => acc + t.quantity, 0),
      keluar: dayTransactions.filter(t => t.type === 'keluar').reduce((acc, t) => acc + t.quantity, 0),
    };
  });

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -left-10 w-20 h-20 bg-cyan-500/30 rounded-full blur-[40px] pointer-events-none" />
        <h1 className="text-3xl font-bold tracking-tight text-white font-heading">System Overview</h1>
        <p className="text-cyan-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Global Inventory Diagnostics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-panel text-white transition-all duration-300 hover:bg-slate-800/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-mono text-slate-300 uppercase tracking-widest">Total SKU Class</CardTitle>
            <div className="p-2 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
              <Package className="h-4 w-4 text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono tracking-tight text-white neon-text-cyan">{totalItems}</div>
            <p className="text-xs text-indigo-300/70 mt-1 uppercase tracking-wider">Registered Items</p>
          </CardContent>
        </Card>
        <Card className="glass-panel text-white transition-all duration-300 hover:bg-slate-800/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-mono text-slate-300 uppercase tracking-widest">Total Inventory</CardTitle>
            <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
              <Activity className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono tracking-tight text-white neon-text-cyan">{totalStock}</div>
            <p className="text-xs text-cyan-300/70 mt-1 uppercase tracking-wider">Active Units</p>
          </CardContent>
        </Card>
        <Card className="glass-panel text-white transition-all duration-300 hover:bg-slate-800/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-mono text-slate-300 uppercase tracking-widest">Inbound (30d)</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
              <ArrowDownToLine className="h-4 w-4 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono tracking-tight text-emerald-300" style={{ textShadow: '0 0 15px rgba(52,211,153,0.3)' }}>+{masukCount}</div>
            <p className="text-xs text-emerald-400/70 mt-1 uppercase tracking-wider">Units Acquired</p>
          </CardContent>
        </Card>
        <Card className="glass-panel text-white transition-all duration-300 hover:bg-slate-800/50 hover:shadow-[0_0_30px_rgba(251,113,133,0.15)] group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-mono text-slate-300 uppercase tracking-widest">Outbound (30d)</CardTitle>
            <div className="p-2 rounded-lg bg-rose-500/10 group-hover:bg-rose-500/20 transition-colors">
              <ArrowUpFromLine className="h-4 w-4 text-rose-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono tracking-tight text-rose-300" style={{ textShadow: '0 0 15px rgba(251,113,133,0.3)' }}>-{keluarCount}</div>
            <p className="text-xs text-rose-400/70 mt-1 uppercase tracking-wider">Units Dispatched</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 glass-panel glow-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-white font-heading tracking-wide">Activity Matrix <span className="text-cyan-400/50 font-mono text-xs font-normal ml-2">7 DAY LOG</span></CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorKeluar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb7185" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
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
                  <Area type="monotone" dataKey="masuk" stroke="#2dd4bf" strokeWidth={2} fillOpacity={1} fill="url(#colorMasuk)" />
                  <Area type="monotone" dataKey="keluar" stroke="#fb7185" strokeWidth={2} fillOpacity={1} fill="url(#colorKeluar)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 glass-panel">
          <CardHeader>
            <CardTitle className="text-white font-heading tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Critical Reserves
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items
                .filter((item) => item.stock <= 10)
                .sort((a, b) => a.stock - b.stock)
                .slice(0, 5)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0 hover:bg-white/[0.02] p-2 -mx-2 rounded-lg transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-sm text-slate-200">{item.name}</span>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">{item.sku} &middot; {item.category}</span>
                    </div>
                    <Badge variant={item.stock === 0 ? "destructive" : "secondary"} className={item.stock > 0 && item.stock <= 10 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 font-mono shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'font-mono'}>
                      {item.stock} unit
                    </Badge>
                  </div>
                ))}
              {items.filter((item) => item.stock <= 10).length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm font-mono uppercase tracking-widest">
                  Systems Nominal ✨
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
