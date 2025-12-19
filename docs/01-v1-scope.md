# V1 Scope Definition

This document defines which features and screens are included in Version 1 (V1)
of the employee roster application.

Any feature not explicitly listed as included is considered out of scope for V1
and planned for future versions.

---

## Roles in V1

- Admin
- Employee

---

## Admin Application (Web)

### Included in V1
- Login
- View dashboard (basic)
- View employee list
- Add employee
- View roster
- Create and assign shifts
- View time-off requests
- Approve or reject time-off requests

### Excluded from V1
- Advanced analytics
- Payroll management
- Automated scheduling
- Role hierarchy management
- Reports and exports

---

## Employee Application (Mobile)

### Included in V1
- Login
- View own profile
- View assigned shifts
- Submit time-off request
- View time-off request status

### Excluded from V1
- Shift swapping
- Chat or messaging
- Real-time location tracking
- Advanced notifications

---

## General Notes

- UI screens may exist for excluded features but will be disabled or hidden.
- Security and data correctness are prioritized over feature completeness.
- V1 focuses on stability and usability.

---

## UI Scope Classification

Legend:
- ✅ Fully functional in V1
- 🕒 Limited / read-only in V1
- 🔒 Role or state restricted
- ⏳ Planned post-V1

Detailed UI classification is maintained to ensure V1 scope remains controlled
while allowing full UI/UX to exist for future expansion.

---

## V1 Navigation Rules

### Authentication
- Users must be authenticated to access any application screen
- Login is the only publicly accessible screen

### Role-Based Navigation
- Admin users access the Admin Web application
- Employee users access the Employee Mobile application
- Cross-role navigation is not permitted

### Feature Access Rules
- V1-enabled screens are fully accessible
- Limited (🕒) screens are accessible with reduced functionality
- Post-V1 (⏳) screens are not accessible via navigation
- Post-V1 screens may exist visually but are disabled or hidden

These rules ensure a stable and predictable user experience in V1.

---

## V1 Navigation Map

### Entry Point
- App Launch → Login Screen

---

### Admin Navigation (Web)

Login
→ Admin Dashboard (basic summary)

Admin Dashboard
→ Employee List
→ Roster (Weekly / Monthly)
→ Time-Off Requests
→ Incident List
→ Settings (limited)

Employee List
→ Employee Profile (read-only / limited edit)

Roster
→ View Roster
→ Create / Edit Shift (manual only)

Time-Off Requests
→ Request Details
→ Approve / Reject

---

### Employee Navigation (Mobile)

Login
→ Roster Overview (default landing)

Roster Overview
→ Weekly Shift View
→ Monthly Shift View
→ Shift Details (read-only)

Shift Details
→ Time-Off Request

Profile
→ View Profile
→ Edit Limited Profile Fields
→ Settings (limited)

---

### Restricted Navigation (Post-V1)

The following areas are not accessible via navigation in V1:
- Active Shift workflows
- Live map and tracking
- Welfare checks
- Vehicle checklists
- Shift swapping
- Broadcast shifts
- Offline sync manager

These screens may exist visually but are disabled or hidden.

## V1 Core Tables (Current State)

The following tables currently exist in the Supabase database:

- employees
- shifts
- shift_assignments
- time_off_requests

---

## Profile & Settings Screens (V1 Clarification)

### Profile Screen (Employee & Admin)

**Included in V1:**
- View own profile
- Display:
  - full name
  - email
  - role
  - account status
- Edit limited fields:
  - full name
  - notification preference (on/off)

**Excluded from V1:**
- Document uploads
- Certification management
- Advanced preferences

---

### Settings Screen (Application-Level)

**Included in V1:**
- Theme mode selection:
  - Light
  - Dark
  - System (automatic)
- Basic notification toggle
- Logout

**Technical Notes:**
- Theme mode stored locally on device
- No backend table required for theme
- Advanced system settings are post-V1

---

## Notification Preferences – Future Expansion

### V1 Scope
- Single notification preference toggle (on/off)
- Applies to all notification types collectively
- Used for basic app and email notifications only

### Post-V1 Scope
- Channel-specific notification preferences:
  - Email notifications
  - SMS notifications
  - In-app (push) notifications
- Fine-grained control per notification type

V1 implementation is intentionally simplified to
avoid premature complexity while remaining extensible.


