import React from 'react';
import { HelpdeskRequest } from '../types';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { CategoryIcon, getCategoryTheme } from './CategoryIcon';
import { formatRelativeTime } from '../utils/dateFormatter';
import { MapPin, ThumbsUp, Calendar, User, ChevronRight } from 'lucide-react';

interface RequestCardProps {
  request: HelpdeskRequest;
  onSelect: (req: HelpdeskRequest) => void;
  onToggleUpvote: (reqId: string, e: React.MouseEvent) => void;
  currentUserEmail: string;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onSelect,
  onToggleUpvote,
  currentUserEmail,
}) => {
  const categoryTheme = getCategoryTheme(request.category);
  const hasUpvoted = request.upvotedBy?.includes(currentUserEmail);

  return (
    <div
      onClick={() => onSelect(request)}
      role="button"
      tabIndex={0}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0f1627]/80 hover:bg-[#141d33] hover:border-purple-500/40 p-5 transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-purple-950/20 cursor-pointer text-left backdrop-blur-sm"
    >
      <div>
        {/* Top bar: Category badge + ID + Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${categoryTheme.bg}`}
            >
              <CategoryIcon category={request.category} size={13} />
              <span>{request.category}</span>
            </span>

            <span className="font-mono text-xs font-semibold text-slate-400 group-hover:text-purple-300 transition-colors">
              {request.id}
            </span>
          </div>

          <StatusBadge status={request.status} size="sm" />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-2 leading-snug">
          {request.title}
        </h3>

        {/* Description preview */}
        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {request.description}
        </p>

        {/* Location tag */}
        <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">
          <MapPin size={13} className="text-rose-400 shrink-0" />
          <span className="truncate">{request.location}</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {/* Submitter */}
          <span className="flex items-center gap-1 truncate max-w-[110px]" title={request.contactName}>
            <User size={12} className="text-slate-500 shrink-0" />
            <span className="truncate">{request.contactName}</span>
          </span>

          {/* Time */}
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Calendar size={11} className="shrink-0" />
            <span>{formatRelativeTime(request.createdAt)}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <PriorityBadge priority={request.priority} size="sm" />

          {/* Upvote button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleUpvote(request.id, e);
            }}
            title={hasUpvoted ? 'You upvoted this' : 'Click to say you also experience this issue'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              hasUpvoted
                ? 'bg-purple-600/30 border-purple-500 text-purple-300 ring-1 ring-purple-500/40'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <ThumbsUp size={12} className={hasUpvoted ? 'text-purple-400 fill-purple-400' : ''} />
            <span className="font-mono text-[11px]">{request.upvotes}</span>
          </button>

          <ChevronRight size={14} className="text-slate-500 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};
