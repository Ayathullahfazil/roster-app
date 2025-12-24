import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function AdminProfile() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </Pressable>

          <Text style={styles.headerTitle}>User Profile</Text>

          <Pressable>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar} />

          <Text style={styles.name}>Sarah Jenkins</Text>
          <Text style={styles.email}>sarah.jenkins@company.com</Text>

          <View style={styles.roleRow}>
            <View style={styles.rolePillPrimary}>
              <Text style={styles.roleTextPrimary}>Admin</Text>
            </View>
            <View style={styles.rolePill}>
              <Text style={styles.roleText}>Manager</Text>
            </View>
          </View>
        </View>

        {/* Basic Info */}
        <Section title="Basic Information">
          <Field label="Full Name" value="Sarah Jenkins" />
          <Field label="Email Address" value="sarah.jenkins@company.com" locked />
          <Field label="Phone Number" value="+1 (555) 123-4567" />

          <View style={styles.row}>
            <SmallField label="Employee ID" value="EMP-2023-001" />
            <SmallField label="Joined Date" value="Oct 12, 2022" />
          </View>
        </Section>

        {/* Roles */}
        <Section title="Roles & Access">
          <Field label="Primary Role" value="Admin" />

          <View style={styles.roleRow}>
            <View style={styles.rolePill}>
              <Text style={styles.roleText}>Manager ✕</Text>
            </View>

            <View style={styles.addRolePill}>
              <Text style={styles.addRoleText}>+ Add Role</Text>
            </View>
          </View>

          <Text style={styles.helperText}>
            Hierarchy: Admin → Manager → User
          </Text>

          <View style={styles.permissionRow}>
            <Permission label="Roster Management" />
            <Permission label="Approvals" />
            <Permission label="System Config" muted />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Field({
  label,
  value,
  locked,
}: {
  label: string;
  value: string;
  locked?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.value}>{value}</Text>
        {locked && <Ionicons name="lock-closed" size={14} color="#888" />}
      </View>
    </View>
  );
}

function SmallField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.smallField}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function Permission({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <View
      style={[
        styles.permission,
        muted && { backgroundColor: '#2a2a2a' },
      ]}
    >
      <Text style={styles.permissionText}>{label}</Text>
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#121212' },
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
    backgroundColor: '#1f1f1f',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  editText: { color: '#3b82f6', fontWeight: '600' },

  profileCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    marginBottom: 12,
  },
  name: { color: '#fff', fontSize: 20, fontWeight: '700' },
  email: { color: '#aaa', marginTop: 4 },

  roleRow: { flexDirection: 'row', gap: 8, marginTop: 12 },

  rolePillPrimary: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  roleTextPrimary: { color: '#fff', fontWeight: '600' },

  rolePill: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  roleText: { color: '#fff' },

  addRolePill: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  /* ✅ FIXED STYLE */
  addRoleText: {
    color: '#3b82f6',
    fontWeight: '600',
  },

  section: { marginBottom: 24 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  field: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  label: { color: '#aaa', marginBottom: 4 },
  value: { color: '#fff', fontWeight: '600' },
  fieldRow: { flexDirection: 'row', justifyContent: 'space-between' },

  row: { flexDirection: 'row', gap: 12 },
  smallField: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 14,
  },

  helperText: { color: '#888', marginTop: 6 },

  permissionRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  permission: {
    backgroundColor: '#166534',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  permissionText: { color: '#fff', fontSize: 12 },
});
