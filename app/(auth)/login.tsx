/**
 * Login Screen
 * - Email / Password login (Supabase)
 * - Google & Apple buttons (UI only)
 * - System-based dark / light mode
 * - DOES NOT perform role checks; RootLayout will handle role redirects
 */

import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter email and password.');
      return;
    }

    setLoading(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setErrorMessage('Incorrect email or password.');
        return;
      }

      // Let RootLayout handle role-based redirect. We just go to root.
      router.replace('/');
    } catch (err) {
      setLoading(false);
      setErrorMessage('Login failed. Try again.');
    }
  };

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <Text style={[styles.title, isDark && styles.darkText]}>
        Welcome back
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        style={[styles.input, isDark && styles.darkInput]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        style={[styles.input, isDark && styles.darkInput]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <Pressable
        style={[styles.loginButton, loading && styles.disabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          {loading ? 'Logging in…' : 'Login'}
        </Text>
      </Pressable>

      <Text style={[styles.divider, isDark && styles.darkText]}>
        Or continue with
      </Text>

      <View style={styles.socialRow}>
        <Pressable style={styles.socialButton}>
          <Text style={styles.socialText}>Google</Text>
        </Pressable>

        <Pressable style={styles.socialButton}>
          <Text style={styles.socialText}>Apple</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1c1c1e',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    height: 52,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#2f6fed',
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  disabled: {
    opacity: 0.6,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff4d4f',
    marginBottom: 8,
  },
});
