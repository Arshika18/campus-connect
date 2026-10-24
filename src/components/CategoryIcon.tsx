import React from 'react';
import {
  Zap,
  Droplets,
  Wifi,
  FlaskConical,
  Sparkles,
  BedDouble,
  Bus,
  UtensilsCrossed,
  HelpCircle,
} from 'lucide-react';
import { Category } from '../types';

interface CategoryIconProps {
  category: Category;
  className?: string;
  size?: number;
}

export const getCategoryTheme = (category: Category) => {
  switch (category) {
    case 'Electrical':
      return {
        bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        glow: 'shadow-amber-500/20',
        color: '#f59e0b',
        label: 'Electrical',
      };
    case 'Plumbing':
      return {
        bg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
        glow: 'shadow-cyan-500/20',
        color: '#06b6d4',
        label: 'Plumbing',
      };
    case 'Wi-Fi / Internet':
      return {
        bg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
        glow: 'shadow-indigo-500/20',
        color: '#818cf8',
        label: 'Wi-Fi / Internet',
      };
    case 'Classroom / Laboratory':
      return {
        bg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
        glow: 'shadow-purple-500/20',
        color: '#c084fc',
        label: 'Classroom / Lab',
      };
    case 'Cleaning and Maintenance':
      return {
        bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        glow: 'shadow-emerald-500/20',
        color: '#34d399',
        label: 'Cleaning',
      };
    case 'Hostel':
      return {
        bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        glow: 'shadow-rose-500/20',
        color: '#fb7185',
        label: 'Hostel',
      };
    case 'Transport':
      return {
        bg: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
        glow: 'shadow-sky-500/20',
        color: '#38bdf8',
        label: 'Transport',
      };
    case 'Canteen':
      return {
        bg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
        glow: 'shadow-orange-500/20',
        color: '#fb923c',
        label: 'Canteen',
      };
    case 'Other':
    default:
      return {
        bg: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
        glow: 'shadow-slate-500/20',
        color: '#94a3b8',
        label: 'Other',
      };
  }
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  className = '',
  size = 18,
}) => {
  switch (category) {
    case 'Electrical':
      return <Zap size={size} className={className} />;
    case 'Plumbing':
      return <Droplets size={size} className={className} />;
    case 'Wi-Fi / Internet':
      return <Wifi size={size} className={className} />;
    case 'Classroom / Laboratory':
      return <FlaskConical size={size} className={className} />;
    case 'Cleaning and Maintenance':
      return <Sparkles size={size} className={className} />;
    case 'Hostel':
      return <BedDouble size={size} className={className} />;
    case 'Transport':
      return <Bus size={size} className={className} />;
    case 'Canteen':
      return <UtensilsCrossed size={size} className={className} />;
    case 'Other':
    default:
      return <HelpCircle size={size} className={className} />;
  }
};
