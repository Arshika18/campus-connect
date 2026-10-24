import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEMO_PROFILES } from '../services/storageService';
import {
  GraduationCap,
  ShieldCheck,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  Check,
  X,
  BadgeAlert,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>('student');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customEmail.includes('@')) {
      setError('Please provide a valid campus email address (e.g., name@campus.edu)');
      return;
    }
    const name = customName.trim() || customEmail.split('@')[0].replace('.', ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const newUser: UserProfile = {
      email: customEmail.trim().toLowerCase(),
      name: formattedName,
      role: activeTab,
      designationOrMajor:
        activeTab === 'student' ? 'Campus Student Member' : 'Campus Operations & Staff',
      studentOrStaffId:
        activeTab === 'student'
          ? `STU-${Math.floor(1000 + Math.random() * 9000)}`
          : `FAC-${Math.floor(100 + Math.random() * 900)}`,
      avatarBg:
        activeTab === 'student'
          ? 'from-indigo-600 to-purple-600'
          : 'from-amber-600 to-rose-600',
    };

    onSelectUser(newUser);
    onClose();
  };

  const studentProfiles = DEMO_PROFILES.filter((p) => p.role === 'student');
  const staffProfiles = DEMO_PROFILES.filter((p) => p.role === 'staff');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0e1424] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient header */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20 blur-2xl pointer-events-none" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8 relative">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
            <Sparkles size={14} />
            <span>Campus Identification & Portals</span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            Sign In with Campus Email ID
          </h2>
          <p className="mt-1 text-sm text-slate-400 leading-relaxed">
            Choose your portal or log in with your college mail ID to submit issues or manage campus facilities.
          </p>

          {/* Role Tabs */}
          <div className="mt-6 grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('student');
                setError('');
              }}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'student'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <GraduationCap size={18} />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('staff');
                setError('');
              }}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'staff'
                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-lg shadow-rose-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <ShieldCheck size={18} />
              <span>Staff & Operations</span>
            </button>
          </div>

          {/* Notice banner */}
          <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300">
            <BadgeAlert size={16} className="shrink-0 mt-0.5 text-purple-400" />
            <span>
              <strong>Demo Role Switcher:</strong> Switch between Student and Staff anytime. Your tickets and status changes persist across sessions in localStorage.
            </span>
          </div>

          {/* Preset 1-Click Quick Accounts */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              1-Click Demo {activeTab === 'student' ? 'Students' : 'Staff Members'}
            </p>

            <div className="space-y-2">
              {(activeTab === 'student' ? studentProfiles : staffProfiles).map((profile) => {
                const isSelected = currentUser.email === profile.email;
                return (
                  <button
                    key={profile.email}
                    type="button"
                    onClick={() => {
                      onSelectUser(profile);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all group ${
                      isSelected
                        ? 'border-purple-500 bg-purple-500/15 text-white ring-1 ring-purple-500/40'
                        : 'border-white/5 bg-slate-900/50 hover:bg-slate-800/60 hover:border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs text-white bg-gradient-to-tr ${profile.avatarBg || 'from-indigo-600 to-purple-600'}`}
                      >
                        {profile.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white group-hover:text-purple-300 transition-colors truncate">
                            {profile.name}
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                            {profile.studentOrStaffId}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {profile.email} • {profile.designationOrMajor}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 ml-3">
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                          <Check size={12} /> Active
                        </span>
                      ) : (
                        <span className="text-xs text-purple-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Use <ArrowRight size={12} />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Email ID Form */}
          <form onSubmit={handleCustomLogin} className="mt-6 pt-5 border-t border-white/5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Or Enter Any Custom Campus Email ID
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Your Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={activeTab === 'student' ? 'e.g. John Doe' : 'e.g. Officer Vance'}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Campus Email ID *</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => {
                      setCustomEmail(e.target.value);
                      setError('');
                    }}
                    placeholder={activeTab === 'student' ? 'student@campus.edu' : 'admin@campus.edu'}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="mb-3 text-xs text-rose-400 flex items-center gap-1.5">
                <BadgeAlert size={14} /> {error}
              </p>
            )}

            <button
              type="submit"
              className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-md ${
                activeTab === 'student'
                  ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/30'
                  : 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/30'
              }`}
            >
              <span>Continue as {activeTab === 'student' ? 'Student' : 'Staff'}</span>
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
