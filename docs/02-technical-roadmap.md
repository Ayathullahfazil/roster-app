# Technical Roadmap (V1)

This document outlines the planned technical development roadmap for Version 1 (V1)
of the employee roster application.

The roadmap is structured by weeks to ensure predictable delivery and controlled scope.

---

## Week 0 — Foundation (Completed)

### Goals
- Establish development environment
- Verify backend connectivity
- Confirm authentication works

### Completed Work
- Expo application initialized (web + mobile)
- Supabase project created and connected
- Environment variables configured
- Database connection verified
- Test admin login implemented and working

### Outcome
The application can start, authenticate a user, and communicate securely with Supabase.

---

## Week 1 — Authentication & Roles

### Goals
- Implement real authentication flows
- Introduce user roles

### Planned Work
- Email/password login
- Logout functionality
- Persist authentication session
- Define roles (admin, employee)
- Store role information in database

### Outcome
The app knows who the user is and what role they have.

---

## Week 2 — Employee Management (Admin Core)

### Goals
- Allow admins to manage employees

### Planned Work
- Admin can view employee list
- Admin can add new employees
- Admin can enable/disable employees
- Employee profile records finalized

### Outcome
Admins can manage the workforce from the application.

---

## Week 3 — Roster / Schedule (Read-Only)

### Goals
- Allow employees to view assigned shifts
- Allow admins to create schedules

### Planned Work
- Shift table implementation
- Admin-managed shift assignment
- Employees can view only their own shifts

### Outcome
Employees can see their schedules, and admins control rostering.

---

## Week 4 — Time-Off Requests (Lite)

### Goals
- Introduce basic leave workflow

### Planned Work
- Employee submits time-off request
- Admin approves or rejects requests
- Status visible to employee

### Outcome
Basic leave management without automation.

---

## Week 5 — Notifications (Basic)

### Goals
- Notify users of important events

### Planned Work
- Push notifications for shift assignment
- Notifications for leave approval/rejection
- Optional email notifications

### Outcome
Users are informed of critical updates.

---

## Week 6 — Stability & Polish

### Goals
- Prepare app for real usage

### Planned Work
- Error handling
- Loading states
- Permission checks
- UI and UX cleanup

### Outcome
A stable, client-ready Version 1 release.
