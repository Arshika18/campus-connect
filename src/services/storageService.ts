import { HelpdeskRequest, RequestStatus, UserProfile } from '../types';

const STORAGE_KEY = 'campuspulse_requests_v1';
const USER_KEY = 'campuspulse_current_user_v1';

// Preset realistic demo accounts
export const DEMO_STUDENT: UserProfile = {
  email: 'alex.rivera@campus.edu',
  name: 'Alex Rivera',
  role: 'student',
  designationOrMajor: 'B.Tech Computer Science (3rd Yr)',
  studentOrStaffId: 'STU-2023-8819',
  avatarBg: 'from-violet-600 to-indigo-600',
};

export const DEMO_STAFF: UserProfile = {
  email: 'elena.vance@campus.edu',
  name: 'Elena Vance',
  role: 'staff',
  designationOrMajor: 'Chief Facilities & Operations Director',
  studentOrStaffId: 'FAC-OPS-402',
  avatarBg: 'from-amber-600 to-rose-600',
};

export const DEMO_PROFILES: UserProfile[] = [
  DEMO_STUDENT,
  {
    email: 'maya.patel@campus.edu',
    name: 'Maya Patel',
    role: 'student',
    designationOrMajor: 'B.Sc Biotechnology & Research',
    studentOrStaffId: 'STU-2024-4102',
    avatarBg: 'from-emerald-600 to-teal-600',
  },
  {
    email: 'jordan.lee@campus.edu',
    name: 'Jordan Lee',
    role: 'student',
    designationOrMajor: 'B.E Mechanical Engineering',
    studentOrStaffId: 'STU-2023-7721',
    avatarBg: 'from-sky-600 to-blue-600',
  },
  DEMO_STAFF,
  {
    email: 'marcus.chen@campus.edu',
    name: 'Marcus Chen',
    role: 'staff',
    designationOrMajor: 'Senior Network & Systems Admin',
    studentOrStaffId: 'FAC-IT-109',
    avatarBg: 'from-cyan-600 to-blue-600',
  },
  {
    email: 'sarah.jenkins@campus.edu',
    name: 'Sarah Jenkins',
    role: 'staff',
    designationOrMajor: 'Hostel Maintenance Supervisor',
    studentOrStaffId: 'FAC-HS-315',
    avatarBg: 'from-fuchsia-600 to-pink-600',
  },
];

// Rich, realistic initial demo dataset
const INITIAL_DEMO_REQUESTS: HelpdeskRequest[] = [
  {
    id: 'REQ-2026-1042',
    title: 'Wi-Fi Access Points down in 3rd Floor Silent Study Wing',
    category: 'Wi-Fi / Internet',
    description:
      'The wireless connection in the silent study wing drops every 2 minutes. Students are unable to access campus online library repositories and submit assignments.',
    location: 'Central Library, 3rd Floor Silent Study Zone (North Wing)',
    campusZone: 'Central Library',
    contactName: 'Alex Rivera',
    contactEmail: 'alex.rivera@campus.edu',
    contactPhone: '+1 (555) 349-8812',
    priority: 'Urgent',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 3.5 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1.2 * 3600 * 1000).toISOString(),
    upvotes: 34,
    upvotedBy: ['alex.rivera@campus.edu', 'maya.patel@campus.edu'],
    assignedStaff: 'Marcus Chen (IT Admin)',
    staffInternalNotes: 'Access point AP-09 PoE switch port reset dispatched. Firmware upgrade scheduled.',
    timeline: [
      {
        id: 't-1',
        status: 'Open',
        changedAt: new Date(Date.now() - 3.5 * 3600 * 1000).toISOString(),
        changedBy: 'Alex Rivera',
        role: 'student',
        note: 'Issue reported with speed test screenshot attached.',
      },
      {
        id: 't-2',
        status: 'In Progress',
        changedAt: new Date(Date.now() - 1.2 * 3600 * 1000).toISOString(),
        changedBy: 'Marcus Chen',
        role: 'staff',
        note: 'Investigating high channel interference and power delivery on PoE switch #4.',
      },
    ],
  },
  {
    id: 'REQ-2026-1185',
    title: 'Water pipe valve leaking beneath sink in 2nd Floor Restroom',
    category: 'Plumbing',
    description:
      'Continuous dripping water is forming a pool on the floor, posing a slip hazard for students and staff near the eastern stairwell.',
    location: 'Engineering Block A, Level 2 East Restroom',
    campusZone: 'Engineering Block A',
    contactName: 'Maya Patel',
    contactEmail: 'maya.patel@campus.edu',
    contactPhone: '+1 (555) 781-4420',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    upvotes: 11,
    upvotedBy: ['maya.patel@campus.edu'],
    assignedStaff: 'Elena Vance (Facilities)',
    staffInternalNotes: 'Plumbing contractor replaced worn compression washer and tested flow.',
    timeline: [
      {
        id: 't-3',
        status: 'Open',
        changedAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
        changedBy: 'Maya Patel',
        role: 'student',
        note: 'Reported water puddle forming under basin.',
      },
      {
        id: 't-4',
        status: 'In Progress',
        changedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
        changedBy: 'Elena Vance',
        role: 'staff',
        note: 'Maintenance technician dispatched with replacement plumbing kit.',
      },
      {
        id: 't-5',
        status: 'Resolved',
        changedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
        changedBy: 'Elena Vance',
        role: 'staff',
        note: 'High pressure seal installed and floor sanitized. Dry and operational.',
      },
    ],
  },
  {
    id: 'REQ-2026-1290',
    title: 'Main Overhead 4K Projector Lamp Flickering and Overheating',
    category: 'Classroom / Laboratory',
    description:
      'Projector lamp flickers orange and shuts off every 10 minutes. Midterm review lectures scheduled for tomorrow morning will be disrupted without visual slides.',
    location: 'Science Complex, Lecture Hall LT-102 (Capacity 180)',
    campusZone: 'Science & Research Wing',
    contactName: 'Jordan Lee',
    contactEmail: 'jordan.lee@campus.edu',
    contactPhone: '+1 (555) 912-3004',
    priority: 'High',
    status: 'Open',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    upvotes: 18,
    upvotedBy: ['jordan.lee@campus.edu'],
    assignedStaff: 'Unassigned',
    staffInternalNotes: 'Replacement bulb unit stock checked in AV inventory.',
    timeline: [
      {
        id: 't-6',
        status: 'Open',
        changedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        changedBy: 'Jordan Lee',
        role: 'student',
        note: 'Urgent ticket created prior to morning midterm review session.',
      },
    ],
  },
  {
    id: 'REQ-2026-1344',
    title: 'Hostel Wing B Air Conditioner Circuit Breaker Tripping',
    category: 'Electrical',
    description:
      'The split AC in Room 204 trips the floor sub-panel circuit breaker as soon as the compressor kicks in. Room temperature reaches 30C during afternoons.',
    location: 'South Hostel, Wing B, Room 204',
    campusZone: 'South Hostel (Boys)',
    contactName: 'Alex Rivera',
    contactEmail: 'alex.rivera@campus.edu',
    contactPhone: '+1 (555) 349-8812',
    priority: 'High',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    upvotes: 7,
    upvotedBy: ['alex.rivera@campus.edu'],
    assignedStaff: 'Sarah Jenkins (Hostel Lead)',
    staffInternalNotes: 'Electrician checked load balance. Run capacitor needs replacement.',
    timeline: [
      {
        id: 't-7',
        status: 'Open',
        changedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        changedBy: 'Alex Rivera',
        role: 'student',
        note: 'Breaker flips consistently after 15 seconds.',
      },
      {
        id: 't-8',
        status: 'In Progress',
        changedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        changedBy: 'Sarah Jenkins',
        role: 'staff',
        note: 'Electrician on site with multimeter; capacitor replacement in progress.',
      },
    ],
  },
  {
    id: 'REQ-2026-1411',
    title: 'Cafeteria RFID Card Scanner Not Responding at Express Counter',
    category: 'Canteen',
    description:
      'The contactless student ID debit card reader at Counter 3 shows "Comm Error 503", causing long checkout queues during lunch rush.',
    location: 'Central Dining Hall, Express Checkout Counter 3',
    campusZone: 'Central Dining / Canteen',
    contactName: 'Maya Patel',
    contactEmail: 'maya.patel@campus.edu',
    priority: 'Medium',
    status: 'Open',
    createdAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    upvotes: 22,
    upvotedBy: ['maya.patel@campus.edu'],
    assignedStaff: 'Unassigned',
    timeline: [
      {
        id: 't-9',
        status: 'Open',
        changedAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
        changedBy: 'Maya Patel',
        role: 'student',
        note: 'Crowded queue forming; requested IT reboot reader terminal.',
      },
    ],
  },
  {
    id: 'REQ-2026-1502',
    title: 'Campus Shuttle Bus #4 Hydraulic Door Sensor Delay',
    category: 'Transport',
    description:
      'The rear automated exit door on electric shuttle #4 takes over 25 seconds to unlatch at campus loop stops, delaying scheduled student transit.',
    location: 'Main North Gate Shuttle Loop Station',
    campusZone: 'Main Admin & Auditorium',
    contactName: 'Marcus Chen',
    contactEmail: 'marcus.chen@campus.edu',
    priority: 'Low',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    upvotes: 9,
    upvotedBy: [],
    assignedStaff: 'Fleet Maintenance',
    timeline: [
      {
        id: 't-10',
        status: 'Open',
        changedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        changedBy: 'Marcus Chen',
        role: 'staff',
        note: 'Noticed delay during evening campus transit patrol.',
      },
      {
        id: 't-11',
        status: 'Resolved',
        changedAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
        changedBy: 'Fleet Maintenance',
        role: 'staff',
        note: 'Optical safety sensor cleaned and re-calibrated. Door cycle operating at 3.2s normal timing.',
      },
    ],
  },
  {
    id: 'REQ-2026-1589',
    title: 'Broken glassware and liquid spill near Chemical Synthesis Bench 4',
    category: 'Cleaning and Maintenance',
    description:
      'A graduated beaker was knocked over during lab cleanup. The area has been cordoned off with caution cones but needs professional cleanup and disposal.',
    location: 'Innovation Hub, Chemistry Prep Room Lab B-12',
    campusZone: 'Innovation & Incubation Hub',
    contactName: 'Alex Rivera',
    contactEmail: 'alex.rivera@campus.edu',
    priority: 'Urgent',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
    upvotes: 15,
    upvotedBy: ['alex.rivera@campus.edu'],
    assignedStaff: 'Elena Vance',
    timeline: [
      {
        id: 't-12',
        status: 'Open',
        changedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
        changedBy: 'Alex Rivera',
        role: 'student',
        note: 'Caution cones placed by lab assistants.',
      },
      {
        id: 't-13',
        status: 'Resolved',
        changedAt: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
        changedBy: 'Elena Vance',
        role: 'staff',
        note: 'EHS team cleared glass shards and neutralized spill. Room verified safe.',
      },
    ],
  },
  {
    id: 'REQ-2026-1673',
    title: 'High-Volume Color Laser Printer Jammed with Error 49.38.07',
    category: 'Other',
    description:
      'Common printer in the Tech wing prints one page and throws a memory firmware error. Multiple students trying to print senior project reports.',
    location: 'Engineering Block A, Computer Lab 404',
    campusZone: 'Engineering Block A',
    contactName: 'Jordan Lee',
    contactEmail: 'jordan.lee@campus.edu',
    priority: 'Low',
    status: 'Open',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    upvotes: 8,
    upvotedBy: ['jordan.lee@campus.edu'],
    assignedStaff: 'Unassigned',
    timeline: [
      {
        id: 't-14',
        status: 'Open',
        changedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        changedBy: 'Jordan Lee',
        role: 'student',
        note: 'Queue cleared from print spooler; error persisted.',
      },
    ],
  },
];

export const storageService = {
  // Retrieve all requests
  getRequests(): HelpdeskRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Seed default demo data if first time
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REQUESTS));
        return INITIAL_DEMO_REQUESTS;
      }
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REQUESTS));
        return INITIAL_DEMO_REQUESTS;
      }
      return parsed;
    } catch (err) {
      console.warn('Failed to parse requests from localStorage, resetting to demo dataset', err);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REQUESTS));
      return INITIAL_DEMO_REQUESTS;
    }
  },

  // Save requests
  saveRequests(requests: HelpdeskRequest[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    } catch (err) {
      console.error('Failed to save requests to localStorage', err);
    }
  },

  // Add new request
  createRequest(newReq: Omit<HelpdeskRequest, 'createdAt' | 'updatedAt' | 'timeline' | 'upvotes' | 'upvotedBy'>): HelpdeskRequest {
    const requests = this.getRequests();
    const now = new Date().toISOString();

    const fullRequest: HelpdeskRequest = {
      ...newReq,
      createdAt: now,
      updatedAt: now,
      upvotes: 1,
      upvotedBy: newReq.contactEmail ? [newReq.contactEmail] : [],
      timeline: [
        {
          id: `t-${Date.now()}`,
          status: 'Open',
          changedAt: now,
          changedBy: newReq.contactName,
          role: 'student',
          note: 'Request submitted through Campus Helpdesk portal.',
        },
      ],
    };

    const updated = [fullRequest, ...requests];
    this.saveRequests(updated);
    return fullRequest;
  },

  // Update status (Staff action)
  updateStatus(
    requestId: string,
    newStatus: RequestStatus,
    staffName: string,
    note?: string,
    staffInternalNotes?: string
  ): HelpdeskRequest | null {
    const requests = this.getRequests();
    const index = requests.findIndex((r) => r.id === requestId);
    if (index === -1) return null;

    const current = requests[index];
    const now = new Date().toISOString();

    const timelineEvent = {
      id: `t-${Date.now()}`,
      status: newStatus,
      changedAt: now,
      changedBy: staffName,
      role: 'staff' as const,
      note: note || `Status updated to ${newStatus}`,
    };

    const updatedRequest: HelpdeskRequest = {
      ...current,
      status: newStatus,
      updatedAt: now,
      assignedStaff: current.assignedStaff && current.assignedStaff !== 'Unassigned' ? current.assignedStaff : staffName,
      staffInternalNotes: staffInternalNotes !== undefined ? staffInternalNotes : current.staffInternalNotes,
      timeline: [...current.timeline, timelineEvent],
    };

    requests[index] = updatedRequest;
    this.saveRequests(requests);
    return updatedRequest;
  },

  // Upvote / "Me Too" toggle
  toggleUpvote(requestId: string, userEmail: string): HelpdeskRequest | null {
    const requests = this.getRequests();
    const index = requests.findIndex((r) => r.id === requestId);
    if (index === -1) return null;

    const current = requests[index];
    const hasUpvoted = current.upvotedBy?.includes(userEmail);

    let updatedUpvotedBy: string[];
    let updatedUpvotes: number;

    if (hasUpvoted) {
      updatedUpvotedBy = (current.upvotedBy || []).filter((e) => e !== userEmail);
      updatedUpvotes = Math.max(0, current.upvotes - 1);
    } else {
      updatedUpvotedBy = [...(current.upvotedBy || []), userEmail];
      updatedUpvotes = (current.upvotes || 0) + 1;
    }

    const updatedRequest: HelpdeskRequest = {
      ...current,
      upvotes: updatedUpvotes,
      upvotedBy: updatedUpvotedBy,
    };

    requests[index] = updatedRequest;
    this.saveRequests(requests);
    return updatedRequest;
  },

  // Reset to full demo dataset
  resetToDemo(): HelpdeskRequest[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REQUESTS));
    return INITIAL_DEMO_REQUESTS;
  },

  // Auth & Profile management
  getCurrentUser(): UserProfile {
    try {
      const data = localStorage.getItem(USER_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    // Default to student demo user
    localStorage.setItem(USER_KEY, JSON.stringify(DEMO_STUDENT));
    return DEMO_STUDENT;
  },

  saveCurrentUser(user: UserProfile): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save current user profile', err);
    }
  },
};
