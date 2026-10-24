export type RequestStatus = 'Open' | 'In Progress' | 'Resolved';

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type Category =
  | 'Electrical'
  | 'Plumbing'
  | 'Wi-Fi / Internet'
  | 'Classroom / Laboratory'
  | 'Cleaning and Maintenance'
  | 'Hostel'
  | 'Transport'
  | 'Canteen'
  | 'Other';

export interface StatusTimelineEvent {
  id: string;
  status: RequestStatus;
  changedAt: string; // ISO date string
  changedBy: string; // Name of student or staff member
  role: 'student' | 'staff';
  note?: string;
}

export interface HelpdeskRequest {
  id: string; // e.g. REQ-2026-4921
  title: string;
  category: Category;
  description: string;
  location: string;
  campusZone?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  priority: Priority;
  status: RequestStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  timeline: StatusTimelineEvent[];
  upvotes: number;
  upvotedBy: string[]; // array of emails
  assignedStaff?: string;
  staffInternalNotes?: string;
}

export type UserRole = 'student' | 'staff';

export interface UserProfile {
  email: string;
  name: string;
  role: UserRole;
  designationOrMajor?: string;
  studentOrStaffId?: string;
  avatarBg?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}
