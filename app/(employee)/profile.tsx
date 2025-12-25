import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from 'react-native';

export default function AdminProfile() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const colors = {
    bg: isDark ? '#121212' : '#f6f6f6',
    card: isDark ? '#1f1f1f' : '#ffffff',
    elevated: isDark ? '#2a2a2a' : '#eef2f7',

    textPrimary: isDark ? '#ffffff' : '#111827',
    textSecondary: isDark ? '#a1a1aa' : '#6b7280',
    textMuted: isDark ? '#888888' : '#9ca3af',

    primary: '#3b82f6',
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
            style={[styles.backBtn, { backgroundColor: colors.elevated }]}
          >
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </Pressable>

          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            User Profile
          </Text>

          <Pressable>
            <Text style={[styles.editText, { color: colors.primary }]}>
              Edit
            </Text>
          </Pressable>
        </View>

        {/* PROFILE CARD */}
        <View
          style={[styles.profileCard, { backgroundColor: colors.card }]}
        >
          <View style={styles.avatar} />

          <Text style={[styles.name, { color: colors.textPrimary }]}>
            Sarah Jenkins
          </Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            sarah.jenkins@company.com
          </Text>

          <View style={styles.roleRow}>
            <View
              style={[
                styles.rolePillPrimary,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.roleTextPrimary}>Admin</Text>
            </View>
            <View
              style={[styles.rolePill, { backgroundColor: colors.elevated }]}
            >
              <Text style={[styles.roleText, { color: colors.textPrimary }]}>
                Manager
              </Text>
            </View>
          </View>
        </View>

        {/* BASIC INFO */}
        <Section title="Basic Information" colors={colors}>
          <Field label="Full Name" value="Sarah Jenkins" colors={colors} />
          <Field
            label="Email Address"
            value="sarah.jenkins@company.com"
            locked
            colors={colors}
          />
          <Field label="Phone Number" value="+1 (555) 123-4567" colors={colors} />

          <View style={styles.row}>
            <SmallField label="Employee ID" value="EMP-2023-001" colors={colors} />
            <SmallField label="Joined Date" value="Oct 12, 2022" colors={colors} />
          </View>
        </Section>

        {/* ROLES */}
        <Section title="Roles & Access" colors={colors}>
          <Field label="Primary Role" value="Admin" colors={colors} />

          <View style={styles.roleRow}>
            <View
              style={[styles.rolePill, { backgroundColor: colors.elevated }]}
            >
              <Text style={[styles.roleText, { color: colors.textPrimary }]}>
                Manager ✕
              </Text>
            </View>

            <View
              style={[
                styles.addRolePill,
                { borderColor: colors.primary },
              ]}
            >
              <Text style={[styles.addRoleText, { color: colors.primary }]}>
                + Add Role
              </Text>
            </View>
          </View>

          <Text style={[styles.helperText, { color: colors.textMuted }]}>
            Hierarchy: Admin → Manager → User
          </Text>

          <View style={styles.permissionRow}>
            <Permission label="Roster Management" colors={colors} />
            <Permission label="Approvals" colors={colors} />
            <Permission label="System Config" muted colors={colors} />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- COMPONENTS ---------- */

function Section({ title, children, colors }: any) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Field({ label, value, locked, colors }: any) {
  return (
    <View style={[styles.field, { backgroundColor: colors.card }]}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <View style={styles.fieldRow}>
        <Text style={[styles.value, { color: colors.textPrimary }]}>
          {value}
        </Text>
        {locked && (
          <Ionicons name="lock-closed" size={14} color={colors.textMuted} />
        )}
      </View>
    </View>
  );
}

function SmallField({ label, value, colors }: any) {
  return (
    <View style={[styles.smallField, { backgroundColor: colors.card }]}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
    </View>
  );
}

function Permission({ label, muted, colors }: any) {
  return (
    <View
      style={[
        styles.permission,
        {
          backgroundColor: muted ? colors.elevated : colors.primary,
        },
      ]}
    >
      <Text style={styles.permissionText}>{label}</Text>
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    padding: 6,
    borderRadius: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  editText: { fontWeight: '600' },

  profileCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#999',
    marginBottom: 12,
  },
  name: { fontSize: 20, fontWeight: '700' },
  email: { marginTop: 4 },

  roleRow: { flexDirection: 'row', gap: 8, marginTop: 12 },

  rolePillPrimary: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  roleTextPrimary: { color: '#fff', fontWeight: '600' },

  rolePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  roleText: {},

  addRolePill: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  addRoleText: { fontWeight: '600' },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },

  field: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  label: { marginBottom: 4 },
  value: { fontWeight: '600' },
  fieldRow: { flexDirection: 'row', justifyContent: 'space-between' },

  row: { flexDirection: 'row', gap: 12 },
  smallField: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
  },

  helperText: { marginTop: 6 },

  permissionRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  permission: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  permissionText: { color: '#fff', fontSize: 12 },
});
