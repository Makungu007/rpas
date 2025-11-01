import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ID"
        keyboardType="default"
        autoCapitalize="none"
      />
       <TextInput
        style={styles.input}
        placeholder="Enter Password"
        keyboardType="default"
        autoCapitalize="none"
      />
      
      <TouchableOpacity style={styles.loginButton} >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#222f3e',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#8395a7',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  roleButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8395a7',
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  selectedRole: {
    backgroundColor: '#54a0ff',
    borderColor: '#54a0ff',
  },
  roleText: {
    fontSize: 18,
    color: '#222f3e',
  },
  loginButton: {
    backgroundColor: '#222f3e',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
