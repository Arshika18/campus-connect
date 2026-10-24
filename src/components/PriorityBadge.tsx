import React from 'react';
import { Priority } from '../types';
import { Flame, ShieldAlert, ArrowUp, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'md',
}) => {
  let styles = '';
  let Icon = ArrowUp;

  switch (priority) {
    case 'Urgent':
      styles = 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-950/40';
      Icon = Flame;
      break;
    case 'High':
      styles = 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-950/40';
      Icon = ShieldAlert;
      break;
    case 'Medium':
      styles = 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-blue-950/40';
      Icon = ArrowUp;
      break;
    case 'Low':
    default:
      styles = 'bg-slate-700/40 text-slate-300 border-slate-600/40';
      Icon = ArrowDown;
      break;
  }

  const sizeClasses =
    size === 'sm' ? 'px-2 py-0.5 text-[11px] gap-1' : 'px-2.5 py-1 text-xs gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border tracking-tight ${sizeClasses} ${styles}`}
    >
      <Icon size={size === 'sm' ? 12 : 13} />
      <span>{priority}</span>
    </span>
  );
};
