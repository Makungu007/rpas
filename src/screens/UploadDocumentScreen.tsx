import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const UploadDocumentScreen = ({ navigation, route }: any) => {
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState<any>(null);

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.type === 'success') {
      setDocument(result);
    }
  };

  const handleUpload = () => {
    // Placeholder for upload logic
    if (!description || !document) return;
    // navigation.navigate('NextScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Document for Review</Text>
      <Text style={styles.label}>Brief Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a brief description of the document"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handlePickDocument}>
        <Text style={styles.uploadButtonText}>
          {document ? `Selected: ${document.name}` : 'Select Document'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.submitButton, (!description || !document) && styles.disabledButton]}
        onPress={handleUpload}
        disabled={!description || !document}
      >
        <Text style={styles.submitButtonText}>Submit for Review</Text>
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
  input: {
    width: '100%',
    minHeight: 60,
    borderColor: '#8395a7',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#54a0ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#222f3e',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#b2bec3',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UploadDocumentScreen;
