import React, { useState } from 'react';
import { useInventory } from '@/src/contexts/InventoryContext';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function InventoryList() {
  const { items, addItem } = useInventory();
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    sku: '',
    name: '',
    category: '',
    stock: 0,
    price: 0
  });

  const filteredItems = items.filter(
    item => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(newItem);
    setNewItem({ sku: '', name: '', category: '', stock: 0, price: 0 });
    setIsAddOpen(false);
    toast.success('Barang berhasil ditambahkan');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="relative">
          <div className="absolute -left-10 w-20 h-20 bg-indigo-500/30 rounded-full blur-[40px] pointer-events-none" />
          <h1 className="text-3xl font-bold tracking-tight text-white font-heading">Inventory Database</h1>
          <p className="text-indigo-400/80 font-mono text-sm mt-1 uppercase tracking-widest">Master Item Registry</p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger
            render={
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all uppercase tracking-widest font-mono text-xs h-10 px-4">
                <Plus className="w-4 h-4 mr-2" />
                Register Item
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[425px] glass-panel border-white/10 text-slate-50">
            <DialogHeader>
              <DialogTitle className="text-white font-heading text-xl">Register New Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="sku" className="text-slate-400 font-mono text-xs uppercase tracking-widest">SKU Code</Label>
                <Input id="sku" required value={newItem.sku} onChange={(e) => setNewItem({...newItem, sku: e.target.value})} className="bg-slate-900/50 border-white/10 text-white font-mono placeholder:text-slate-600 focus-visible:ring-indigo-500" placeholder="SKU-XXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Item Name</Label>
                <Input id="name" required value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="bg-slate-900/50 border-white/10 text-white focus-visible:ring-indigo-500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Category</Label>
                <Input id="category" required value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} className="bg-slate-900/50 border-white/10 text-white focus-visible:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Initial Stock</Label>
                  <Input id="stock" type="number" required min="0" value={newItem.stock} onChange={(e) => setNewItem({...newItem, stock: parseInt(e.target.value) || 0})} className="bg-slate-900/50 border-white/10 text-white font-mono focus-visible:ring-indigo-500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-slate-400 font-mono text-xs uppercase tracking-widest">Unit Price</Label>
                  <Input id="price" type="number" required min="0" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: parseInt(e.target.value) || 0})} className="bg-slate-900/50 border-white/10 text-white font-mono focus-visible:ring-indigo-500" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white mt-4 font-mono uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(79,70,229,0.3)]">Save Item To Matrix</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-panel overflow-hidden glow-border">
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-500" />
          <Input 
            placeholder="Search database signature..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 text-sm text-white placeholder:text-slate-500 h-8 font-mono"
          />
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-900/40">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-400 w-[120px] font-mono text-[10px] uppercase tracking-widest">SKU</TableHead>
                <TableHead className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Designation</TableHead>
                <TableHead className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Class</TableHead>
                <TableHead className="text-slate-400 text-right font-mono text-[10px] uppercase tracking-widest">Value (IDR)</TableHead>
                <TableHead className="text-slate-400 text-right font-mono text-[10px] uppercase tracking-widest">Units</TableHead>
                <TableHead className="text-slate-400 text-right font-mono text-[10px] uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.04] transition-colors">
                    <TableCell className="font-mono text-xs text-indigo-300">{item.sku}</TableCell>
                    <TableCell className="font-medium text-slate-100">{item.name}</TableCell>
                    <TableCell className="text-slate-400 text-xs">
                      <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] uppercase tracking-widest">{item.category}</span>
                    </TableCell>
                    <TableCell className="text-right text-cyan-300 font-mono text-sm">
                      {item.price.toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell className="text-right text-white font-mono text-lg font-bold">
                      {item.stock}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.stock === 0 ? (
                        <Badge variant="destructive" className="bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20 font-mono uppercase tracking-widest text-[10px] shadow-[0_0_10px_rgba(251,113,133,0.2)]">Depleted</Badge>
                      ) : item.stock <= 10 ? (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20 font-mono uppercase tracking-widest text-[10px] shadow-[0_0_10px_rgba(245,158,11,0.2)]">Warning</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 font-mono uppercase tracking-widest text-[10px] shadow-[0_0_10px_rgba(52,211,153,0.2)]">Optimal</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-slate-500 font-mono tracking-widest uppercase text-xs">
                    No matching signatures found in database.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
