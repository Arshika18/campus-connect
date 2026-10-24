import React, { useState } from 'react';
import { HelpdeskRequest, RequestStatus, UserProfile } from '../types';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { CategoryIcon, getCategoryTheme } from './CategoryIcon';
import { formatDate, formatRelativeTime } from '../utils/dateFormatter';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  ThumbsUp,
  Share2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building2,
  FileText,
  Send,
  MessageSquare,
} from 'lucide-react';

interface RequestDetailsModalProps {
  request: HelpdeskRequest | null;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateStatus: (
    reqId: string,
    newStatus: RequestStatus,
    note?: string,
    internalNotes?: string
  ) => void;
  onToggleUpvote: (reqId: string, e: React.MouseEvent) => void;
}

export const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  request,
  onClose,
  currentUser,
  onUpdateStatus,
  onToggleUpvote,
}) => {
  if (!request) return null;

  const [selectedStatus, setSelectedStatus] = useState<RequestStatus>(request.status);
  const [statusNote, setStatusNote] = useState('');
  const [internalRemarks, setInternalRemarks] = useState(request.staffInternalNotes || '');
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const categoryTheme = getCategoryTheme(request.category);
  const hasUpvoted = request.upvotedBy?.includes(currentUser.email);
  const isStaff = currentUser.role === 'staff';

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      onUpdateStatus(
        request.id,
        selectedStatus,
        statusNote.trim() || `Status updated to ${selectedStatus} by ${currentUser.name}`,
        internalRemarks.trim()
      );
      setStatusNote('');
      setIsUpdating(false);
    }, 250);
  };

  const handleCopyId = () => {
    navigator.clipboard?.writeText(`${request.id} - ${request.title}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-auto rounded-3xl border border-white/10 bg-[#0d1424] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-white/5 bg-[#10192e]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap mb-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${categoryTheme.bg}`}
                >
                  <CategoryIcon category={request.category} size={14} />
                  <span>{request.category}</span>
                </span>

                <span className="font-mono text-sm font-bold text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-500/20">
                  {request.id}
                </span>

                <StatusBadge status={request.status} size="md" />
                <PriorityBadge priority={request.priority} />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {request.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyId}
                title="Copy Request ID & Info"
                className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Copy ticket info"
              >
                {copied ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 size={16} />
                  </span>
                ) : (
                  <Share2 size={16} />
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Main Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText size={14} className="text-purple-400" />
              Detailed Issue Description
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {request.description}
            </div>
          </div>

          {/* Location & Submitter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location Details */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin size={14} className="text-rose-400" />
                Campus Location
              </span>
              <p className="text-sm font-semibold text-white">{request.location}</p>
              {request.campusZone && (
                <div className="flex items-center gap-1 text-xs text-purple-300">
                  <Building2 size={13} />
                  <span>Campus Zone: {request.campusZone}</span>
                </div>
              )}
            </div>

            {/* Submitter Details */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User size={14} className="text-indigo-400" />
                Reported By
              </span>
              <p className="text-sm font-semibold text-white">{request.contactName}</p>
              <div className="flex flex-col gap-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail size={12} className="text-slate-500" /> {request.contactEmail}
                </span>
                {request.contactPhone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={12} className="text-slate-500" /> {request.contactPhone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Timestamps & Community Tracker */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-white/5 text-xs text-slate-400">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-500" />
                <span>Submitted: <strong className="text-slate-200">{formatDate(request.createdAt)}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-500" />
                <span>Updated: <strong className="text-slate-200">{formatRelativeTime(request.updatedAt)}</strong></span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => onToggleUpvote(request.id, e)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                hasUpvoted
                  ? 'bg-purple-600/30 border-purple-500 text-purple-300 ring-1 ring-purple-500'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ThumbsUp size={14} className={hasUpvoted ? 'text-purple-400 fill-purple-400' : ''} />
              <span>{request.upvotes} Student{request.upvotes !== 1 ? 's' : ''} also experiencing this</span>
            </button>
          </div>

          {/* Staff Status Update Console */}
          {isStaff ? (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-purple-950/20 border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <ShieldCheck size={18} />
                  <span>Staff Status & Resolution Console</span>
                </div>
                <span className="text-xs text-amber-400/80 font-mono">
                  Active Operator: {currentUser.name}
                </span>
              </div>

              <form onSubmit={handleStatusSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Change Request Status *
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as RequestStatus)}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900 border border-amber-500/30 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Timeline Progress Note (Visible to Student)
                    </label>
                    <input
                      type="text"
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      placeholder="e.g. Technician dispatched with replacement parts."
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Internal Staff Remarks / Vendor Reference (Staff Only)
                  </label>
                  <input
                    type="text"
                    value={internalRemarks}
                    onChange={(e) => setInternalRemarks(e.target.value)}
                    placeholder="e.g. Warranty PO# 9924-A. Contractor: FastFix Electric."
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-amber-950/50 transition-all disabled:opacity-50"
                  >
                    <Send size={15} />
                    <span>{isUpdating ? 'Saving...' : 'Update Status Now'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between">
              <div className="text-xs text-indigo-300">
                Are you a staff member looking to update this ticket?
              </div>
              <span className="text-xs text-slate-400 italic">
                Switch to Staff Portal in top-right menu to manage status
              </span>
            </div>
          )}

          {/* Activity & Status Timeline */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Clock size={14} className="text-indigo-400" />
              Status History & Activity Timeline ({request.timeline?.length || 1} events)
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {request.timeline && request.timeline.length > 0 ? (
                request.timeline.map((event, index) => {
                  const isLatest = index === request.timeline.length - 1;
                  return (
                    <div key={event.id || index} className="relative group">
                      {/* Timeline dot */}
                      <span
                        className={`absolute -left-6 top-1.5 h-4 w-4 rounded-full border-2 border-[#0d1424] flex items-center justify-center ${
                          event.status === 'Resolved'
                            ? 'bg-emerald-500'
                            : event.status === 'In Progress'
                              ? 'bg-indigo-500'
                              : 'bg-rose-500'
                        }`}
                      >
                        {isLatest && <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />}
                      </span>

                      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">
                              {event.changedBy}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                              {event.role === 'staff' ? 'Campus Staff' : 'Student'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <StatusBadge status={event.status} size="sm" />
                            <span className="text-[11px] text-slate-500 font-mono">
                              {formatDate(event.changedAt)}
                            </span>
                          </div>
                        </div>

                        {event.note && (
                          <p className="text-xs text-slate-300 pt-1 leading-relaxed flex items-start gap-1.5">
                            <MessageSquare size={12} className="text-slate-500 mt-0.5 shrink-0" />
                            <span>{event.note}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-xs text-slate-400 p-3">Ticket created and logged into system.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
