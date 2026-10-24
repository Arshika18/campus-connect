import React, { useState, useMemo } from 'react';
import { HelpdeskRequest, RequestStatus, Category, Priority, UserProfile } from '../types';
import { StatCard } from '../components/StatCard';
import { RequestCard } from '../components/RequestCard';
import { CategoryIcon, getCategoryTheme } from '../components/CategoryIcon';
import { CampusHotlines } from '../components/CampusHotlines';
import { FaqSection } from '../components/FaqSection';
import {
  Inbox,
  AlertCircle,
  Clock,
  CheckCircle2,
  PlusCircle,
  Search,
  Filter,
  Sparkles,
  ArrowUpDown,
  X,
  Compass,
} from 'lucide-react';

interface DashboardProps {
  requests: HelpdeskRequest[];
  onOpenSubmit: () => void;
  onSelectRequest: (req: HelpdeskRequest) => void;
  onToggleUpvote: (reqId: string, e: React.MouseEvent) => void;
  currentUser: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({
  requests,
  onOpenSubmit,
  onSelectRequest,
  onToggleUpvote,
  currentUser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'upvotes' | 'priority'>('newest');

  // Stats computation
  const totalCount = requests.length;
  const openCount = requests.filter((r) => r.status === 'Open').length;
  const inProgressCount = requests.filter((r) => r.status === 'In Progress').length;
  const resolvedCount = requests.filter((r) => r.status === 'Resolved').length;

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

  // Filtering and sorting
  const filteredRequests = useMemo(() => {
    return requests
      .filter((req) => {
        // Status filter
        if (statusFilter !== 'All' && req.status !== statusFilter) return false;
        // Category filter
        if (categoryFilter !== 'All' && req.category !== categoryFilter) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = req.title.toLowerCase().includes(q);
          const matchesId = req.id.toLowerCase().includes(q);
          const matchesLoc = req.location.toLowerCase().includes(q);
          const matchesDesc = req.description.toLowerCase().includes(q);
          if (!matchesTitle && !matchesId && !matchesLoc && !matchesDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === 'priority') {
          const priorityWeight: Record<Priority, number> = {
            Urgent: 4,
            High: 3,
            Medium: 2,
            Low: 1,
          };
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        }
        // Default: newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [requests, statusFilter, categoryFilter, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCategoryFilter('All');
    setSortBy('newest');
  };

  const hasActiveFilters =
    statusFilter !== 'All' || categoryFilter !== 'All' || searchQuery.trim() !== '';

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121829] via-[#101424] to-[#0c0f1c] p-6 sm:p-10 shadow-2xl">
        {/* Ambient glow backgrounds */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 h-56 w-56 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles size={13} className="text-purple-400" />
              <span>Campus Facility & Student Incident Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Your Campus, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">Better Connected.</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Report an issue. Track progress. Make campus life better. Submit maintenance requests, monitor classroom equipment, and get prompt resolutions.
            </p>

            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={onOpenSubmit}
                className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-purple-950/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle size={18} />
                <span>Report an Issue Now</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400 pl-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Avg campus response: ~45 mins</span>
              </div>
            </div>
          </div>

          {/* Quick campus identity card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md max-w-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Session:</span>
              <span className="font-semibold text-purple-300 capitalize">{currentUser.role}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold text-sm text-white bg-gradient-to-tr ${currentUser.avatarBg || 'from-indigo-600 to-purple-600'} shrink-0`}>
                {currentUser.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-400 truncate">{currentUser.studentOrStaffId || currentUser.email}</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 border-t border-white/5">
              Logged in as {currentUser.email}. To switch to Staff/Admin, click your avatar.
            </p>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={totalCount}
          subtitle="All campus reported incidents"
          icon={Inbox}
          colorScheme="purple"
          activeFilter={statusFilter === 'All' && !hasActiveFilters}
          onClick={() => setStatusFilter('All')}
        />

        <StatCard
          title="Open Requests"
          value={openCount}
          subtitle="Awaiting technician pickup"
          icon={AlertCircle}
          colorScheme="coral"
          activeFilter={statusFilter === 'Open'}
          onClick={() => setStatusFilter(statusFilter === 'Open' ? 'All' : 'Open')}
        />

        <StatCard
          title="In Progress"
          value={inProgressCount}
          subtitle="Under repair & active action"
          icon={Clock}
          colorScheme="blue"
          activeFilter={statusFilter === 'In Progress'}
          onClick={() => setStatusFilter(statusFilter === 'In Progress' ? 'All' : 'In Progress')}
        />

        <StatCard
          title="Resolved"
          value={resolvedCount}
          subtitle="Fixed & verified by staff"
          icon={CheckCircle2}
          colorScheme="emerald"
          activeFilter={statusFilter === 'Resolved'}
          onClick={() => setStatusFilter(statusFilter === 'Resolved' ? 'All' : 'Resolved')}
        />
      </div>

      {/* Campus Emergency Hotlines */}
      <CampusHotlines />

      {/* Main Request Browser & Tracker */}
      <div className="space-y-4">
        {/* Controls Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-heading flex items-center gap-2">
              <span>Campus Incident Feed</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                {filteredRequests.length} showing
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse submitted issues or search by ID to track live repair status
            </p>
          </div>

          {/* Search bar & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, title, or room..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-8 pr-8 py-2 text-xs rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="upvotes">Sort: Most Upvoted (+1)</option>
                  <option value="priority">Sort: Highest Priority</option>
                </select>
                <ArrowUpDown size={13} className="absolute left-2.5 top-3 text-slate-400 pointer-events-none" />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
                >
                  <X size={13} />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 shrink-0 pr-1">
            <Filter size={13} /> Status:
          </span>

          {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((status) => {
            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? status === 'Open'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                      : status === 'In Progress'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/40'
                        : status === 'Resolved'
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                          : 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 shrink-0 pr-1">
            <Compass size={13} /> Category:
          </span>

          <button
            type="button"
            onClick={() => setCategoryFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              categoryFilter === 'All'
                ? 'bg-white/15 text-white border border-white/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All Categories
          </button>

          {categories.map((cat) => {
            const isSelected = categoryFilter === cat;
            const theme = getCategoryTheme(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(isSelected ? 'All' : cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? `${theme.bg} ring-1 ring-white/30 text-white`
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10'
                }`}
              >
                <CategoryIcon category={cat} size={13} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Requests Grid or Empty State */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredRequests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onSelect={onSelectRequest}
                onToggleUpvote={onToggleUpvote}
                currentUserEmail={currentUser.email}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-12 text-center max-w-lg mx-auto space-y-3">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-bold text-white">No Matching Campus Requests Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We couldn't find any issues matching your active search or filters. Try adjusting your keywords or resetting filters.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Reset All Filters
              </button>
              <button
                type="button"
                onClick={onOpenSubmit}
                className="px-4 py-2 rounded-xl bg-purple-600 text-xs font-semibold text-white hover:bg-purple-500 transition-colors"
              >
                Submit New Issue
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Campus FAQ / Help Section */}
      <FaqSection />
    </div>
  );
};
