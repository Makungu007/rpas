import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const programs = [
  { label: 'Computer Science', value: 'cs' },
  { label: 'Information Systems', value: 'is' },
  { label: 'Software Engineering', value: 'se' },
];

const supervisors = {
  cs: [
    { id: '1', name: 'Dr. Banda' },
    { id: '2', name: 'Prof. Mwale' },
  ],
  is: [
    { id: '3', name: 'Dr. Zulu' },
    { id: '4', name: 'Prof. Phiri' },
  ],
  se: [
    { id: '5', name: 'Dr. Chirwa' },
    { id: '6', name: 'Prof. Tembo' },
  ],
};

const StudentHomeScreen = ({ route, navigation }: any) => {
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('');
  const userId = route?.params?.userId || '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome{userId ? `, ${userId}` : ''}!</Text>
      <Text style={styles.label}>Select your program:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedProgram}
          onValueChange={setSelectedProgram}
          style={styles.picker}
        >
          <Picker.Item label="-- Select Program --" value="" />
          {programs.map((prog) => (
            <Picker.Item key={prog.value} label={prog.label} value={prog.value} />
          ))}
        </Picker>
      </View>
      {selectedProgram ? (
        <>
          <Text style={styles.label}>Select your supervisor:</Text>
          <FlatList
            data={supervisors[selectedProgram]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.supervisorButton,
                  selectedSupervisor === item.id && styles.selectedSupervisor,
                ]}
                onPress={() => {
                  setSelectedSupervisor(item.id);
                  // Navigate to upload document screen after supervisor selection
                  navigation.navigate('UploadDocument');
                }}
              >
                <Text style={styles.supervisorText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#222f3e',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#222f3e',
    alignSelf: 'flex-start',
  },
  pickerWrapper: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8395a7',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  supervisorButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8395a7',
    backgroundColor: '#fff',
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
  },
  selectedSupervisor: {
    backgroundColor: '#54a0ff',
    borderColor: '#54a0ff',
  },
  supervisorText: {
    fontSize: 18,
    color: '#222f3e',
  },
});

export default StudentHomeScreen;
