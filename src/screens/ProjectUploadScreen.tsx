import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { getCurrentUser, User } from '../storage/userStore';
import { submitProject, SubmissionFile } from '../storage/submissionStore';
import { saveFilePermanently } from '../storage/fileStorage';

export default function ProjectUploadScreen() {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<SubmissionFile[]>([]);
  const [busy, setBusy] = useState<'submit' | null>(null);

  const handleAddDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
        copyToCacheDirectory: true,
      });

      if ('assets' in result && Array.isArray(result.assets)) {
        // Save files permanently and get new URIs
        const permanentFiles = await Promise.all(
          result.assets.map(async (a) => {
            const tempUri = (a as any).uri;
            const fileName = a.name ?? 'Unnamed file';
            
            // Copy file to permanent storage
            const permanentUri = await saveFilePermanently(tempUri, fileName);
            
            return {
              name: fileName,
              size: a.size ?? null,
              mimeType: a.mimeType ?? null,
              uri: permanentUri, // ✅ Now a permanent URI
            };
          })
        );
        
        setFiles((prev) => [...prev, ...permanentFiles]);
      }
    } catch (e) {
      console.error('Error adding documents:', e);
      Alert.alert('Error', 'Failed to add documents. Please try again.');
    }
  };

  const handleClear = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const ensureStudentWithSelection = async (): Promise<User> => {
    const user = await getCurrentUser();
    if (!user || user.role !== 'student') throw new Error('Only students can upload');
    if (!user.program || !user.supervisorId) throw new Error('Select your program and supervisor first');
    return user;
  };

  const onSubmit = async () => {
    try {
      // Validate before locking UI
      if (!description.trim() || files.length === 0) {
        Alert.alert('Missing info', 'Add a description and at least one document.');
        return;
      }
      setBusy('submit');
      const user = await ensureStudentWithSelection();
      await submitProject({
        studentId: user.id,
        supervisorId: user.supervisorId!,
        program: user.program!,
        description,
        files,
      });
      Alert.alert('Submitted', 'Project submitted to your supervisor.');
      setDescription('');
      setFiles([]);
    } catch (e: any) {
      Alert.alert('Unable to submit', e?.message ?? 'Please try again.');
    } finally {
      setBusy(null);
    }
  };

  const submitDisabled = busy !== null || !description.trim() || files.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Upload Project</Text>
          <Text style={styles.subtitle}>Attach your project documents and details</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.label, { marginTop: 12 }]}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Briefly describe your project (objectives, scope, etc.)"
            placeholderTextColor="#8B9AA2"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>Documents</Text>
            <TouchableOpacity onPress={handleAddDocuments} style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add document</Text>
            </TouchableOpacity>
          </View>

          {files.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No documents added yet.</Text>
              <Text style={styles.emptySub}>PDF, DOCX, PPTX, ZIP and more are supported.</Text>
            </View>
          ) : (
            <View>
              {files.map((f, idx) => (
                <View key={`${f.name}-${idx}`} style={styles.fileRow}>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName} numberOfLines={1}>{f.name}</Text>
                    <Text style={styles.fileMeta}>{formatMeta(f)}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleClear(idx)} style={styles.removeBtn}>
                    <Text style={styles.removeBtnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity disabled={submitDisabled} onPress={onSubmit} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{busy === 'submit' ? 'Submitting...' : 'Submit Project'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatMeta(f: SubmissionFile) {
  const sizeKb = typeof f.size === 'number' ? `${Math.max(1, Math.round(f.size / 1024))} KB` : 'Unknown size';
  const mt = f.mimeType ? f.mimeType : 'Unknown type';
  return `${mt} • ${sizeKb}`;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B141A' },
  container: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 28 },
  header: { marginBottom: 12 },
  title: { color: '#E9EEF2', fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#A8B0B6', fontSize: 13, marginTop: 4 },
  card: { backgroundColor: '#0F1C24', borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: '#19303D', padding: 14, marginBottom: 12 },
  label: { color: '#8FA0A8', fontSize: 12, marginBottom: 6 },
  input: { height: 48, borderRadius: 12, backgroundColor: '#122530', borderWidth: 1, borderColor: '#1E3A49', paddingHorizontal: 12, color: '#E8EEF2' },
  textarea: { minHeight: 120, height: undefined, paddingTop: 12 },
  pickerWrapper: { backgroundColor: '#122530', borderWidth: 1, borderColor: '#1E3A49', borderRadius: 12, height: 48, justifyContent: 'center' },
  picker: { color: '#E8EEF2' },
  sectionTitle: { color: '#B8C2C8', fontSize: 13 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  addButton: { backgroundColor: '#153848', borderWidth: 1, borderColor: '#1F7A8C', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 },
  addButtonText: { color: '#D5E7ED', fontWeight: '700', fontSize: 12 },
  emptyBox: { backgroundColor: '#102532', borderRadius: 12, borderWidth: 1, borderColor: '#244354', padding: 14, alignItems: 'center' },
  emptyText: { color: '#C6D4DA', fontWeight: '700' },
  emptySub: { color: '#8FA0A8', fontSize: 12, marginTop: 6 },
  fileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#122530', borderWidth: 1, borderColor: '#1E3A49', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 8 },
  fileInfo: { flex: 1, paddingRight: 10 },
  fileName: { color: '#E8EEF2', fontWeight: '700' },
  fileMeta: { color: '#8FA0A8', fontSize: 12, marginTop: 2 },
  removeBtn: { backgroundColor: '#2A4A5A', borderWidth: 1, borderColor: '#3B6A7D', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 },
  removeBtnText: { color: '#D5E7ED', fontSize: 12, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  primaryButton: { flex: 1, height: 48, borderRadius: 12, backgroundColor: '#1F7A8C', alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
});
