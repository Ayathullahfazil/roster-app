## Auth Flow (Current)

1. App loads
2. `app/_layout.tsx` runs
3. Supabase session checked
4. If no session → `(auth)/login`
5. If session:
   - Resolve role
   - Redirect to correct route group
6. Screens render with no auth logic

This flow is intentionally centralized to avoid UI crashes.

---

## Loading & Error Safety

The app uses Expo Router safety routes:

- `_loading.tsx` → prevents white screens
- `_error.tsx` → catches runtime crashes

These are intentional and required for stability.

Never remove these files.

