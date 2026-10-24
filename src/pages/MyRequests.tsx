import React, { useState, useMemo } from 'react';
import { HelpdeskRequest, RequestStatus, Category, UserProfile } from '../types';
import { RequestCard } from '../components/RequestCard';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { CategoryIcon } from '../components/CategoryIcon';
import { formatDate, formatRelativeTime } from '../utils/dateFormatter';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  MapPin,
  Calendar,
  User,
  PlusCircle,
  ThumbsUp,
  Inbox,
  X,
} from 'lucide-react';

interface MyRequestsProps {
  requests: HelpdeskRequest[];
  currentUser: UserProfile;
  onSelectRequest: (req: HelpdeskRequest) => void;
  onToggleUpvote: (reqId: string, e: React.MouseEvent) => void;
  onOpenSubmit: () => void;
}

export const MyRequests: React.FC<MyRequestsProps> = ({
  requests,
  currentUser,
  onSelectRequest,
  onToggleUpvote,
  onOpenSubmit,
}) => {
  const [scope, setScope] = useState<'mine' | 'all'>('mine');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      // Scope
      if (scope === 'mine' && r.contactEmail?.toLowerCase() !== currentUser.email.toLowerCase()) {
        return false;
      }
      // Status
      if (statusFilter !== 'All' && r.status !== statusFilter) return false;
      // Category
      if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
      // Search
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
  }, [requests, scope, currentUser.email, statusFilter, categoryFilter, searchQuery]);

  const categories: Category[] = [
    'Electrical',
    'Plumbing',
    'Wi-Fi / Internet',
    'Classroom / Laboratory',
    'Cleaning and Maintenance',
    'Hostel',
    'Transport',
    'Canteen',
    'Other',
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Scope Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">
            {scope === 'mine' ? 'My Reported Incidents' : 'All Campus Requests'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track status updates, inspection notes, and technician timeline in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Scope Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10">
            <button
              type="button"
              onClick={() => setScope('mine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scope === 'mine'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              My Requests
            </button>
            <button
              type="button"
              onClick={() => setScope('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scope === 'all'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Campus Issues
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'table' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenSubmit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-950/40 transition-all"
          >
            <PlusCircle size={15} />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, keyword, or room location..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open Only</option>
            <option value="In Progress">In Progress Only</option>
            <option value="Resolved">Resolved Only</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Rendering: Table or Card Grid */}
      {filtered.length > 0 ? (
        viewMode === 'table' ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d1424] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-900/80 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Request ID</th>
                    <th className="py-3.5 px-4">Issue Title & Details</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Priority</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Reported</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((req) => (
                    <tr
                      key={req.id}
                      onClick={() => onSelectRequest(req)}
                      className="hover:bg-purple-950/15 cursor-pointer transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-purple-400 whitespace-nowrap">
                        {req.id}
                      </td>

                      {/* Title & Desc */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                          {req.title}
                        </p>
                        <p className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">
                          {req.description}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-slate-300">
                          <CategoryIcon category={req.category} size={13} />
                          <span>{req.category}</span>
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-slate-300 max-w-[150px] truncate">
                        <span className="flex items-center gap-1 truncate" title={req.location}>
                          <MapPin size={12} className="text-rose-400 shrink-0" />
                          <span className="truncate">{req.location}</span>
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <PriorityBadge priority={req.priority} size="sm" />
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={req.status} size="sm" />
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                        {formatRelativeTime(req.createdAt)}
                      </td>

                      {/* Upvote & View */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleUpvote(req.id, e);
                          }}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border mr-2 ${
                            req.upvotedBy?.includes(currentUser.email)
                              ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <ThumbsUp size={11} />
                          <span className="font-mono text-[10px]">{req.upvotes}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectRequest(req)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onSelect={onSelectRequest}
                onToggleUpvote={onToggleUpvote}
                currentUserEmail={currentUser.email}
              />
            ))}
          </div>
        )
      ) : (
        <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Inbox size={28} />
          </div>
          <h3 className="text-base font-bold text-white">No Requests Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {scope === 'mine'
              ? "You haven't submitted any campus requests under this email yet."
              : 'No campus issues match your active search filters.'}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenSubmit}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
            >
              Report an Issue Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
