import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let borderClass = 'border-purple-500/30';
        let bgClass = 'bg-slate-900/95';
        let Icon = Info;
        let iconColor = 'text-purple-400';

        switch (toast.type) {
          case 'success':
            borderClass = 'border-emerald-500/40 shadow-emerald-950/40';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-400';
            break;
          case 'error':
            borderClass = 'border-rose-500/40 shadow-rose-950/40';
            Icon = XCircle;
            iconColor = 'text-rose-400';
            break;
          case 'warning':
            borderClass = 'border-amber-500/40 shadow-amber-950/40';
            Icon = AlertTriangle;
            iconColor = 'text-amber-400';
            break;
          case 'info':
          default:
            borderClass = 'border-indigo-500/40 shadow-indigo-950/40';
            Icon = Info;
            iconColor = 'text-indigo-400';
            break;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 ${bgClass} ${borderClass}`}
          >
            <div className={`mt-0.5 shrink-0 ${iconColor}`}>
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white tracking-tight">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="mt-0.5 text-xs text-slate-300 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
