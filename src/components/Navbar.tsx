import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import {
  Sparkles,
  LayoutDashboard,
  PlusCircle,
  ListTodo,
  ShieldCheck,
  RotateCcw,
  Menu,
  X,
  GraduationCap,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentUser: UserProfile;
  onOpenLoginModal: () => void;
  onResetDemoData: () => void;
  totalOpenCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  currentUser,
  onOpenLoginModal,
  onResetDemoData,
  totalOpenCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isStaff = currentUser.role === 'staff';

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'submit',
      label: 'Report an Issue',
      icon: PlusCircle,
      highlight: true,
    },
    {
      id: 'my-requests',
      label: isStaff ? 'All Requests' : 'My Requests',
      icon: ListTodo,
    },
    {
      id: 'staff-console',
      label: 'Staff Console',
      icon: ShieldCheck,
      staffOnly: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090d16]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => onNavigate('dashboard')}
            role="button"
            tabIndex={0}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-0.5 shadow-lg shadow-purple-900/40 group-hover:scale-105 transition-transform">
              <div className="h-full w-full bg-[#0b0f19] rounded-[14px] flex items-center justify-center text-purple-400">
                <Sparkles size={20} className="text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  Campus<span className="text-purple-400">Pulse</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Helpdesk
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Campus Support & Facility Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              if (item.staffOnly && !isStaff) return null;
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    item.highlight
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-950/50'
                      : isActive
                        ? 'bg-white/10 text-white border border-white/15'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                  {item.id === 'my-requests' && totalOpenCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-mono">
                      {totalOpenCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section: User Profile & Portal Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reset Demo Data (Quick tool for evaluator) */}
            <button
              type="button"
              onClick={onResetDemoData}
              title="Reset to fresh demo requests"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/5 text-[11px] text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <RotateCcw size={13} />
              <span>Reset Data</span>
            </button>

            {/* Active User / Portal Switcher Badge */}
            <button
              type="button"
              onClick={onOpenLoginModal}
              className={`flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border transition-all duration-200 ${
                isStaff
                  ? 'border-amber-500/40 bg-amber-950/20 hover:bg-amber-950/40 text-amber-200 ring-1 ring-amber-500/30'
                  : 'border-purple-500/40 bg-purple-950/20 hover:bg-purple-950/40 text-purple-200 ring-1 ring-purple-500/30'
              }`}
            >
              <div
                className={`h-7 w-7 rounded-xl flex items-center justify-center font-bold text-xs text-white bg-gradient-to-tr ${currentUser.avatarBg || 'from-indigo-600 to-purple-600'} shrink-0`}
              >
                {currentUser.name.substring(0, 2).toUpperCase()}
              </div>

              <div className="hidden sm:block text-left min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded ${
                      isStaff
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {isStaff ? 'Staff' : 'Student'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate max-w-[130px]">
                  {currentUser.email}
                </p>
              </div>

              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0b0f19] px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            if (item.staffOnly && !isStaff) return null;
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.id === 'my-requests' && totalOpenCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-rose-500 text-white font-mono">
                    {totalOpenCount}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/5 flex gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenLoginModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5"
            >
              <GraduationCap size={15} /> Switch User / Portal
            </button>
            <button
              type="button"
              onClick={() => {
                onResetDemoData();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-xl bg-white/5 text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={15} /> Reset
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
