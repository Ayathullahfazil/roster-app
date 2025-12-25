import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditEmployeeProfile() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  /* ================= Theme Tokens ================= */
  const colors = {
    bg: isDark ? '#0b1220' : '#f5f7fb',
    card: isDark ? '#1c2636' : '#ffffff',
    border: isDark ? '#2a3447' : '#e5e7eb',

    textPrimary: isDark ? '#ffffff' : '#111827',
    textSecondary: isDark ? '#cbd5e1' : '#6b7280',
    textMuted: isDark ? '#94a3b8' : '#9ca3af',

    primary: '#2563eb',
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ================= Header ================= */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.primary}
            />
          </Pressable>

          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Edit Profile
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* ================= Editable Fields ================= */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
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

        <View style={[styles.card, { backgroundColor: colors.card }]}>
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

        {/* ================= Save Button ================= */}
        <Pressable
          style={[styles.saveBtn, { backgroundColor: colors.primary }]}
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
}: {
  label: string;
  value: string;
  icon: any;
  colors: any;
}) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputRow,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
          },
        ]}
      >
        <TextInput
          defaultValue={value}
          style={[styles.input, { color: colors.textPrimary }]}
        />

        <Ionicons
          name={icon}
          size={18}
          color={colors.textMuted}
        />
      </View>
    </View>
  );
}

function ReadOnlyField({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: any;
}) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputRow,
          {
            borderColor: colors.border,
            backgroundColor: colors.bg,
            opacity: 0.8,
          },
        ]}
      >
        <Text style={{ color: colors.textMuted }}>
          {value}
        </Text>

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
  safe: { flex: 1 },

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
    borderWidth: 1,
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
