import React from 'react';
import { RequestStatus } from '../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: RequestStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  let colorStyles = '';
  let dotStyles = '';
  let Icon = AlertCircle;

  switch (status) {
    case 'Open':
      colorStyles =
        'bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.15)]';
      dotStyles = 'bg-rose-400 animate-pulse';
      Icon = AlertCircle;
      break;
    case 'In Progress':
      colorStyles =
        'bg-indigo-500/15 text-indigo-300 border border-indigo-500/35 shadow-[0_0_12px_rgba(99,102,241,0.2)]';
      dotStyles = 'bg-indigo-400 animate-ping';
      Icon = Clock;
      break;
    case 'Resolved':
      colorStyles =
        'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]';
      dotStyles = 'bg-emerald-400';
      Icon = CheckCircle2;
      break;
  }

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs gap-1.5'
      : size === 'lg'
        ? 'px-3.5 py-1.5 text-sm gap-2 font-semibold'
        : 'px-2.5 py-1 text-xs gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-wide transition-all ${sizeClasses} ${colorStyles}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${dotStyles}`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status === 'Open'
              ? 'bg-rose-500'
              : status === 'In Progress'
                ? 'bg-indigo-400'
                : 'bg-emerald-500'
          }`}
        />
      </span>
      {showIcon && <Icon size={size === 'lg' ? 15 : 13} className="shrink-0" />}
      <span>{status}</span>
    </span>
  );
};
