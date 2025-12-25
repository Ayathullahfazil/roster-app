import { signOut } from '@/src/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default function AdminDashboard() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  /* ---------- THEME ---------- */
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
  };

  /* ---------- STATE ---------- */
  const [editMode, setEditMode] = useState(false);
  const jiggleAnim = useRef(new Animated.Value(0)).current;

  const [showShifts, setShowShifts] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);

  /* ---------- ANIMATION ---------- */
  useEffect(() => {
    if (editMode) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(jiggleAnim, {
            toValue: 1,
            duration: 120,
            useNativeDriver: true,
          }),
          Animated.timing(jiggleAnim, {
            toValue: -1,
            duration: 120,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      jiggleAnim.stopAnimation();
      jiggleAnim.setValue(0);
    }
  }, [editMode]);

  const jiggleStyle = {
    transform: [
      {
        rotate: jiggleAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: ['-1.5deg', '1.5deg'],
        }),
      },
      { scale: editMode ? 0.98 : 1 },
    ],
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Dashboard
          </Text>

          <View style={styles.headerIcons}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.textPrimary}
            />
            <Pressable onPress={() => router.push('/profile')}>
              <Ionicons
                name="person-circle-outline"
                size={26}
                color={colors.textPrimary}
              />
            </Pressable>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.grid}>
          {[
            { label: 'Active Shifts', value: 12, icon: 'shield-checkmark' },
            { label: 'Pending Requests', value: 5, icon: 'time' },
            { label: 'Active Incidents', value: 3, icon: 'alert' },
            { label: 'Offline Officers', value: 2, icon: 'help' },
          ].map((item) => (
            <View
              key={item.label}
              style={[styles.statCard, { backgroundColor: colors.card }]}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                {item.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* SECTIONS */}
        <Section
          title="Today's Shifts"
          open={showShifts}
          onToggle={() => setShowShifts(!showShifts)}
          colors={colors}
        >
          <DummyRow
            title="John Smith"
            subtitle="08:00–16:00 @ Main Site"
            tag="Active"
            colors={colors}
          />
          <DummyRow
            title="Jane Doe"
            subtitle="10:00–18:00 @ West Gate"
            tag="Scheduled"
            colors={colors}
          />
        </Section>

        <Section
          title="Alerts & Issues"
          open={showAlerts}
          onToggle={() => setShowAlerts(!showAlerts)}
          colors={colors}
        >
          <DummyRow title="Missed Welfare Checks" tag="2" colors={colors} />
          <DummyRow title="Patrol Log Issues" tag="4" colors={colors} />
        </Section>

        <Section
          title="Recent Incidents"
          open={showIncidents}
          onToggle={() => setShowIncidents(!showIncidents)}
          colors={colors}
        >
          <DummyRow
            title="Unauthorized Access"
            subtitle="Main Gate · 14:32"
            tag="High"
            colors={colors}
          />
          <DummyRow
            title="Suspicious Activity"
            subtitle="Parking Lot B"
            tag="Medium"
            colors={colors}
          />
        </Section>

        {/* QUICK ACTIONS */}
        <View style={styles.quickHeader}>
          <Text
            style={[styles.sectionTitle, { color: colors.textPrimary }]}
          >
            Quick Actions
          </Text>

          <Pressable onPress={() => setEditMode(!editMode)}>
            <Ionicons
              name={editMode ? 'checkmark' : 'pencil'}
              size={20}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <View style={styles.actionsGrid}>
          {[
            { label: 'Create Shift', icon: 'add-circle' },
            { label: 'Create Roster', icon: 'calendar' },
            { label: 'Create Site', icon: 'business' },
            { label: 'Invite User', icon: 'person-add' },
            { label: 'Manage Employees', icon: 'people', route: '/manage-employees' },
            { label: 'Live Map', icon: 'map' },
          ].map((a) => (
            <Animated.View
              key={a.label}
              style={[styles.animatedCard, editMode && jiggleStyle]}
            >
              <Pressable
                style={[styles.actionCard, { backgroundColor: colors.card }]}
                onPress={() =>
                  !editMode && a.route && router.push(a.route as any)
                }
              >
                <Ionicons
                  name={a.icon as any}
                  size={26}
                  color={colors.primary}
                />
                <Text
                  style={[styles.actionText, { color: colors.textPrimary }]}
                >
                  {a.label}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* LOGOUT */}
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

/* ---------- COMPONENTS ---------- */

function Section({
  title,
  open,
  onToggle,
  children,
  colors,
}: any) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Pressable style={styles.sectionHeader} onPress={onToggle}>
        <Text
          style={[styles.sectionTitle, { color: colors.textPrimary }]}
        >
          {title}
        </Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.textMuted}
        />
      </Pressable>
      {open && <View>{children}</View>}
    </View>
  );
}

function DummyRow({ title, subtitle, tag, colors }: any) {
  return (
    <View
      style={[styles.row, { backgroundColor: colors.card }]}
    >
      <View>
        <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.rowSub, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {tag && (
  <View
    style={[
      styles.tag,
      { backgroundColor: colors.elevated },
    ]}
  >
    <View style={styles.tagInner}>
      <Text
        style={[
          styles.tagText,
          { color: colors.textPrimary },
        ]}
      >
        {tag}
      </Text>
    </View>
  </View>
)}
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
    marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: '700' },
  headerIcons: { flexDirection: 'row', gap: 14 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
  },
  statValue: { fontSize: 22, fontWeight: '700' },
  statLabel: { marginTop: 4 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700' },

  row: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTitle: { fontWeight: '600' },
  rowSub: { marginTop: 2 },

  tag: {
  minHeight: 28,
  minWidth: 72,
  paddingHorizontal: 12,
  borderRadius: 999,

  justifyContent: 'center',
  alignSelf: 'center',
},

tagInner: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},


 tagText: {
  fontSize: 12,
  fontWeight: '600',
  textAlign: 'center',
},



  quickHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  animatedCard: { width: '48%' },

  actionCard: {
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },

  logoutBtn: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: { fontWeight: '700' },
});
