import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, HeartPulse, Wifi, Home, ChevronRight, X } from 'lucide-react';

export const CampusHotlines: React.FC = () => {
  const [selectedHotline, setSelectedHotline] = useState<string | null>(null);

  const hotlines = [
    {
      id: 'security',
      title: 'Campus Security & Emergency 24/7',
      phone: '+1 (555) 911-0001',
      extension: 'Ext. 9110',
      location: 'Main Gate Control Tower',
      icon: ShieldAlert,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      description: 'Physical threats, active security breaches, lost keycards, night escorts.',
    },
    {
      id: 'medical',
      title: 'Campus Health Center & Ambulance',
      phone: '+1 (555) 911-2222',
      extension: 'Ext. 2222',
      location: 'Student Health Wing, Ground Floor',
      icon: HeartPulse,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      description: 'First aid, sudden illness, allergic reactions, medical transport.',
    },
    {
      id: 'it',
      title: 'IT & Data Center NOC Helpline',
      phone: '+1 (555) 911-4040',
      extension: 'Ext. 4040',
      location: 'Science Complex B-02',
      icon: Wifi,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      description: 'Major Wi-Fi fiber cuts, campus portal outages, server access locks.',
    },
    {
      id: 'hostel',
      title: 'Hostel Resident Warden Control',
      phone: '+1 (555) 911-3333',
      extension: 'Ext. 3333',
      location: 'South Hostel Caretaker Office',
      icon: Home,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description: 'Room lockouts after midnight, electrical pipe bursts, heating failure.',
    },
  ];

  return (
    <>
      <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Campus Emergency & Rapid Assistance Lines
            </span>
          </div>
          <span className="text-xs text-slate-400">
            For life-threatening or instant hazards, call the direct desk
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {hotlines.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedHotline(item.id)}
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-slate-800/40 hover:bg-slate-800/80 hover:border-white/10 transition-all text-left group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-2 rounded-lg border ${item.color} shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[11px] font-mono text-purple-400 font-medium">
                      {item.phone}
                    </p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-500 group-hover:text-white transition-colors shrink-0 ml-1" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Modal if clicked */}
      {selectedHotline && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSelectedHotline(null)}
        >
          {(() => {
            const item = hotlines.find((h) => h.id === selectedHotline)!;
            const Icon = item.icon;
            return (
              <div
                className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0e1424] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedHotline(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${item.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.location}</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                  {item.description}
                </p>

                <div className="mt-4 p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-300 font-medium">Direct Telephone Number</p>
                    <p className="text-lg font-mono font-bold text-white mt-0.5">{item.phone}</p>
                    <p className="text-[11px] text-slate-400">{item.extension}</p>
                  </div>
                  <a
                    href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-950/50"
                  >
                    <PhoneCall size={14} /> Call Now
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </>
  );
};
