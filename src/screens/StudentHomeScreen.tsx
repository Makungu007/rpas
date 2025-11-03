import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getCurrentUser, getSupervisorsByProgram, Program, setStudentProgramAndSupervisor, User } from '../storage/userStore';
import { Picker } from '@react-native-picker/picker';

export default function StudentHomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [program, setProgram] = useState<Program | ''>('');
  const [supervisor, setSupervisor] = useState<string>('');
  const [supervisors, setSupervisors] = useState<User[]>([]);
  const [loadingSupers, setLoadingSupers] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCurrentUser().then(setCurrentUser).catch(() => setCurrentUser(null));
  }, []);

  useEffect(() => {
    if (!program) {
      setSupervisors([]);
      setSupervisor('');
      return;
    }
    setLoadingSupers(true);
    getSupervisorsByProgram(program)
      .then((list) => setSupervisors(list))
      .catch(() => setSupervisors([]))
      .finally(() => setLoadingSupers(false));
  }, [program]);

  const onContinue = async () => {
    if (!currentUser) {
      Alert.alert('Not logged in', 'Please log in again.');
      return;
    }
    if (!program || !supervisor) {
      Alert.alert('Missing selection', 'Please select a program and a supervisor.');
      return;
    }
    try {
      setSubmitting(true);
      await setStudentProgramAndSupervisor(currentUser.id, program, supervisor);
      Alert.alert('Saved', 'Your program and supervisor have been saved.', [
        { text: 'OK', onPress: () => navigation.navigate('ProjectUpload') },
      ]);
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Failed to save selection');
    } finally {
      setSubmitting(false);
    }
  };

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
              onValueChange={(val) => setProgram(val as Program | '')}
              dropdownIconColor="#E8EEF2"
              style={styles.picker}
            >
              <Picker.Item label="Select a program..." value="" color="#9AA0A6" />
              <Picker.Item label="Computer Science" value="computer_science" />
              <Picker.Item label="Information Systems" value="information_systems" />
            </Picker>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Supervisor</Text>
          {!program ? (
            <View style={[styles.pickerWrapper, { opacity: 0.6, justifyContent: 'center' }]}>
              <Text style={styles.placeholderText}>Select a program first</Text>
            </View>
          ) : (
            <View style={styles.pickerWrapper}>
              <Picker
                enabled={!loadingSupers}
                selectedValue={supervisor}
                onValueChange={(val) => setSupervisor(val)}
                dropdownIconColor="#E8EEF2"
                style={styles.picker}
              >
                <Picker.Item label={loadingSupers ? 'Loading supervisors...' : 'Select a supervisor...'} value="" color="#9AA0A6" />
                {supervisors.map((sup) => (
                  <Picker.Item key={sup.id} label={sup.name} value={sup.id} />
                ))}
              </Picker>
            </View>
          )}

          <TouchableOpacity onPress={onContinue} disabled={!program || !supervisor || submitting} style={[styles.button, (!program || !supervisor || submitting) && styles.buttonDisabled]}>
            <Text style={styles.buttonText}>{submitting ? 'Saving...' : 'Continue'}</Text>
          </TouchableOpacity>
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
  placeholderText: {
    color: '#8FA0A8',
    paddingHorizontal: 12,
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
