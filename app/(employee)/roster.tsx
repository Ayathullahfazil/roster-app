import { signOut } from '@/src/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

type Tab = 'daily' | 'weekly' | 'monthly';

export default function EmployeeRosterScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const colors = {
    bgPrimary: isDark ? '#0b1220' : '#f5f7fb',
    bgCard: isDark ? '#1c2636' : '#ffffff',
    bgElevated: isDark ? '#243044' : '#eef2f7',

    textPrimary: isDark ? '#ffffff' : '#111827',
    textSecondary: isDark ? '#cbd5e1' : '#4b5563',
    textMuted: isDark ? '#94a3b8' : '#9ca3af',
    textInverse: '#ffffff',

    primary: '#2563eb',
    calendarDot: '#22c55e',
  };

  const router = useRouter();

  const handleLogout = async () => {
   await signOut();
    router.replace('/(auth)/login');
  };


  /* ================== NEW (for sticky sync) ================== */
  const scrollRef = useRef<ScrollView>(null);
  const dailyY = useRef(0);
  const weeklyY = useRef(0);
  const monthlyY = useRef(0);
  /* =========================================================== */

  const [activeTab, setActiveTab] = useState<Tab>('daily');

  /* ================== NEW (scroll → tab sync) ================== */
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;

    if (y >= monthlyY.current - 120) {
      setActiveTab('monthly');
    } else if (y >= weeklyY.current - 120) {
      setActiveTab('weekly');
    } else {
      setActiveTab('daily');
    }
  };
  /* ============================================================ */

      return (
        <SafeAreaView
          style={[styles.safe, { backgroundColor: colors.bgPrimary }]}
         edges={['top']}
       >

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={26} color={colors.textPrimary} />
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Roster
        </Text>
        <View style={styles.headerRight}>
          <Ionicons name="settings-outline" size={22} color={colors.textPrimary} />
          <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        {(['daily', 'weekly', 'monthly'] as Tab[]).map((t) => (
          <Pressable
            key={t}
            onPress={() => {
              setActiveTab(t);
              scrollRef.current?.scrollTo({
                y:
                  t === 'daily'
                    ? dailyY.current
                    : t === 'weekly'
                    ? weeklyY.current
                    : monthlyY.current,
                animated: true,
              });
            }}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === t ? colors.primary : colors.bgElevated,
              },
            ]}
          >
            <Text
              style={{
                color:
                  activeTab === t ? colors.textInverse : colors.textSecondary,
                fontWeight: '600',
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

            <ScrollView
         ref={scrollRef}
         onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
      >


        {/* ================= DAILY ================= */}
        <View onLayout={(e) => (dailyY.current = e.nativeEvent.layout.y)}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chevron-back" size={22} color={colors.textMuted} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Thursday, 18 July
            </Text>
            <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
          </View>

          <Card colors={colors}>
            <Text style={[styles.time, { color: colors.textPrimary }]}>
              09:00 – 17:00
            </Text>
            <Text style={{ color: colors.textSecondary }}>
              Security Officer
            </Text>

            <View
              style={[
                styles.imagePlaceholder,
                { backgroundColor: colors.bgElevated },
              ]}
            >
              <Ionicons name="navigate-outline" size={28} color={colors.textMuted} />
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={16} color={colors.textMuted} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                Security Officer
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="document-text-outline" size={16} color={colors.textMuted} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                Regular patrol duties. West entrance code #5566.
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={16} color={colors.textMuted} />
              <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                Ops Contact: 0412 345 678
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.bgElevated }]} />

            <View style={styles.detailRowBetween}>
              <Text style={{ color: colors.textSecondary }}>
                Welfare Check Required
              </Text>
              <Text style={{ color: '#22c55e', fontWeight: '700' }}>ON</Text>
            </View>

            <View style={styles.detailRowBetween}>
              <Text style={{ color: colors.textSecondary }}>
                Patrol Interval
              </Text>
              <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                60 mins
              </Text>
            </View>

            <View style={styles.detailRowBetween}>
              <Text style={{ color: colors.textSecondary }}>
                Location Mode Policy
              </Text>
              <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                On-Site Geofence
              </Text>
            </View>

            <View style={styles.actionRow}>
              <Pressable
                style={[
                  styles.secondaryBtn,
                  { backgroundColor: colors.bgElevated },
                ]}
              >
                <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                  Time-Off / Transfer
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.primaryBtn,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.primaryBtnText}>Start Shift</Text>
              </Pressable>
            </View>
          </Card>
        </View>

        {/* ================= WEEKLY ================= */}
        <View onLayout={(e) => (weeklyY.current = e.nativeEvent.layout.y)}>
          <SectionHeader title="Weekly · Jul 15 – Jul 21" arrows colors={colors} />
            

          <View
            style={[
              styles.weeklySummary,
              { backgroundColor: colors.primary },
            ]}
          >
            <SummaryItem label="Hours" value="38" colors={colors} />
            <SummaryItem label="Shifts" value="6" colors={colors} />
            <SummaryItem label="Pending" value="1" colors={colors} />
          </View>

          {[
            'Mon · CBD Office Tower · Security Officer',
            'Tue · City Retail Centre · Patrol Guard',
            'Wed · City Retail Centre · Patrol Guard',
            'Thu · Eastside Depot · Security Guard',
            'Fri · West Mall · Supervisor',
            'Fri · West Mall · Night Patrol',
          ].map((item) => (
            <Card key={item} colors={colors}>
              <Text style={{ color: colors.textPrimary }}>
               {item.replace(
                 /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/,
               (d) => d.toUpperCase()
            )}
          </Text>


            </Card>
          ))}
        </View>

        {/* ================= MONTHLY ================= */}
        <View onLayout={(e) => (monthlyY.current = e.nativeEvent.layout.y)}>
          <SectionHeader title="July 2024" arrows colors={colors} />

        {/* ✅ NEW: weekday row */}
                <View style={styles.weekdayRow}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
                       <Text
                         key={d}
                         style={[styles.weekdayText, { color: colors.textMuted }]}
                      >
                         {d}
                       </Text>
                       ))}
                    </View>

          <View style={styles.calendar}>
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const shifts =
                day === 8 || day === 29 ? 2 :
                day === 3 || day === 18 ? 1 : 0;

              return (
                <View key={day} style={styles.calendarCell}>
                  <Text
                    style={{
                      color: shifts ? colors.textPrimary : colors.textMuted,
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    {day}
                  </Text>

                  {shifts > 0 && (
                    <View
                      style={[
                        styles.shiftDot,
                        { backgroundColor: colors.calendarDot, marginTop: 6 },
                      ]}
                    >
                      {shifts > 1 && (
                        <Text style={{ color: colors.textInverse, fontSize: 11 }}>
                          {shifts}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
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

/* ---------- COMPONENTS ---------- */

function SectionHeader({ title, arrows, colors }: any) {
  return (
    <View style={styles.sectionHeader}>
      {arrows && (
        <Ionicons name="chevron-back" size={22} color={colors.textMuted} />
      )}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        {title}
      </Text>
      {arrows && (
        <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
      )}
    </View>
  );
}

function Card({ children, colors }: any) {
  return (
    <View style={[styles.card, { backgroundColor: colors.bgCard }]}>
      {children}
    </View>
  );
}

function SummaryItem({ label, value, colors }: any) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: colors.textInverse, fontSize: 22, fontWeight: '700' }}>
        {value}
      </Text>
      <Text style={{ color: colors.textInverse }}>{label}</Text>
    </View>
  );


}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1 },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  headerRight: { flexDirection: 'row', gap: 12 },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
  },

  sectionHeader: {
    marginTop: 24,
    marginBottom: 45,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
  },

  time: { fontSize: 18, fontWeight: '700' },

  imagePlaceholder: {
    height: 140,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  detailText: {
    flex: 1,
  },

  divider: {
    height: 1,
    marginVertical: 12,
  },

  detailRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#ffffff', fontWeight: '700' },

  weeklySummary: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  calendar: {
  paddingHorizontal: 16,
  flexDirection: 'row',
  flexWrap: 'wrap',
},

  calendarCell: {
  width: '14.2857%', // ⬅️ exact 7-column grid (100 / 7)
  height: 56,
  marginBottom: 12,
  alignItems: 'center',
  justifyContent: 'flex-start',
},

  shiftDot: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

weekdayRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  marginBottom: 42, // ✅ THIS creates visible space before dates
},

weekdayText: {
  width: '13%',        // ✅ forces perfect alignment with calendar columns
  textAlign: 'center',
  fontSize: 18,        // ✅ bigger than date numbers
  fontWeight: '700',   // ✅ bold
},


dayLabel: {
  width: '13%',           // matches calendarCell width
  textAlign: 'center',
  fontSize: 1,           // 👈 slightly bigger than dates
  fontWeight: '700',      // 👈 bold
},


logoutBtn: {
  marginTop: 20,
  marginHorizontal: 16,
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
