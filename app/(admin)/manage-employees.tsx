import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

type Employee = {
  id: number;
  full_name: string;
  role: string;
  status: string;
};

export default function ManageEmployeesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('id, full_name, role, status')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setEmployees(data);
      }

      setLoading(false);
    };

    loadEmployees();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, isDark && styles.darkBg]}>
        <Text style={isDark && styles.darkText}>Loading employees…</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark && styles.darkBg]}>
      {/* Back Button */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={[styles.backText, isDark && styles.darkText]}>
          ← Back
        </Text>
      </Pressable>

      <Text style={[styles.title, isDark && styles.darkText]}>
        Manage Employees
      </Text>

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, isDark && styles.darkCard]}>
            <Text style={[styles.name, isDark && styles.darkText]}>
              {item.full_name}
            </Text>
            <Text style={isDark && styles.darkMuted}>
              Role: {item.role}
            </Text>
            <Text style={isDark && styles.darkMuted}>
              Status: {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  darkBg: {
    backgroundColor: '#1c1c1e',
  },
  backBtn: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  darkMuted: {
    color: '#aaa',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
  },
  darkCard: {
    backgroundColor: '#2c2c2e',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
