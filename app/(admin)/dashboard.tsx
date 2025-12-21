import { signOut } from '@/src/lib/supabase';
import { useRouter } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default function AdminDashboard() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.darkText]}>
          Admin Dashboard
        </Text>
        <Text style={[styles.subtitle, isDark && styles.darkMuted]}>
          Manage your workforce
        </Text>

        <Pressable
          style={[styles.logoutBtn, isDark && styles.darkLogoutBtn]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, isDark && styles.darkText]}>
            Logout
          </Text>
        </Pressable>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, isDark && styles.darkCard]}>
          <Text style={[styles.statValue, isDark && styles.darkText]}>—</Text>
          <Text style={[styles.statLabel, isDark && styles.darkMuted]}>
            Employees
          </Text>
        </View>

        <View style={[styles.statCard, isDark && styles.darkCard]}>
          <Text style={[styles.statValue, isDark && styles.darkText]}>—</Text>
          <Text style={[styles.statLabel, isDark && styles.darkMuted]}>
            Active Today
          </Text>
        </View>

        <View style={[styles.statCard, isDark && styles.darkCard]}>
          <Text style={[styles.statValue, isDark && styles.darkText]}>—</Text>
          <Text style={[styles.statLabel, isDark && styles.darkMuted]}>
            Pending Requests
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
        Quick Actions
      </Text>

      <Pressable
        style={[styles.actionBtn, isDark && styles.darkActionBtn]}
        onPress={() => router.push('/manage-employees')}
      >
        <Text style={styles.actionText}>Manage Employees</Text>
      </Pressable>

      <Pressable style={[styles.actionBtn, isDark && styles.darkActionBtn]}>
        <Text style={styles.actionText}>View Rosters</Text>
      </Pressable>

      <Pressable style={[styles.actionBtn, isDark && styles.darkActionBtn]}>
        <Text style={styles.actionText}>Time-Off Requests</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1c1c1e',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  darkText: {
    color: '#fff',
  },
  darkMuted: {
    color: '#aaa',
  },
  logoutBtn: {
    alignSelf: 'flex-end',
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  darkLogoutBtn: {
    backgroundColor: '#2c2c2e',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  darkCard: {
    backgroundColor: '#2c2c2e',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
  },
  actionBtn: {
    backgroundColor: '#2f6fed',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  darkActionBtn: {
    backgroundColor: '#3a7bfd',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
