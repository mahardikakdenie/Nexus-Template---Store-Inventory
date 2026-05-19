import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function UIKit() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">List Component UI Kit</h1>
        <p className="text-zinc-400 mt-1">Daftar komponen antarmuka yang digunakan dalam aplikasi ini.</p>
      </div>

      <div className="grid gap-6">
        {/* Buttons */}
        <Card className="border-none bg-zinc-900 shadow-none ring-1 ring-white/10 dark">
          <CardHeader>
            <CardTitle className="text-zinc-50">Buttons & Actions</CardTitle>
            <CardDescription className="text-zinc-400">Tombol dan komponen notifikasi (Toast).</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline" className="border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-800">Outline</Button>
            <Button variant="ghost" className="text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50">Ghost</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Brand Primary</Button>
            <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10" onClick={() => toast.success('Sukses dicatat!')}>Test Success Toast</Button>
            <Button variant="outline" className="border-rose-500/50 text-rose-400 hover:bg-rose-500/10" onClick={() => toast.error('Gagal memproses aksi!')}>Test Error Toast</Button>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card className="border-none bg-zinc-900 shadow-none ring-1 ring-white/10 dark">
          <CardHeader>
            <CardTitle className="text-zinc-50">Inputs & Form Elements</CardTitle>
            <CardDescription className="text-zinc-400">Input teks untuk pengisian data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-sm">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input type="email" id="email" placeholder="Email admin" className="bg-zinc-950 border-zinc-800 text-zinc-100" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="search" className="text-zinc-300">Search</Label>
              <Input type="text" id="search" placeholder="Pencarian..." className="bg-zinc-800 border-zinc-700 text-zinc-100" />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="border-none bg-zinc-900 shadow-none ring-1 ring-white/10 dark">
          <CardHeader>
            <CardTitle className="text-zinc-50">Badges</CardTitle>
            <CardDescription className="text-zinc-400">Label status dan kategori.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline" className="text-zinc-300 border-zinc-700">Outline</Badge>
            <Badge variant="destructive" className="bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30">Stock Kosong</Badge>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Stock Aman</Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Stock Menipis</Badge>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="border-none bg-zinc-900 shadow-none ring-1 ring-white/10 dark">
          <CardHeader>
            <CardTitle className="text-zinc-50">Tabs</CardTitle>
            <CardDescription className="text-zinc-400">Navigasi konten sejajar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-[400px]">
              <TabsList className="bg-zinc-950 border border-zinc-800">
                <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-50 text-zinc-400">Overview</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-50 text-zinc-400">Analytics</TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-50 text-zinc-400">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="text-sm text-zinc-400 mt-4 p-4 border border-zinc-800 rounded-md">
                Konten Overview tab di sini.
              </TabsContent>
              <TabsContent value="analytics" className="text-sm text-zinc-400 mt-4 p-4 border border-zinc-800 rounded-md">
                Konten Analytics tab di sini.
              </TabsContent>
              <TabsContent value="reports" className="text-sm text-zinc-400 mt-4 p-4 border border-zinc-800 rounded-md">
                Konten Reports tab di sini.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card className="border-none bg-zinc-900 shadow-none ring-1 ring-white/10 dark">
          <CardHeader>
            <CardTitle className="text-zinc-50">Typography</CardTitle>
            <CardDescription className="text-zinc-400">Sistem teks aplikasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-zinc-100">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
              <p className="text-sm text-zinc-500">text-4xl font-extrabold</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight transition-colors">Heading 2</h2>
              <p className="text-sm text-zinc-500">text-3xl font-semibold</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Heading 3</h3>
              <p className="text-sm text-zinc-500">text-2xl font-semibold</p>
            </div>
            <div>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Ini adalah paragraf standar. Tipografi ini dirancang untuk membaca dengan nyaman, menggunakan warna teks kontras yang cukup dan line-height optimal. <br/>
                <b>Bold text</b> and <i>italic text</i>.
              </p>
              <p className="text-sm text-zinc-500 mt-1">leading-7</p>
            </div>
            <div className="font-mono text-sm bg-zinc-950 p-4 border border-zinc-800 rounded-md w-fit">
              <span className="text-indigo-400">const</span> <span className="text-cyan-400">brand</span> = <span className="text-emerald-400">'Nexus Inv'</span>;
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
