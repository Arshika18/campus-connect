import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Clock, Shield, Flame, CheckCircle2 } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How fast do campus maintenance teams respond to submitted requests?',
      a: 'Urgent issues (gas leaks, power outages, active water bursts) are dispatched immediately within 15–30 minutes by on-duty facilities engineers. High-priority classroom equipment tickets are addressed within 1–2 hours. Standard maintenance requests are typically resolved within 24 to 48 hours.',
      icon: Clock,
    },
    {
      q: 'How does the "+1 Me Too" community upvote feature work?',
      a: 'When multiple students upvote an existing ticket (for example, Wi-Fi outage in the Library), the campus dispatch algorithm escalates its priority in the Staff Console. This prevents duplicate ticket spam while signaling high real-time student impact.',
      icon: CheckCircle2,
    },
    {
      q: 'What should I do if there is an immediate safety or electrical hazard?',
      a: 'Do not rely solely on a standard ticket! Call the Campus Emergency Hotline directly at Ext. 9110 or +1 (555) 911-0001, which rings 24/7 at the Main Gate Security Command Center.',
      icon: Flame,
    },
    {
      q: 'Can I track the ticket without logging in every time?',
      a: 'Yes! Every ticket has a permanent unique Request ID (like REQ-2026-1042). You can enter this ID into the search bar at any time to instantly view its live status and technician notes.',
      icon: Shield,
    },
  ];

  return (
    <div className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
      <div className="flex items-center gap-2.5 text-purple-400 font-semibold text-xs uppercase tracking-wider mb-2">
        <HelpCircle size={16} />
        <span>Campus Help & Knowledge Base</span>
      </div>
      <h3 className="text-xl font-bold text-white tracking-tight">
        Frequently Asked Campus Questions
      </h3>
      <p className="mt-1 text-xs text-slate-400 leading-relaxed max-w-xl">
        Quick guidance on reporting protocols, average resolution windows, and student support.
      </p>

      <div className="mt-6 space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const Icon = faq.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/5 bg-slate-800/30 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-purple-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/20">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
