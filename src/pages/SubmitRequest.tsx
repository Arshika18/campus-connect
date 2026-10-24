import React, { useState } from 'react';
import { Category, Priority, HelpdeskRequest, UserProfile } from '../types';
import { generateRequestId } from '../utils/idGenerator';
import { CategoryIcon, getCategoryTheme } from '../components/CategoryIcon';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  AlertTriangle,
  Send,
  X,
  CheckCircle2,
  Building2,
  ShieldAlert,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface SubmitRequestProps {
  currentUser: UserProfile;
  onSubmitSuccess: (newReq: HelpdeskRequest) => void;
  onCancel: () => void;
}

export const SubmitRequest: React.FC<SubmitRequestProps> = ({
  currentUser,
  onSubmitSuccess,
  onCancel,
}) => {
  const [category, setCategory] = useState<Category>('Wi-Fi / Internet');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [campusZone, setCampusZone] = useState('Central Library');
  const [contactName, setContactName] = useState(currentUser.name || '');
  const [contactEmail, setContactEmail] = useState(currentUser.email || '');
  const [contactPhone, setContactPhone] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<HelpdeskRequest | null>(null);

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

  const campusZones = [
    'Central Library',
    'Engineering Block A',
    'Science & Research Wing',
    'South Hostel (Boys)',
    'North Hostel (Girls)',
    'Central Dining / Canteen',
    'Sports Complex & Gym',
    'Innovation & Incubation Hub',
    'Main Admin & Auditorium',
  ];

  // Validation
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!title.trim()) {
      errs.title = 'Issue title is required.';
    } else if (title.trim().length < 5) {
      errs.title = 'Please enter a descriptive title (at least 5 characters).';
    }

    if (!description.trim()) {
      errs.description = 'Detailed description is required.';
    } else if (description.trim().length < 15) {
      errs.description = 'Please explain the issue in a bit more detail (at least 15 characters).';
    }

    if (!location.trim()) {
      errs.location = 'Campus location (room, floor, block) is required.';
    }

    if (!contactName.trim()) {
      errs.contactName = 'Contact name is required.';
    }

    if (!contactEmail.trim()) {
      errs.contactEmail = 'Contact email is required.';
    } else if (!contactEmail.includes('@') || !contactEmail.includes('.')) {
      errs.contactEmail = 'Please provide a valid email address.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate swift network dispatch
    setTimeout(() => {
      const generatedId = generateRequestId();
      const now = new Date().toISOString();

      const newTicket: HelpdeskRequest = {
        id: generatedId,
        title: title.trim(),
        category,
        description: description.trim(),
        location: location.trim(),
        campusZone,
        contactName: contactName.trim(),
        contactEmail: contactEmail.trim().toLowerCase(),
        contactPhone: contactPhone.trim() || undefined,
        priority,
        status: 'Open',
        createdAt: now,
        updatedAt: now,
        upvotes: 1,
        upvotedBy: [contactEmail.trim().toLowerCase()],
        assignedStaff: 'Unassigned',
        timeline: [
          {
            id: `t-${Date.now()}`,
            status: 'Open',
            changedAt: now,
            changedBy: contactName.trim(),
            role: 'student',
            note: 'Ticket created and submitted through Campus Helpdesk portal.',
          },
        ],
      };

      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#6366f1', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch {
        // ignore if canvas unavailable
      }

      setIsSubmitting(false);
      setSubmittedTicket(newTicket);
      onSubmitSuccess(newTicket);
    }, 500);
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setContactPhone('');
    setErrors({});
    setSubmittedTicket(null);
  };

  // If already submitted, show confirmation view
  if (submittedTicket) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#102422] to-[#0c131a] p-8 sm:p-10 shadow-2xl text-center space-y-5">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Request Dispatched Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Issue Logged to Campus Facilities
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Your ticket has been assigned a unique tracking ID. Campus technicians have been notified and will prioritize based on location and severity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 max-w-md mx-auto text-left space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Request Tracking ID:</span>
              <span className="font-mono font-bold text-purple-400 text-sm bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-500/20">
                {submittedTicket.id}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Title:</span>
              <span className="font-semibold text-white truncate max-w-[200px]">
                {submittedTicket.title}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Category & Priority:</span>
              <span className="text-slate-200">
                {submittedTicket.category} • <strong className="text-amber-400">{submittedTicket.priority}</strong>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Location:</span>
              <span className="text-slate-200 truncate max-w-[200px]">
                {submittedTicket.location}
              </span>
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
            >
              Submit Another Issue
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all"
            >
              <span>Back to Incident Feed</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
            <Sparkles size={14} />
            <span>Campus Incident & Maintenance Dispatch</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">
            Submit a Campus Support Request
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill in the details below. Our campus technicians and facility staff review issues 24/7.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          aria-label="Cancel and return"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form (2 columns) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#0d1424] p-6 sm:p-8 shadow-xl space-y-6"
        >
          {/* Category Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              1. Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => {
                const isSelected = category === cat;
                const theme = getCategoryTheme(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                      isSelected
                        ? `${theme.bg} ring-2 ring-purple-500/50 shadow-md`
                        : 'border-white/5 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <CategoryIcon category={cat} size={15} />
                    <span className="truncate">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Issue Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Issue Heading / Title *
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {title.length}/100 chars
              </span>
            </div>
            <input
              type="text"
              maxLength={100}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              placeholder="e.g. Wi-Fi drops every 2 minutes in Silent Study room"
              className={`w-full px-4 py-3 text-sm rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.title
                  ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/30'
                  : 'border-white/10 focus:border-purple-500'
              }`}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                <AlertTriangle size={13} /> {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                3. Detailed Description *
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {description.length} chars
              </span>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
              }}
              placeholder="Describe what is broken, what symptoms you see, error codes, and how it impacts students..."
              className={`w-full px-4 py-3 text-sm rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none transition-colors leading-relaxed ${
                errors.description
                  ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/30'
                  : 'border-white/10 focus:border-purple-500'
              }`}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                <AlertTriangle size={13} /> {errors.description}
              </p>
            )}
          </div>

          {/* Campus Location & Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                4. Location (Room / Floor) *
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                  }}
                  placeholder="e.g. Block A, Room 304, 3rd Floor"
                  className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.location
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-white/10 focus:border-purple-500'
                  }`}
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertTriangle size={12} /> {errors.location}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Campus Zone
              </label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <select
                  value={campusZone}
                  onChange={(e) => setCampusZone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                >
                  {campusZones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                5. Contact Name *
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => {
                    setContactName(e.target.value);
                    if (errors.contactName) setErrors((prev) => ({ ...prev, contactName: '' }));
                  }}
                  placeholder="Full name"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none ${
                    errors.contactName ? 'border-rose-500' : 'border-white/10 focus:border-purple-500'
                  }`}
                />
              </div>
              {errors.contactName && (
                <p className="mt-1 text-xs text-rose-400">{errors.contactName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                6. Contact Email *
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => {
                    setContactEmail(e.target.value);
                    if (errors.contactEmail) setErrors((prev) => ({ ...prev, contactEmail: '' }));
                  }}
                  placeholder="name@campus.edu"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none ${
                    errors.contactEmail ? 'border-rose-500' : 'border-white/10 focus:border-purple-500'
                  }`}
                />
              </div>
              {errors.contactEmail && (
                <p className="mt-1 text-xs text-rose-400">{errors.contactEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone (Optional)
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Priority selection */}
          <div className="pt-2 border-t border-white/5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              7. Urgency / Priority Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Low', 'Medium', 'High', 'Urgent'] as Priority[]).map((p) => {
                const isSelected = priority === p;
                let colorClass = '';
                if (p === 'Urgent') colorClass = 'border-rose-500 bg-rose-500/20 text-rose-300';
                else if (p === 'High') colorClass = 'border-amber-500 bg-amber-500/20 text-amber-300';
                else if (p === 'Medium') colorClass = 'border-blue-500 bg-blue-500/20 text-blue-300';
                else colorClass = 'border-slate-500 bg-slate-700/30 text-slate-300';

                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected
                        ? `${colorClass} ring-2 ring-white/30 font-bold`
                        : 'border-white/5 bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-purple-950/60 transition-all disabled:opacity-50"
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Logging Ticket...' : 'Submit Incident Request'}</span>
            </button>
          </div>
        </form>

        {/* Live Ticket Preview Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Eye size={14} className="text-purple-400" />
            <span>Live Ticket Preview</span>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-[#0e1628] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-purple-400 font-bold">
                REQ-{new Date().getFullYear()}-XXXX
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                Open
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white line-clamp-2">
                {title.trim() || 'Untitled Campus Issue'}
              </h4>
              <p className="mt-1 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {description.trim() || 'Description preview will appear here as you type...'}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-rose-300">
                <MapPin size={13} className="shrink-0" />
                <span className="truncate">{location.trim() || 'Location not specified yet'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Building2 size={13} className="shrink-0" />
                <span>Zone: {campusZone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <User size={13} className="shrink-0" />
                <span>By: {contactName || 'Student Name'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 flex items-start gap-2">
              <Sparkles size={15} className="shrink-0 mt-0.5 text-purple-400" />
              <span>
                <strong>Smart Routing:</strong> Submitting will instantly ping the {category} department on duty.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
