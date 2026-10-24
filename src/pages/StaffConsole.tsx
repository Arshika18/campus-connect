import React, { useState, useMemo } from 'react';
import { HelpdeskRequest, RequestStatus, Category, UserProfile } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { CategoryIcon, getCategoryTheme } from '../components/CategoryIcon';
import { formatDate, formatRelativeTime } from '../utils/dateFormatter';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Send,
  Building2,
  MapPin,
  User,
  ArrowRight,
  TrendingUp,
  RotateCw,
} from 'lucide-react';

interface StaffConsoleProps {
  requests: HelpdeskRequest[];
  currentUser: UserProfile;
  onUpdateStatus: (
    reqId: string,
    newStatus: RequestStatus,
    note?: string,
    internalNotes?: string
  ) => void;
  onSelectRequest: (req: HelpdeskRequest) => void;
  onSwitchToStudentView: () => void;
}

export const StaffConsole: React.FC<StaffConsoleProps> = ({
  requests,
  currentUser,
  onUpdateStatus,
  onSelectRequest,
  onSwitchToStudentView,
}) => {
  const [selectedRequestId, setSelectedRequestId] = useState<string>(
    requests[0]?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');

  // Form states for the active ticket in inspector panel
  const [formStatus, setFormStatus] = useState<RequestStatus>('In Progress');
  const [formNote, setFormNote] = useState('');
  const [formInternalNotes, setFormInternalNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Active selected request
  const activeRequest = useMemo(() => {
    return requests.find((r) => r.id === selectedRequestId) || requests[0] || null;
  }, [requests, selectedRequestId]);

  // Sync form status when activeRequest changes
  React.useEffect(() => {
    if (activeRequest) {
      setFormStatus(activeRequest.status);
      setFormInternalNotes(activeRequest.staffInternalNotes || '');
      setFormNote('');
    }
  }, [activeRequest?.id, activeRequest?.status]);

  // Statistics
  const total = requests.length;
  const openCount = requests.filter((r) => r.status === 'Open').length;
  const inProgressCount = requests.filter((r) => r.status === 'In Progress').length;
  const resolvedCount = requests.filter((r) => r.status === 'Resolved').length;
  const resolutionRate = total > 0 ? Math.round((resolvedCount / total) * 100) : 100;

  // Filtered requests list
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (statusFilter !== 'All' && r.status !== statusFilter) return false;
      if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.contactName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [requests, statusFilter, categoryFilter, searchQuery]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Request ID', 'Title', 'Category', 'Location', 'Priority', 'Status', 'Contact Name', 'Contact Email', 'Created At'];
    const rows = requests.map((r) => [
      `"${r.id}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.category}"`,
      `"${r.location.replace(/"/g, '""')}"`,
      `"${r.priority}"`,
      `"${r.status}"`,
      `"${r.contactName}"`,
      `"${r.contactEmail}"`,
      `"${r.createdAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `campus_helpdesk_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRequest) return;

    setIsSaving(true);
    setTimeout(() => {
      onUpdateStatus(
        activeRequest.id,
        formStatus,
        formNote.trim() || `Status updated to ${formStatus} by ${currentUser.name}`,
        formInternalNotes.trim()
      );
      setFormNote('');
      setIsSaving(false);
    }, 250);
  };

  // Quick 1-click status actions
  const handleQuickStatus = (status: RequestStatus) => {
    if (!activeRequest) return;
    setIsSaving(true);
    setTimeout(() => {
      onUpdateStatus(
        activeRequest.id,
        status,
        `Quick status update: marked as ${status} by ${currentUser.name}`,
        formInternalNotes.trim()
      );
      setFormStatus(status);
      setIsSaving(false);
    }, 200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Staff Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#1c1817] via-[#151724] to-[#0c101c] shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <ShieldCheck size={16} />
            <span>Campus Facilities & Incident Command</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">
            Staff Operations Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Logged in as <strong>{currentUser.name}</strong> ({currentUser.email} • {currentUser.designationOrMajor}). Manage campus work orders and publish live status updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
          >
            <Download size={14} />
            <span>Export CSV Report</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToStudentView}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-xs font-semibold border border-purple-500/40 transition-colors"
          >
            <span>Preview Student Portal</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#0f172a] border border-white/5 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Backlog</span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-white">{total}</div>
          <span className="text-[11px] text-slate-400">All recorded campus tickets</span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300">Open Tickets</span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-rose-400">{openCount}</div>
          <span className="text-[11px] text-slate-400">Awaiting technician pickup</span>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">In Progress</span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-400">{inProgressCount}</div>
          <span className="text-[11px] text-slate-400">Under active repair work</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">Resolved Ratio</span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">{resolutionRate}%</div>
          <span className="text-[11px] text-slate-400">{resolvedCount} resolved issues</span>
        </div>
      </div>

      {/* Main Split Console: List & Detailed Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tickets Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search & Filters */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-900/70 border border-white/5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by ID, title, room..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Wi-Fi / Internet">Wi-Fi / Internet</option>
                <option value="Classroom / Laboratory">Classroom / Lab</option>
                <option value="Cleaning and Maintenance">Cleaning</option>
                <option value="Hostel">Hostel</option>
                <option value="Transport">Transport</option>
                <option value="Canteen">Canteen</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Queue List */}
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredRequests.map((req) => {
              const isSelected = activeRequest?.id === req.id;
              const categoryTheme = getCategoryTheme(req.category);

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequestId(req.id)}
                  role="button"
                  tabIndex={0}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/30 ring-1 ring-purple-500/50 shadow-lg'
                      : 'border-white/5 bg-[#0e1526]/70 hover:bg-[#121c33] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-purple-400">
                      {req.id}
                    </span>
                    <StatusBadge status={req.status} size="sm" />
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {req.title}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[150px]">{req.location}</span>
                    <PriorityBadge priority={req.priority} size="sm" />
                  </div>
                </div>
              );
            })}

            {filteredRequests.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-900/40 rounded-2xl border border-white/5">
                No tickets match current filters.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Management Inspector (7 cols) */}
        <div className="lg:col-span-7">
          {activeRequest ? (
            <div className="rounded-3xl border border-white/10 bg-[#0d1424] p-6 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="font-mono text-sm font-bold text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
                      {activeRequest.id}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300">
                      {activeRequest.category}
                    </span>
                    <PriorityBadge priority={activeRequest.priority} size="sm" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {activeRequest.title}
                  </h2>
                </div>

                <div className="text-right shrink-0">
                  <StatusBadge status={activeRequest.status} size="md" />
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">
                    Updated {formatRelativeTime(activeRequest.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Student Report Description
                </span>
                <p className="mt-1 text-xs sm:text-sm text-slate-200 bg-slate-900/70 p-3.5 rounded-xl border border-white/5 leading-relaxed">
                  {activeRequest.description}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/40 p-3.5 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-400 block">Reported By</span>
                  <span className="text-white font-semibold">{activeRequest.contactName}</span>
                  <span className="text-slate-400 block text-[11px]">{activeRequest.contactEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Location & Zone</span>
                  <span className="text-white font-semibold">{activeRequest.location}</span>
                  <span className="text-purple-300 block text-[11px]">{activeRequest.campusZone || 'Campus Wide'}</span>
                </div>
              </div>

              {/* Status Update Form (Staff Command) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-purple-950/20 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <ShieldCheck size={18} />
                    <span>Update Status & Dispatch Notes</span>
                  </div>

                  {/* 1-click quick buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuickStatus('In Progress')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30"
                    >
                      + In Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickStatus('Resolved')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                    >
                      + Resolved
                    </button>
                  </div>
                </div>

                <form onSubmit={handleStatusSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Select Status *
                      </label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as RequestStatus)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-amber-500/40 text-white focus:outline-none focus:border-amber-400 font-semibold"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Assigned Operator
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`${currentUser.name} (Active)`}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900/50 border border-white/5 text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Student-Facing Timeline Progress Message
                    </label>
                    <input
                      type="text"
                      value={formNote}
                      onChange={(e) => setFormNote(e.target.value)}
                      placeholder="e.g. Electrician on-site at Room 204. Capacitor unit replaced."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Internal Staff Notes / Part PO Numbers (Private to Facilities)
                    </label>
                    <input
                      type="text"
                      value={formInternalNotes}
                      onChange={(e) => setFormInternalNotes(e.target.value)}
                      placeholder="e.g. Spare fan from Warehouse B; billed to Dean Dept Acct #4410."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">
                      Changes synchronize immediately across student portal.
                    </span>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg shadow-amber-950/40 transition-all disabled:opacity-50"
                    >
                      <Send size={13} />
                      <span>{isSaving ? 'Saving...' : 'Update Status'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Status History Timeline */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
                  Status History ({activeRequest.timeline?.length || 1} logged changes)
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {activeRequest.timeline?.map((ev, idx) => (
                    <div
                      key={ev.id || idx}
                      className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between text-xs gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <StatusBadge status={ev.status} size="sm" />
                        <span className="text-slate-300 font-medium truncate">{ev.changedBy}</span>
                        {ev.note && (
                          <span className="text-slate-400 text-[11px] truncate hidden sm:inline">
                            — {ev.note}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono shrink-0">
                        {formatDate(ev.changedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-slate-900/30 rounded-3xl border border-white/5">
              Select an issue from the queue to inspect and update status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
