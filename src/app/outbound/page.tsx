import React, { useState } from 'react';
import { useInventory } from '@/src/contexts/InventoryContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ArrowUpFromLine } from 'lucide-react';

export default function Outbound() {
  const { items, transactions, addTransaction } = useInventory();
  
  const [formData, setFormData] = useState({
    itemId: '',
    quantity: 1,
    notes: ''
  });

  const outboundTransactions = transactions.filter(t => t.type === 'keluar');
  const selectedItem = items.find(i => i.id === formData.itemId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.itemId) {
      toast.error('Pilih barang terlebih dahulu');
      return;
    }
    if (formData.quantity <= 0) {
      toast.error('Jumlah harus lebih dari 0');
      return;
    }
    
    if (selectedItem && formData.quantity > selectedItem.stock) {
      toast.error(`Stok tidak cukup! (Sisa: ${selectedItem.stock})`);
      return;
    }

    try {
      addTransaction({
        itemId: formData.itemId,
        type: 'keluar',
        quantity: formData.quantity,
        notes: formData.notes || 'Pengeluaran via UI',
        pic: 'Admin Z'
      });
      
      setFormData({ itemId: '', quantity: 1, notes: '' });
      toast.success('Barang keluar berhasil dicatat');
    } catch (err: any) {
      toast.error(err.message || 'Gagal mengurangi stok');
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -left-10 w-20 h-20 bg-rose-500/30 rounded-full blur-[40px] pointer-events-none" />
        <h1 className="text-3xl font-bold tracking-tight text-white font-heading flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <ArrowUpFromLine className="w-6 h-6 text-rose-400" />
          </div>
          Outbound Dispatch
        </h1>
        <p className="text-rose-400/80 font-mono text-sm mt-2 uppercase tracking-widest ml-[52px]">Deploy & Track Units</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 glass-panel h-fit glow-border relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none" />
          <CardContent className="p-6 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="item" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Select Authorization</Label>
                <select 
                  id="item" 
                  className="w-full flex h-10 rounded-md border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500/50 font-mono"
                  value={formData.itemId}
                  onChange={(e) => setFormData({...formData, itemId: e.target.value})}
                  required
                >
                  <option value="" disabled className="bg-slate-900">-- Choose Item Signature --</option>
                  {items.map(item => (
                    <option key={item.id} value={item.id} className="bg-slate-900">
                      [{item.sku}] {item.name}
                    </option>
                  ))}
                </select>
                {selectedItem && (
                  <p className="text-[10px] text-slate-500 text-right mt-1 font-mono uppercase tracking-widest">Available Reserve: <strong className="text-cyan-400">{selectedItem.stock}</strong></p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qty" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Quantum (Units)</Label>
                <Input 
                  id="qty" 
                  type="number" 
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                  className="bg-slate-900/50 border-white/10 text-white font-mono focus-visible:ring-rose-500/50" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Operation Notes</Label>
                <Input 
                  id="notes" 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="bg-slate-900/50 border-white/10 text-white focus-visible:ring-rose-500/50 placeholder:text-slate-600" 
                  placeholder="e.g. DISP-202X"
                />
              </div>
              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white mt-4 font-mono uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all h-10">
                Execute Process
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 glass-panel overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-slate-900/40">
            <h3 className="font-heading font-semibold text-white tracking-wide">Recent Outbound Sequences</h3>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-transparent">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-slate-400 w-[160px] font-mono text-[10px] uppercase tracking-widest">Timestamp</TableHead>
                  <TableHead className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Item Designation</TableHead>
                  <TableHead className="text-slate-400 text-center font-mono text-[10px] uppercase tracking-widest">Qty</TableHead>
                  <TableHead className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Log Notes</TableHead>
                  <TableHead className="text-slate-400 text-right font-mono text-[10px] uppercase tracking-widest">Operator</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outboundTransactions.length > 0 ? (
                  outboundTransactions.slice(0, 10).map((t) => {
                    const item = items.find(i => i.id === t.itemId);
                    return (
                      <TableRow key={t.id} className="border-white/5 hover:bg-white/[0.04] transition-colors">
                        <TableCell className="text-slate-400 text-[11px] font-mono">
                          {format(new Date(t.date), 'dd MMM yyyy, HH:mm')}
                        </TableCell>
                        <TableCell className="font-medium text-slate-200">
                          {item?.name || 'Unknown Entity'}
                        </TableCell>
                        <TableCell className="text-center font-mono text-rose-400 font-bold text-sm bg-rose-500/10 rounded my-1 px-2 inline-block ml-8">
                          -{t.quantity}
                        </TableCell>
                        <TableCell className="text-slate-400 text-xs max-w-[150px] truncate">
                          {t.notes}
                        </TableCell>
                        <TableCell className="text-right text-indigo-300 text-xs font-mono">
                          {t.pic}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center text-slate-500 font-mono text-xs uppercase tracking-widest">
                      Awaiting initial dispatch.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
