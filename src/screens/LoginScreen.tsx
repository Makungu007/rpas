import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../storage/userStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!id || !password) {
      Alert.alert('Missing info', 'Please enter your ID and password');
      return;
    }
    try {
      setLoading(true);
      const user = await login(id.trim(), password);
      if (user.role === 'student') {
        navigation.reset({ index: 0, routes: [{ name: 'StudentHome' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'LecturerHome' }] });
      }
    } catch (e: any) {
      Alert.alert('Login failed', e?.message ?? 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.container}
      >
        <View style={styles.header}>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>ID</Text>
          <TextInput
            placeholder="BIT...."
            placeholderTextColor="#9AA0A6"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            style={styles.input}
            value={id}
            onChangeText={setId}
          />

          <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
          <TextInput
            placeholder="Your password"
            placeholderTextColor="#9AA0A6"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity disabled={loading} onPress={onLogin} style={[styles.button, loading && { opacity: 0.7 }] }>
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
          </TouchableOpacity>

          {/* <View style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </View> */}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>By continuing, you agree to our Terms and Privacy Policy.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B141A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#E9EEF2',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#A8B0B6',
  },
  form: {
    backgroundColor: '#0F1C24',
    padding: 16,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#19303D',
  },
  label: {
    fontSize: 13,
    color: '#B8C2C8',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#122530',
    borderWidth: 1,
    borderColor: '#1E3A49',
    color: '#E8EEF2',
  },
  button: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1F7A8C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  forgot: {
    alignSelf: 'center',
    marginTop: 12,
    padding: 8,
  },
  forgotText: {
    color: '#7FB3C7',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#6E7F88',
    fontSize: 12,
    textAlign: 'center',
  },
});
