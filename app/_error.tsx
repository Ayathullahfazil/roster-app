/**
 * Global Error Boundary
 * ---------------------
 * - Catches unhandled runtime errors
 * - Prevents white screen
 * - Displays safe fallback UI
 */

import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function GlobalError({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>

      <Text style={styles.message}>
        An unexpected error occurred.
      </Text>

      {/* Show error in dev only */}
      {__DEV__ && (
        <Text style={styles.devError}>{error.message}</Text>
      )}

      <Pressable
        style={styles.button}
        onPress={() => router.replace('/(auth)/login')}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  devError: {
    color: '#cc0000',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2f6fed',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
