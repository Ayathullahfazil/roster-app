import { resolveUserRole, supabase } from '@/src/lib/supabase';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const hasRouted = useRef(false);

  useEffect(() => {
    // ✅ Correct readiness guard (TypeScript + Expo Router safe)
    if (segments[0] === undefined) return;

    // Prevent redirect loops
    if (hasRouted.current) return;
    hasRouted.current = true;

    const guard = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

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
        return;
      }

      // =========================
      // LOGGED IN → ROLE CHECK
      // =========================
      const role = await resolveUserRole();

      if (role.state === 'admin') {
        if (!inAdmin) {
          router.replace('/(admin)/dashboard');
        }
        return;
      }

      if (role.state === 'employee') {
        if (!inEmployee) {
          router.replace('/(employee)/roster');
        }
        return;
      }

      // =========================
      // BLOCKED / FALLBACK
      // =========================
      router.replace('/(auth)/login');
    };

    guard();
  }, [segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
