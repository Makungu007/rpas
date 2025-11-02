import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

export default function StudentHomeScreen() {
  const [program, setProgram] = useState<string>('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
          <Text style={styles.title}>Choose Your Program</Text>
          <Text style={styles.subtitle}>Select a program of study to continue</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Undergraduate Program</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={program}
              onValueChange={setProgram}
              dropdownIconColor="#E8EEF2"
              style={styles.picker}
            >
              <Picker.Item label="Select a program..." value="" color="#9AA0A6" />
              <Picker.Item label="BSc Computer Science" value="bsc_cs" />
              <Picker.Item label="BBA Business Administration" value="bba_ba" />
              <Picker.Item label="BEng Electrical Engineering" value="beng_ee" />
              <Picker.Item label="BEng Mechanical Engineering" value="beng_me" />
              <Picker.Item label="BSc Nursing" value="bsc_nursing" />
              <Picker.Item label="BA Psychology" value="ba_psych" />
              <Picker.Item label="BEd Education" value="bed_edu" />
              <Picker.Item label="BA Economics" value="ba_econ" />
            </Picker>
          </View>

          <View style={[styles.button, !program && styles.buttonDisabled]}>
            <Text style={styles.buttonText}>Continue</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>You can change this later in Settings.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B141A',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E9EEF2',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#A8B0B6',
  },
  card: {
    backgroundColor: '#0F1C24',
    padding: 16,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#19303D',
  },
  sectionTitle: {
    color: '#B8C2C8',
    fontSize: 13,
    marginBottom: 10,
  },
  pickerWrapper: {
    backgroundColor: '#122530',
    borderWidth: 1,
    borderColor: '#1E3A49',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
  },
  picker: {
    color: '#E8EEF2',
  },
  button: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1F7A8C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#245D69',
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    marginTop: 18,
  },
  footerText: {
    color: '#6E7F88',
    fontSize: 12,
    textAlign: 'center',
  },
});
