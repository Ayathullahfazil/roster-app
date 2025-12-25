import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default function ManageEmployees() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  /* ================= THEME (ADMIN) ================= */
  const colors = {
    bg: isDark ? '#121212' : '#f6f6f6',
    card: isDark ? '#1f1f1f' : '#ffffff',

    textPrimary: isDark ? '#ffffff' : '#111827',
    textSecondary: isDark ? '#a1a1aa' : '#6b7280',

    primary: '#3b82f6',
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ================= Back ================= */}
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>
            Back
          </Text>
        </Pressable>

        {/* ================= Title ================= */}
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Manage Employees
        </Text>

        {/* ================= Employee Cards ================= */}
        {[
          { name: 'Ayathullah Fazil Shaikh', role: 'admin' },
          { name: 'Admin Test', role: 'admin' },
          { name: 'Employee Test', role: 'employee' },
        ].map((e) => (
          <View
            key={e.name}
            style={[styles.card, { backgroundColor: colors.card }]}
          >
            <Text style={[styles.name, { color: colors.textPrimary }]}>
              {e.name}
            </Text>

            <Text
              style={[styles.meta, { color: colors.textSecondary }]}
            >
              Role: {e.role}
            </Text>

            <Text
              style={[styles.meta, { color: colors.textSecondary }]}
            >
              Status: active
            </Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= Styles ================= */

const styles = StyleSheet.create({
  safe: { flex: 1 },

  container: {
    padding: 16,
    paddingBottom: 32,
  },

  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  backText: {
    marginLeft: 4,
    fontSize: 15,
    fontWeight: '600',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  name: {
    fontWeight: '700',
    fontSize: 16,
  },

  meta: {
    marginTop: 4,
    fontSize: 14,
  },
});
