import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
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
            keyboardType="email-address"
            style={styles.input}
            textContentType="emailAddress"
          />

          <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
          <TextInput
            placeholder="Your password"
            placeholderTextColor="#9AA0A6"
            style={styles.input}
            secureTextEntry={true}
            textContentType="password"
          />

          <View style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </View>

          <View style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </View>
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
