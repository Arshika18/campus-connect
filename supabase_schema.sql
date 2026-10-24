-- =======================================================================
-- CampusPulse Helpdesk - Supabase Database Schema
-- Run this in your Supabase SQL Editor if connecting a live PostgreSQL database
-- =======================================================================

-- 1. Create ENUM types for Category, Status, and Priority
CREATE TYPE request_category AS ENUM (
  'Electrical',
  'Plumbing',
  'Wi-Fi / Internet',
  'Classroom / Laboratory',
  'Cleaning and Maintenance',
  'Hostel',
  'Transport',
  'Canteen',
  'Other'
);

CREATE TYPE request_status AS ENUM (
  'Open',
  'In Progress',
  'Resolved'
);

CREATE TYPE request_priority AS ENUM (
  'Low',
  'Medium',
  'High',
  'Urgent'
);

CREATE TYPE user_role AS ENUM (
  'student',
  'staff'
);

-- 2. Create the main Requests Table
CREATE TABLE IF NOT EXISTS public.helpdesk_requests (
  id TEXT PRIMARY KEY, -- e.g. 'REQ-2026-1042'
  title TEXT NOT NULL,
  category request_category NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  campus_zone TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  priority request_priority NOT NULL DEFAULT 'Medium',
  status request_status NOT NULL DEFAULT 'Open',
  upvotes INTEGER NOT NULL DEFAULT 1,
  assigned_staff TEXT,
  staff_internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create Status Timeline Events Table (Audit log of status updates)
CREATE TABLE IF NOT EXISTS public.request_timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id TEXT NOT NULL REFERENCES public.helpdesk_requests(id) ON DELETE CASCADE,
  status request_status NOT NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  changed_by TEXT NOT NULL,
  role user_role NOT NULL,
  note TEXT
);

-- 4. Create Community Upvotes Table ("+1 Me Too" issue tracker)
CREATE TABLE IF NOT EXISTS public.request_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id TEXT NOT NULL REFERENCES public.helpdesk_requests(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(request_id, user_email)
);

-- 5. Indexes for fast query performance
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.helpdesk_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_category ON public.helpdesk_requests(category);
CREATE INDEX IF NOT EXISTS idx_requests_priority ON public.helpdesk_requests(priority);
CREATE INDEX IF NOT EXISTS idx_requests_created_at ON public.helpdesk_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_timeline_request_id ON public.request_timeline_events(request_id);

-- 6. Row Level Security (RLS) setup
ALTER TABLE public.helpdesk_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_upvotes ENABLE ROW LEVEL SECURITY;

-- Allow reading all public campus requests
CREATE POLICY "Allow public read access to campus requests" 
  ON public.helpdesk_requests FOR SELECT USING (true);

-- Allow students to insert requests
CREATE POLICY "Allow authenticated or guest users to submit requests" 
  ON public.helpdesk_requests FOR INSERT WITH CHECK (true);

-- Allow staff to update request status
CREATE POLICY "Allow update access to requests" 
  ON public.helpdesk_requests FOR UPDATE USING (true);

-- Allow timeline logs
CREATE POLICY "Allow public read of timeline" 
  ON public.request_timeline_events FOR SELECT USING (true);

CREATE POLICY "Allow inserting timeline events" 
  ON public.request_timeline_events FOR INSERT WITH CHECK (true);

-- Allow upvoting
CREATE POLICY "Allow upvote access" 
  ON public.request_upvotes FOR ALL USING (true);
