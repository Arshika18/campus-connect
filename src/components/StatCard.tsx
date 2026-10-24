import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  colorScheme: 'purple' | 'coral' | 'blue' | 'emerald';
  activeFilter?: boolean;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorScheme,
  activeFilter = false,
  onClick,
}) => {
  const getTheme = () => {
    switch (colorScheme) {
      case 'purple':
        return {
          border: 'border-purple-500/30 hover:border-purple-500/60',
          bg: 'bg-gradient-to-br from-purple-950/40 via-purple-900/10 to-slate-900/80',
          iconBg: 'bg-purple-500/20 text-purple-300 ring-1 ring-purple-400/30',
          accent: 'text-purple-400',
          activeRing: 'ring-2 ring-purple-500 bg-purple-950/60',
          indicator: 'bg-purple-500',
        };
      case 'coral':
        return {
          border: 'border-rose-500/30 hover:border-rose-500/60',
          bg: 'bg-gradient-to-br from-rose-950/40 via-rose-900/10 to-slate-900/80',
          iconBg: 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/30',
          accent: 'text-rose-400',
          activeRing: 'ring-2 ring-rose-500 bg-rose-950/60',
          indicator: 'bg-rose-500',
        };
      case 'blue':
        return {
          border: 'border-indigo-500/30 hover:border-indigo-500/60',
          bg: 'bg-gradient-to-br from-indigo-950/40 via-indigo-900/10 to-slate-900/80',
          iconBg: 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30',
          accent: 'text-indigo-400',
          activeRing: 'ring-2 ring-indigo-500 bg-indigo-950/60',
          indicator: 'bg-indigo-500',
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-500/60',
          bg: 'bg-gradient-to-br from-emerald-950/40 via-emerald-900/10 to-slate-900/80',
          iconBg: 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30',
          accent: 'text-emerald-400',
          activeRing: 'ring-2 ring-emerald-500 bg-emerald-950/60',
          indicator: 'bg-emerald-500',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 backdrop-blur-md cursor-pointer text-left group ${
        theme.border
      } ${theme.bg} ${
        activeFilter
          ? theme.activeRing + ' shadow-lg transform scale-[1.02]'
          : 'hover:translate-y-[-2px] hover:shadow-xl shadow-slate-950/50'
      }`}
    >
      {/* Subtle background glow */}
      <div
        className={`absolute -top-12 -right-12 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40 ${theme.indicator}`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
              {value}
            </span>
            <span className="text-xs text-slate-400">tickets</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl ${theme.iconBg} transition-transform group-hover:scale-110 duration-200`}>
          <Icon size={22} />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-2.5">
        <span className="truncate">{subtitle}</span>
        {activeFilter && (
          <span className={`text-[11px] font-semibold ${theme.accent}`}>
            Filtered
          </span>
        )}
      </div>
    </div>
  );
};
