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

export default function AdminProfileScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: isDark ? '#0f0f0f' : '#f5f5f5' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>User Profile</Text>
          <Text style={styles.editText}>Edit</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar} />
          <Text style={styles.name}>Sarah Jenkins</Text>
          <Text style={styles.email}>sarah.jenkins@company.com</Text>

          <View style={styles.roleRow}>
            <Text style={styles.roleBadge}>Admin</Text>
            <Text style={styles.roleBadgeMuted}>Manager</Text>
          </View>
        </View>

        {/* Section: Basic Information */}
        <Section title="Basic Information">
          <InfoField label="Full Name" value="Sarah Jenkins" />
          <InfoField label="Email Address" value="sarah.jenkins@company.com" locked />
          <InfoField label="Phone Number" value="+1 (555) 123-4567" />

          <View style={styles.rowSplit}>
            <InfoField label="Employee ID" value="EMP-2023-001" />
            <InfoField label="Joined Date" value="Oct 12, 2022" />
          </View>
        </Section>

        {/* Section: Roles & Access */}
        <Section title="Roles & Access">
          <InfoField label="Primary Role" value="Admin" />
          <View style={styles.chipRow}>
            <Text style={styles.chip}>Manager ✕</Text>
            <Text style={styles.addChip}>+ Add Role</Text>
          </View>
          <Text style={styles.helperText}>
            Hierarchy: Admin → Manager → User
          </Text>

          <View style={styles.permissionRow}>
            <Text style={styles.permission}>Roster Management</Text>
            <Text style={styles.permission}>Approvals</Text>
            <Text style={styles.permissionMuted}>System Config</Text>
          </View>
        </Section>

        {/* Section: Assigned Sites */}
        <Section title="Assigned Sites" rightAction="Manage">
          <View style={styles.chipRow}>
            <Text style={styles.chip}>Headquarters</Text>
            <Text style={styles.chip}>West Distribution Ctr</Text>
            <Text style={styles.chip}>NYC Office</Text>
          </View>
        </Section>

        {/* Section: Admin Settings */}
        <Section title="Admin Settings Access">
          <NavRow icon="notifications-outline" label="Notification Preferences" />
          <NavRow icon="apps-outline" label="Quick Actions Customisation" />
          <NavRow icon="bookmark-outline" label="Saved Presets" />
        </Section>

        {/* Section: Security */}
        <Section title="Security">
          <View style={styles.securityRow}>
            <Text style={styles.securityLabel}>Two-Factor Authentication</Text>
            <Text style={styles.securityStatus}>Enabled</Text>
          </View>
          <Text style={styles.helperText}>Password last changed 3 months ago</Text>
          <Text style={styles.link}>Reset Password</Text>
        </Section>

        {/* Section: Recent Activity */}
        <Section title="Recent Activity" rightAction="View All Log">
          <ActivityRow text="Updated site configuration for NYC Office" time="2 hours ago" />
          <ActivityRow text="Approved leave request for John Doe" time="Yesterday" />
          <ActivityRow text="Logged in via Mobile App" time="2 days ago" />
        </Section>

        {/* Section: Documents */}
        <Section title="Documents & Compliance">
          <View style={styles.docRow}>
            <View style={styles.docCard}>
              <Text style={styles.docValue}>12</Text>
              <Text style={styles.docLabel}>Total Docs</Text>
            </View>
            <View style={[styles.docCard, styles.docAlert]}>
              <Text style={styles.docValue}>1</Text>
              <Text style={styles.docLabel}>Expiring Soon</Text>
            </View>
          </View>
          <Text style={styles.link}>View All Documents</Text>
        </Section>

        {/* Section: Account Actions */}
        <Section title="Account Actions">
          <View style={styles.dangerBox}>
            <Text style={styles.dangerText}>Suspend Account</Text>
          </View>
          <View style={styles.neutralBox}>
            <Text style={styles.neutralText}>Deactivate Account</Text>
          </View>
        </Section>

        {/* Footer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Reusable Components ---------- */

function Section({
  title,
  rightAction,
  children,
}: {
  title: string;
  rightAction?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {rightAction && <Text style={styles.link}>{rightAction}</Text>}
      </View>
      {children}
    </View>
  );
}

function InfoField({
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
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldValue}>
        <Text style={styles.fieldText}>{value}</Text>
        {locked && <Ionicons name="lock-closed" size={14} color="#888" />}
      </View>
    </View>
  );
}

function NavRow({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={styles.navRow}>
      <Ionicons name={icon} size={20} color="#3b82f6" />
      <Text style={styles.navLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#888" />
    </View>
  );
}

function ActivityRow({ text, time }: { text: string; time: string }) {
  return (
    <View style={styles.activityRow}>
      <View style={styles.dot} />
      <View>
        <Text style={styles.activityText}>{text}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 16 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  editText: { color: '#3b82f6', fontWeight: '600' },

  profileCard: {
    alignItems: 'center',
    backgroundColor: '#161616',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#2a2a2a',
    marginBottom: 12,
  },
  name: { fontSize: 20, fontWeight: '700', color: '#fff' },
  email: { color: '#aaa', marginTop: 2 },

  roleRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  roleBadge: {
    backgroundColor: '#1d4ed8',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
  },
  roleBadgeMuted: {
    backgroundColor: '#2a2a2a',
    color: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
  },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },

  field: { marginBottom: 12 },
  fieldLabel: { color: '#aaa', marginBottom: 4 },
  fieldValue: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldText: { color: '#fff' },

  rowSplit: { flexDirection: 'row', gap: 12 },

  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
  },
  addChip: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    color: '#3b82f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
  },

  helperText: { color: '#888', fontSize: 12, marginTop: 6 },

  permissionRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  permission: {
    backgroundColor: '#14532d',
    color: '#bbf7d0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },
  permissionMuted: {
    backgroundColor: '#3f3f46',
    color: '#ddd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },

  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    backgroundColor: '#1f1f1f',
    borderRadius: 14,
    marginBottom: 10,
  },
  navLabel: { flex: 1, color: '#fff', fontWeight: '600' },

  securityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  securityLabel: { color: '#fff' },
  securityStatus: { color: '#22c55e', fontWeight: '600' },

  activityRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginTop: 6,
  },
  activityText: { color: '#fff', fontSize: 13 },
  activityTime: { color: '#888', fontSize: 11 },

  docRow: { flexDirection: 'row', gap: 12 },
  docCard: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  docAlert: { borderWidth: 1, borderColor: '#dc2626' },
  docValue: { fontSize: 20, fontWeight: '700', color: '#fff' },
  docLabel: { color: '#aaa', marginTop: 4 },

  dangerBox: {
    backgroundColor: '#3f1d1d',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  dangerText: { color: '#f87171', fontWeight: '700', textAlign: 'center' },

  neutralBox: {
    backgroundColor: '#1f1f1f',
    padding: 14,
    borderRadius: 14,
  },
  neutralText: { color: '#aaa', textAlign: 'center' },

  link: { color: '#3b82f6', fontWeight: '600' },
});
