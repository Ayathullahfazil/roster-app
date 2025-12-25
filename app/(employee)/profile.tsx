import { signOut } from '@/src/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployeeProfileScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  /* ---------- THEME TOKENS ---------- */
  const colors = {
    bg: isDark ? '#121212' : '#f6f6f6',
    card: isDark ? '#1f1f1f' : '#ffffff',
    elevated: isDark ? '#2a2a2a' : '#eef2f7',
    border: isDark ? '#2a2a2a' : '#e5e7eb',

    textPrimary: isDark ? '#ffffff' : '#111827',
    textSecondary: isDark ? '#a1a1aa' : '#6b7280',
    textMuted: isDark ? '#888888' : '#9ca3af',

    primary: '#3b82f6',
    danger: '#e11d48',
    success: '#22c55e',
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ================= PROFILE HEADER ================= */}
        <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: colors.elevated },
            ]}
          />

          <Text style={[styles.name, { color: colors.textPrimary }]}>
            Jane Doe
          </Text>

          <Text style={[styles.subText, { color: colors.textSecondary }]}>
            Security Officer
          </Text>

          <View style={styles.roleRow}>
            <View style={[styles.rolePillPrimary, { backgroundColor: colors.primary }]}>
              <Text style={styles.roleTextPrimary}>On Shift</Text>
            </View>
          </View>

          <Pressable
            style={styles.editLink}
            onPress={() => router.push('/(employee)/edit')}
          >
            <Text style={[styles.editText, { color: colors.primary }]}>
              Edit Profile
            </Text>
          </Pressable>
        </View>

        {/* ================= DOCUMENTS ================= */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Documents & Certifications
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {['Security License', 'First Aid Certificate', 'ID Verification'].map(
            (item, idx) => (
              <Row
                key={item}
                label={item}
                isLast={idx === 2}
                colors={colors}
              />
            )
          )}
        </View>

        {/* ================= PROFILE DETAILS ================= */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Profile Details
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Field label="Full Name" value="Jane Doe" colors={colors} />
          <Field label="Role" value="Security Officer" colors={colors} />
          <Field label="Phone" value="0412 345 678" colors={colors} />
          <Field
            label="Email"
            value="jane.doe@email.com"
            disabled
            colors={colors}
          />
        </View>

        {/* ================= ACCOUNT ACTIONS ================= */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Account Actions
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {[
            'App Settings',
            'Change Password',
            'Notification Settings',
            'Support / Help Center',
            'Report an Issue',
          ].map((item, idx) => (
            <Row
              key={item}
              label={item}
              danger={item === 'Report an Issue'}
              isLast={idx === 4}
              colors={colors}
            />
          ))}
        </View>

        {/* ================= LOGOUT ================= */}
        <Pressable
          style={[styles.logoutBtn, { backgroundColor: colors.elevated }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>
            Logout
          </Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= COMPONENTS ================= */

function Row({
  label,
  isLast,
  danger,
  colors,
}: {
  label: string;
  isLast?: boolean;
  danger?: boolean;
  colors: any;
}) {
  return (
    <View
      style={[
        styles.row,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border },
      ]}
    >
      <Text
        style={{
          color: danger ? colors.danger : colors.textPrimary,
          fontWeight: '500',
        }}
      >
        {label}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={colors.textSecondary}
      />
    </View>
  );
}

function Field({
  label,
  value,
  disabled,
  colors,
}: {
  label: string;
  value: string;
  disabled?: boolean;
  colors: any;
}) {
  return (
    <View style={styles.field}>
      <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <View
        style={[
          styles.fieldBox,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: disabled ? 0.7 : 1,
          },
        ]}
      >
        <Text
          style={{
            color: disabled ? colors.textSecondary : colors.textPrimary,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },

  profileCard: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginBottom: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },

  subText: {
    fontSize: 14,
    marginBottom: 12,
  },

  roleRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },

  rolePillPrimary: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },

  roleTextPrimary: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },

  editLink: {
    marginTop: 6,
  },

  editText: {
    fontWeight: '600',
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  card: {
    borderRadius: 18,
    marginBottom: 24,
    overflow: 'hidden',
  },

  
  row: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  field: {
    padding: 16,
  },

  fieldLabel: {
    marginBottom: 6,
  },

  fieldBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },

  logoutBtn: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  logoutText: {
    fontWeight: '700',
  },
});
