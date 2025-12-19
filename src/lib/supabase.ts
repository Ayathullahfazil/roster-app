/**
 * Supabase Client & Auth Helpers (TEMP DEBUG MODE)
 * ------------------------------------------------
 * - Web + Mobile safe
 * - NO AsyncStorage
 * - NO database role lookup
 * - Role forced by email (for routing debug)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==============================
// LOGOUT HELPER
// ==============================
export const signOut = async () => {
  await supabase.auth.signOut();
};

// ==============================
// ROLE RESOLUTION (TEMP DEBUG)
// ==============================
export const resolveUserRole = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { state: 'unauthenticated' as const };
  }

  // 🔥 FORCE ROLE FOR TESTING
  if (user.email === 'admin@test.com') {
    return { state: 'admin' as const };
  }

  if (user.email === 'employee@test.com') {
    return { state: 'employee' as const };
  }

  // Anything else = blocked
  return { state: 'blocked' as const };
};
