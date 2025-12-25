import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditEmployeeProfile() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  /* ========= LOCKED EMPLOYEE THEME ========= */
  const colors = {
    bgPrimary: '#121212',
    bgCard: '#1f1f1f',
    bgElevated: '#2a2a2a',

    textPrimary: '#ffffff',
    textSecondary: '#a1a1aa',
    textMuted: '#6b7280',

    primary: '#2563eb',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ================= Header ================= */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </Pressable>

          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Edit Profile
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* ================= Editable Section ================= */}
        <View style={[styles.card, { backgroundColor: colors.bgCard }]}>
          <Field
            label="Phone Number"
            value="(555) 123-4567"
            icon="call-outline"
            colors={colors}
          />

          <Field
            label="Emergency Contact Name"
            value="Jane Doe"
            icon="person-outline"
            colors={colors}
          />

          <Field
            label="Emergency Contact Phone"
            value="(555) 987-6543"
            icon="people-outline"
            colors={colors}
          />
        </View>

        {/* ================= Account Info ================= */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Account Info
        </Text>

        <View style={[styles.card, { backgroundColor: colors.bgCard }]}>
          <ReadOnlyField
            label="Full Name"
            value="John Smith"
            colors={colors}
          />

          <ReadOnlyField
            label="Email Address"
            value="john.smith@company.com"
            colors={colors}
          />

          <ReadOnlyField
            label="Role"
            value="Administrator"
            colors={colors}
          />
        </View>

        {/* ================= Save ================= */}
        <Pressable
          style={[styles.saveBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.replace('/profile')}
        >
          <Text style={styles.saveText}>Save Changes</Text>
        </Pressable>

        {/* ================= Cancel ================= */}
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.cancelText, { color: colors.textSecondary }]}>
            Cancel
          </Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= Components ================= */

function Field({
  label,
  value,
  icon,
  colors,
}: any) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputRow,
          { backgroundColor: colors.bgElevated },
        ]}
      >
        <TextInput
          defaultValue={value}
          style={[styles.input, { color: colors.textPrimary }]}
        />
        <Ionicons name={icon} size={18} color={colors.textMuted} />
      </View>
    </View>
  );
}

function ReadOnlyField({
  label,
  value,
  colors,
}: any) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputRow,
          { backgroundColor: colors.bgElevated, opacity: 0.7 },
        ]}
      >
        <Text style={{ color: colors.textMuted }}>{value}</Text>
        <Ionicons
          name="lock-closed-outline"
          size={18}
          color={colors.textMuted}
        />
      </View>
    </View>
  );
}

/* ================= Styles ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  backBtn: {
    width: 40,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 6,
    fontSize: 14,
  },

  inputRow: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },

  saveBtn: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },

  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  cancelText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 15,
  },
});
