/**
 * Root Layout
 * --------------------------------
 * - Single source of truth for auth
 * - Uses Supabase auth listener
 * - No race conditions
 */

import { resolveUserRole, supabase } from '@/src/lib/supabase';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const root = segments[0];
        const inAuth = root === '(auth)';
        const inAdmin = root === '(admin)';
        const inEmployee = root === '(employee)';

        // =========================
        // NOT LOGGED IN
        // =========================
        if (!session) {
          if (!inAuth) {
            router.replace('/(auth)/login');
          }
          setReady(true);
          return;
        }

        // =========================
        // LOGGED IN → ROLE
        // =========================
        const role = await resolveUserRole();

        if (role.state === 'admin' && !inAdmin) {
          router.replace('/(admin)/dashboard');
        }

        if (role.state === 'employee' && !inEmployee) {
          router.replace('/(employee)/roster');
        }

        if (role.state === 'blocked') {
          await supabase.auth.signOut();
          router.replace('/(auth)/login');
        }

        setReady(true);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [segments]);

  if (!ready) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
