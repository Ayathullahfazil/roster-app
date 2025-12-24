import { signOut } from '@/src/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text, useColorScheme, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployeeProfileScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  /* ---------- Theme Tokens ---------- */
  const colors = {
    bg: isDark ? '#121212' : '#f6f6f6',
    card: isDark ? '#1f1f1f' : '#ffffff',
    border: isDark ? '#2a2a2a' : '#e5e7eb',

    textPrimary: isDark ? '#ffffff' : '#111827',
    textSecondary: isDark ? '#a1a1aa' : '#6b7280',
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


        {/* ================= Profile Card (FIXED) ================= */}
    <View style={styles.profileCard}>
  <View style={styles.avatar} />

     <Text style={[styles.name, { color: colors.textPrimary }]}>
    Jane Doe
    </Text>

  <Text style={styles.subText}>Security Officer</Text>

  <View style={styles.roleRow}>
    <View style={styles.rolePillPrimary}>
      <Text style={styles.roleTextPrimary}>On Shift</Text>
    </View>
  </View>
</View>



        {/* ================= Documents ================= */}
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

        {/* ================= Profile Details ================= */}
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
            colors={colors}
            disabled
          />
        </View>

        {/* ================= Quick Actions ================= */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Quick Account Actions
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {[
            'App Settings',
            'Change / Reset Password',
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

        {/* ================= About ================= */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          About
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <InfoRow label="App Version" value="2.3.1 (Build 45)" colors={colors} />
          <InfoRow label="Last Sync Status" value="Today, 2:15 PM" colors={colors} />
          <InfoRow label="Device Info" value="Nokia 3310" colors={colors} />
        </View>

        {/* ================= Logout ================= */}
        <Pressable
          style={[styles.logoutBtn, { backgroundColor: '#fee2e2' }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>
            Log Out
          </Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= Components ================= */

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
      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
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
      opacity: disabled ? 0.75 : 1,
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

function InfoRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: any;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={{ color: colors.textSecondary }}>{label}</Text>
      <Text style={{ color: colors.textPrimary, fontWeight: '500' }}>
        {value}
      </Text>
    </View>
  );
}

/* ================= Styles ================= */

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },

  profileCard: {
  
  borderRadius: 18,
  paddingVertical: 24,
  paddingHorizontal: 16,
  alignItems: 'center',   // ✅ KEY FIX
  marginBottom: 24,
},


  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#3b82f6',
    marginBottom: 16,   // ⬅ space below avatar
  },

  name: {
  fontSize: 20,
  fontWeight: '700',
     // ✅ clearer on dark card
  marginBottom: 10,
},


  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,},
  dot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 13, fontWeight: '600' },

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

  field: { padding: 16 },
  fieldLabel: { marginBottom: 6 },
  fieldBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },

  infoRow: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logoutBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: { fontWeight: '700' },


email: {
  fontSize: 14,
  color: '#9ca3af',
  marginBottom: 12,
},

roleRow: {
  flexDirection: 'row',
  gap: 10,
},

rolePillPrimary: {
  backgroundColor: '#2563eb',
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 999,
},

roleTextPrimary: {
  color: '#ffffff',
  fontWeight: '600',
  fontSize: 13,
},

subText: {
  fontSize: 14,
  color: '#9ca3af',
  marginBottom: 12,
},

});
