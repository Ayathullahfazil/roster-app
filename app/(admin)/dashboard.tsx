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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  /* ---------------- State ---------------- */
  const [editMode, setEditMode] = useState(false);
  const jiggleAnim = useRef(new Animated.Value(0)).current;

  const [showShifts, setShowShifts] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);

  /* ---------------- Jiggle Animation ---------------- */
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
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: isDark ? '#121212' : '#f6f6f6' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* ---------------- Header ---------------- */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            Dashboard
          </Text>
          <View style={styles.headerIcons}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={isDark ? '#fff' : '#000'}
            />
            <Pressable onPress={() => router.push('/profile')}>
              <Ionicons name="person-circle-outline" size={26} color="#fff" />
            </Pressable>

          </View>
        </View>

        {/* ---------------- Stats ---------------- */}
        <View style={styles.grid}>
          {[
            { label: 'Active Shifts', value: 12, icon: 'shield-checkmark' },
            { label: 'Pending Requests', value: 5, icon: 'time' },
            { label: 'Active Incidents', value: 3, icon: 'alert' },
            { label: 'Offline Officers', value: 2, icon: 'help' },
          ].map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Ionicons name={item.icon as any} size={20} color="#3b82f6" />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* ---------------- Sections ---------------- */}
        <Section
          title="Today's Shifts"
          open={showShifts}
          onToggle={() => setShowShifts(!showShifts)}
          isDark={isDark}
        >
          <DummyRow
            title="John Smith"
            subtitle="08:00–16:00 @ Main Site"
            tag="Active"
          />
          <DummyRow
            title="Jane Doe"
            subtitle="10:00–18:00 @ West Gate"
            tag="Scheduled"
          />
        </Section>

        <Section
          title="Alerts & Issues"
          open={showAlerts}
          onToggle={() => setShowAlerts(!showAlerts)}
          isDark={isDark}
        >
          <DummyRow title="Missed Welfare Checks" tag="2" />
          <DummyRow title="Patrol Log Issues" tag="4" />
        </Section>

        <Section
          title="Recent Incidents"
          open={showIncidents}
          onToggle={() => setShowIncidents(!showIncidents)}
          isDark={isDark}
        >
          <DummyRow
            title="Unauthorized Access"
            subtitle="Main Gate · 14:32"
            tag="High"
          />
          <DummyRow
            title="Suspicious Activity"
            subtitle="Parking Lot B"
            tag="Medium"
          />
        </Section>

        {/* ---------------- Quick Actions ---------------- */}
        <View style={styles.quickHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#fff' : '#000' },
            ]}
          >
            Quick Actions
          </Text>

          {/* ✅ Pencil icon FIXED */}
          <Pressable onPress={() => setEditMode(!editMode)}>
            <Ionicons
              name={editMode ? 'checkmark' : 'pencil'}
              size={20}
              color="#3b82f6"
            />
          </Pressable>
        </View>

        <View style={styles.actionsGrid}>
          {[
            { label: 'Create Shift', icon: 'add-circle' },
            { label: 'Create Roster', icon: 'calendar' },
            { label: 'Create Site', icon: 'business' },
            { label: 'Invite User', icon: 'person-add' },
            {
              label: 'Manage Employees',
              icon: 'people',
              route: '/manage-employees',
            },
            { label: 'Live Map', icon: 'map' },
          ].map((a) => (
            <Animated.View
              key={a.label}
              style={[styles.animatedCard, editMode && jiggleStyle]}
            >
              <Pressable
                style={styles.actionCard}
                onPress={() =>
                  !editMode && a.route && router.push(a.route as any)
                }
              >
                <Ionicons name={a.icon as any} size={26} color="#3b82f6" />
                <Text style={styles.actionText}>{a.label}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* ---------------- Logout ---------------- */}
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#e11d48" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

function Section({
  title,
  open,
  onToggle,
  children,
  isDark,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Pressable style={styles.sectionHeader} onPress={onToggle}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? '#fff' : '#000' },
          ]}
        >
          {title}
        </Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#999"
        />
      </Pressable>
      {open && <View>{children}</View>}
    </View>
  );
}

function DummyRow({
  title,
  subtitle,
  tag,
}: {
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle && <Text style={styles.rowSub}>{subtitle}</Text>}
      </View>
      {tag && <Text style={styles.tag}>{tag}</Text>}
    </View>
  );
}

/* ---------------- Styles ---------------- */

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
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 16,
  },
  statValue: { fontSize: 22, fontWeight: '700', color: '#fff' },
  statLabel: { color: '#aaa', marginTop: 4 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  row: {
    backgroundColor: '#1f1f1f',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTitle: { color: '#fff', fontWeight: '600' },
  rowSub: { color: '#aaa', marginTop: 2 },
  tag: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
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

  /* 🔑 FIX: Animated wrapper owns width */
  animatedCard: {
    width: '48%',
  },

  actionCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  logoutBtn: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#fee2e2',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#e11d48',
    fontWeight: '700',
  },
});
