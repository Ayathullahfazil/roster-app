# Authentication & Role Wiring – V1

This document defines how authentication and role-based access
work in Version 1 (V1) of the application.

---

## Authentication Provider

- Supabase Auth is used for all users
- A single Supabase project handles:
  - Admin users (Web)
  - Employee users (Mobile)

---

## User Identity Model

- Supabase Auth (`auth.users`) stores:
  - email
  - authentication credentials
  - session state

- Application identity is stored in `employees` table:
  - user_id → references auth.users.id
  - role → admin / employee
  - status → active / inactive

---

## Login Flow (V1)

1. User logs in via Supabase Auth
2. App retrieves the authenticated user ID
3. App queries `employees` table using user_id
4. App determines:
   - user role (admin or employee)
   - account status (active or inactive)
5. App routes user accordingly:
   - Admin → Admin Web App
   - Employee → Employee Mobile App

---

## Access Rules (V1)

- Users without an `employees` record are denied access
- Users with status = inactive are blocked
- Role determines accessible navigation paths


---

## Auth State Model (V1)

The application maintains a clear authentication state
to control access and navigation.

### Auth States

1. Unauthenticated
- No active Supabase session
- User is redirected to Login screen

2. Authenticating
- Supabase session exists
- App is loading employee record
- Temporary loading state

3. Authenticated – Admin
- Valid Supabase session
- employees.role = admin
- employees.status = active
- User is routed to Admin Web App

4. Authenticated – Employee
- Valid Supabase session
- employees.role = employee
- employees.status = active
- User is routed to Employee Mobile App

5. Blocked
- Supabase session exists
- employees.status = inactive OR
- No matching employees record
- Access is denied with explanation

### State Rules

- Role and status are determined from the employees table
- Auth state is re-evaluated on app launch
- Auth state changes trigger navigation updates

---

## Role Resolution Logic (V1)

Role resolution determines what type of user is logged in
and what access they are granted.

### Resolution Steps

1. Retrieve the authenticated user from Supabase Auth
2. Extract the authenticated user ID
3. Query the `employees` table using user_id
4. Evaluate the employee record:
   - If no record exists → access denied
   - If status ≠ active → access denied
   - If role = admin → Admin access granted
   - If role = employee → Employee access granted

### Security Rules

- Role is never inferred from email or client-side state
- Role must always be read from the employees table
- Status checks are mandatory before granting access

### Error Handling

- Missing employee record → Blocked state
- Inactive account → Blocked state
- Role mismatch → Blocked state with error message

## Role-Based Routing & Guards (V1)

### Overview
The application uses Expo Router with route groups to enforce
authentication and role-based access at the routing level.

This ensures:
- Users cannot access screens outside their role
- Logged-out users cannot access protected routes
- Role checks happen before any screen renders

---

### Route Groups
The app is structured using route groups:

- `(auth)` → public authentication screens (login)
- `(admin)` → admin-only screens
- `(employee)` → employee-only screens

Route groups are **organizational only** and are not part of the public URL.

---

### Entry Flow
1. App starts → `app/_layout.tsx`
2. Supabase session is checked
3. If no session → redirect to login
4. If session exists → role is resolved from `employees` table
5. User is redirected to:
   - Admin → Admin dashboard
   - Employee → Employee roster

---

### Global Guard Location
All auth and role checks live in:


This file:
- Prevents unauthorized route access
- Redirects users based on role
- Avoids duplicating auth logic in individual screens

---

### Default Landing Pages
Each role has a defined default landing screen:

- Admin → Admin Dashboard
- Employee → Employee Roster

These are enforced via:
- Login redirects
- Index route redirects
- Global route guards

---

### Design Decision Notes
- Routing decisions are **not** made inside screens
- Index routes remain minimal and declarative
- All protection logic is centralized
- This structure supports future roles (e.g. supervisor, manager)

---

### Future Considerations
- Add role-specific permissions within routes
- Add finer-grained access control per screen
- Extend guards for feature-level permissions

## Global Auth State (V1)

### Purpose
The app uses a centralized auth context to store:
- Current Supabase user
- Employee profile record
- Resolved role
- Auth loading state

This avoids:
- Repeated Supabase calls in screens
- Role logic duplication
- Inconsistent auth handling

---

### Source of Truth
Auth state is resolved once and stored globally.

All screens consume auth data via context rather than querying Supabase directly.

---

### Responsibilities
The auth context:
- Loads session on app start
- Resolves user role from the database
- Exposes role (`admin` / `employee`)
- Exposes loading and blocked states

Screens:
- Do not call Supabase auth directly
- Do not resolve roles
- Only consume context values

---

### Routing Relationship
- Route guards depend on auth context
- Login updates auth state
- Logout clears auth context

This separation keeps routing, auth, and UI concerns isolated.

### Test Users (Development)

Supabase no longer allows manually setting passwords via dashboard.

For development:
- Test users are deleted and recreated with known passwords
- Email confirmation is manually enabled
- Email provider is not required during MVP

This ensures predictable login credentials.

### Route Group Requirement (Expo Router)

When using route groups (e.g. `(admin)`, `(employee)`),
navigation **must include the group name**:

✅ router.replace('/(admin)/dashboard')
❌ router.replace('/dashboard')

Failing to do so results in silent navigation failure.

### Auth Layout Responsibility

The `(auth)` route group:
- Contains only unauthenticated screens
- Has no redirect or auth logic
- Uses a Stack with headers disabled

This prevents:
- Redirect loops
- Duplicate auth checks
- UI inconsistencies

---

## Final Auth & Routing Architecture (Locked)

### Source of Truth
All authentication and role-based routing logic is centralized in:

- `app/_layout.tsx`

No screen-level routing or auth checks are allowed.

---

### Role-Based Access Rules

| Role      | Allowed Route Group | Default Screen |
|-----------|--------------------|----------------|
| Admin     | `(admin)`          | `/dashboard`  |
| Employee  | `(employee)`       | `/roster`     |
| Logged out| `(auth)`           | `/login`      |

---

### Design Decisions

- Routing decisions are **never made inside screens**
- Screens are UI-only
- Root layout performs **non-blocking redirects**
- Prevents white screens and redirect loops
- Supports future roles without refactor

---

### Future Extensions

- Feature-level permissions
- Supervisor / Manager roles
- OAuth (Google / Apple) activation

