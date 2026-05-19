import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowDownToLine, ArrowUpFromLine, Package, Layers, Settings, Menu, Sparkles, Type, Component, LineChart, TextCursorInput } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  const location = useLocation();
  const navGroups = [
    {
      title: "Core System",
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Inventory Data', icon: Package, path: '/inventory' },
        { name: 'Inbound Log', icon: ArrowDownToLine, path: '/inbound' },
        { name: 'Outbound Log', icon: ArrowUpFromLine, path: '/outbound' },
      ]
    },
    {
      title: "Design System",
      items: [
        { name: 'Overview', icon: Sparkles, path: '/uikit' },
        { name: 'Typography', icon: Type, path: '/uikit/typography' },
        { name: 'Cards', icon: Component, path: '/uikit/cards' },
        { name: 'Charts', icon: LineChart, path: '/uikit/charts' },
        { name: 'Forms & Inputs', icon: TextCursorInput, path: '/uikit/forms' },
      ]
    }
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col relative z-20 w-full pl-4 py-4 pr-0">
      <div className="glass-panel h-full rounded-3xl flex flex-col pt-8 pb-4 px-4 overflow-hidden glow-border relative">
        <div className="flex items-center gap-3 mb-8 px-2 flex-shrink-0">
          <div className="bg-gradient-to-br from-cyan-400 to-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold font-heading tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent block leading-none">NEXUS</span>
            <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase">System</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-6 overflow-y-auto hide-scrollbar pb-4 pr-2">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="px-4 text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className="block relative group"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 rounded-xl border border-cyan-500/20"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className={`relative flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 z-10 ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}>
                        <item.icon className={`mr-3 h-4 w-4 transition-transform duration-300 ${isActive ? 'text-cyan-400 scale-110' : 'opacity-70 group-hover:scale-110'}`} />
                        {item.name}
                      </div>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto px-4 py-4 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-white/10 relative overflow-hidden">
              <span className="text-sm font-bold text-white relative z-10">AX</span>
              <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent')] bg-cover opacity-50 mix-blend-overlay"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Alex Admin</p>
              <p className="text-[11px] text-cyan-400 font-mono">ID: 884-X9</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Ambient Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-72 lg:w-80 flex-shrink-0 z-20">
        <SidebarContent />
      </div>

      <div className="flex w-full flex-1 flex-col overflow-hidden relative z-10">
        {/* Mobile Header */}
        <header className="flex h-20 items-center justify-between px-6 md:hidden glass-panel m-4 rounded-2xl glow-border">
           <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-400 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold font-heading bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">NEXUS</span>
          </div>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <SheetContent side="left" className="w-80 p-0 border-r border-white/10 bg-slate-950/90 backdrop-blur-2xl">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 lg:p-10 hide-scrollbar scroll-smooth">
          <div className="mx-auto w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
