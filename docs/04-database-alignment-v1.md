# Database Alignment – V1

This document validates that the database schema supports all
Version 1 (V1) features defined in the scope and roadmap.

The goal is to confirm readiness before further application logic is built.

---

## V1 Core Tables

The following tables are required for V1 functionality.

---

## Post-V1 Tables

The following tables are planned but not required for V1.

---

## Alignment Notes

This section records any gaps, risks, or adjustments identified during review.

## V1 Core Tables – Screen Mapping

### employees

**Purpose (V1):**  
Stores employee and admin profile data linked to Supabase Auth users.

**Used By Screens:**
- 1.1 Login / Sign Up
- 1.3 Account Deactivated
- 2.1 Employee Profile View / Edit
- Admin → 2.1 User Management (read-only in V1)

**Key Columns (V1):**
- id
- user_id (UUID from Supabase Auth)
- full_name
- role (admin / employee)
- status (active / inactive)

**V1 Notes:**
- Mandatory for authentication flow
- Controls role-based access
- Used immediately after login


---

### shifts

**Purpose (V1):**  
Stores shift definitions created by admins.

**Used By Screens:**
- 3.1 Roster Overview
- 3.2 Weekly Shift Overview
- 4.1 Shift Detail – Pre Start
- 5.1 Active Shift Dashboard

**V1 Notes:**
- Admin-created only
- Employees cannot edit shifts in V1
- Core dependency for roster views


---

### shift_assignments

**Purpose (V1):**  
Links employees to assigned shifts.

**Used By Screens:**
- 3.1 Roster Overview
- 3.4 Shift History
- 8.1 Final Log / Shift End (reference)

**V1 Notes:**
- Critical bridge table
- Required for all roster and history views
- No assignments = no visible shifts


---

### time_off_requests

**Purpose (V1):**  
Stores employee leave requests and admin decisions.

**Used By Screens:**
- 7.1 Time Off Request
- Admin → 6.1 Approval Centre

**V1 Notes:**
- Simple request → approve / reject flow
- No automation or accrual logic in V1


---

### V1 Database Summary

- All current tables support V1 features
- No new tables required to ship V1
- Database is intentionally minimal
- Future versions will extend existing tables, not replace them

## V1 Required Columns – Gap Analysis

This section documents columns that are **required for V1 functionality**
but may not yet exist or may need confirmation.

---

### employees – Required Columns (V1)

**Required for V1:**
- user_id (uuid, references auth.users)
- full_name (text)
- role (text: admin / employee)
- status (text: active / inactive)

**Recommended for V1 (but optional):**
- phone_number (text)
- profile_photo_url (text)

**Notes:**
- `user_id` must always match the Supabase Auth user
- `role` controls admin vs employee access
- `status` controls account deactivation logic

---

### shifts – Required Columns (V1)

**Required for V1:**
- id
- site_id (future use, nullable in V1)
- start_time (timestamp)
- end_time (timestamp)
- shift_type (text)
- status (scheduled / active / completed)

**Notes:**
- No recurrence rules in V1
- Shifts are created only by admins
- Status is used for lifecycle tracking

---

### shift_assignments – Required Columns (V1)

**Required for V1:**
- shift_id
- employee_id
- assigned_at (timestamp)

**Notes:**
- One employee per shift in V1
- No swap or broadcast logic in V1
- Historical integrity is critical

---

### time_off_requests – Required Columns (V1)

**Required for V1:**
- employee_id
- start_date
- end_date
- reason (text)
- status (pending / approved / rejected)

**Notes:**
- Approval handled manually by admin
- No balance calculations in V1

---

### V1 Schema Rules

- No destructive schema changes in V1
- Columns added only if tied to a V1 screen
- All schema changes must be documented before implementation

