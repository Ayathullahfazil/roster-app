import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default function ManageEmployees() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: isDark ? '#121212' : '#f6f6f6' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="#3b82f6" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Text style={styles.title}>Manage Employees</Text>

        {[
          { name: 'Ayathullah Fazil Shaikh', role: 'admin' },
          { name: 'Admin Test', role: 'admin' },
          { name: 'Employee Test', role: 'employee' },
        ].map((e) => (
          <View key={e.name} style={styles.card}>
            <Text style={styles.name}>{e.name}</Text>
            <Text style={styles.meta}>Role: {e.role}</Text>
            <Text style={styles.meta}>Status: active</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 16 },

  back: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backText: { color: '#3b82f6', marginLeft: 4 },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  name: { color: '#fff', fontWeight: '700', fontSize: 16 },
  meta: { color: '#aaa', marginTop: 4 },
});
