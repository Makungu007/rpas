import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getCurrentUser } from '../storage/userStore';
import { getSubmissionById, submitFeedback, Submission } from '../storage/submissionStore';

export default function LecturerFeedbackScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'LecturerFeedback'>>();
  const navigation = useNavigation();
  const { submissionId } = route.params;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [decision, setDecision] = useState<'approved' | 'changes_requested'>('approved');
  const [comments, setComments] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getSubmissionById(submissionId).then(setSubmission).catch(() => setSubmission(null));
  }, [submissionId]);

  const openFile = async (uri?: string | null) => {
    if (!uri) {
      Alert.alert('Missing file', 'No URI available for this file.');
      return;
    }
    try {
      await Linking.openURL(uri);
    } catch (e) {
      Alert.alert('Unable to open', 'Could not open this file on your device.');
    }
  };

  const onSubmitFeedback = async () => {
    try {
      setBusy(true);
      const user = await getCurrentUser();
      if (!user || user.role !== 'supervisor') throw new Error('Only supervisors can submit feedback');
      const updated = await submitFeedback(submissionId, user.id, decision, comments);
      setSubmission(updated);
      Alert.alert('Saved', 'Feedback submitted.');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Failed to submit feedback');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Review Document</Text>
          <Text style={styles.subtitle}>Preview the document and provide your feedback</Text>
        </View>

        {!submission ? (
          <View style={styles.metaCard}><Text style={styles.emptySub}>Loading...</Text></View>
        ) : (
          <>
            <View style={styles.metaCard}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Student</Text>
                <Text style={styles.metaValue}>{submission.studentId}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Program</Text>
                <Text style={styles.metaValue}>{submission.program.replace('_', ' ')}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Submitted</Text>
                <Text style={styles.metaValue}>{new Date(submission.createdAt).toLocaleString()}</Text>
              </View>
            </View>

            <View style={styles.previewCard}>
              <Text style={styles.sectionTitle}>Description</Text>
              <View style={styles.previewBox}>
                <Text style={{ color: '#E8EEF2' }}>{submission.description || 'No description'}</Text>
              </View>

              <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Files</Text>
              {submission.files.length === 0 ? (
                <Text style={styles.emptySub}>No files attached.</Text>
              ) : (
                submission.files.map((f, idx) => (
                  <View key={`${f.name}-${idx}`} style={styles.fileRow}>
                    <View>
                      <Text style={styles.fileName}>{f.name}</Text>
                      <Text style={styles.fileMeta}>{[f.mimeType || 'Unknown', typeof f.size === 'number' ? `${Math.round(f.size / 1024)} KB` : 'Unknown size'].join(' • ')}</Text>
                    </View>
                    <TouchableOpacity style={styles.openBtn} onPress={() => openFile(f.uri)}>
                      <Text style={styles.openBtnText}>Open</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>

            <View style={styles.feedbackCard}>
              <Text style={styles.sectionTitle}>Feedback</Text>

              <View style={styles.decisionRow}>
                <TouchableOpacity onPress={() => setDecision('approved')} style={[styles.decisionChip, decision === 'approved' && styles.decisionActive]}>
                  <Text style={[styles.decisionText, decision === 'approved' && styles.decisionTextActive]}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDecision('changes_requested')} style={[styles.decisionChip, decision === 'changes_requested' && styles.decisionActive]}>
                  <Text style={[styles.decisionText, decision === 'changes_requested' && styles.decisionTextActive]}>Request Changes</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Comments</Text>
              <TextInput
                style={styles.textarea}
                placeholder="Write your feedback here"
                placeholderTextColor="#8B9AA2"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={comments}
                onChangeText={setComments}
              />

              <View style={styles.actionsRow}>
                <TouchableOpacity disabled={busy} onPress={onSubmitFeedback} style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>{busy ? 'Saving...' : 'Submit Feedback'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B141A' },
  container: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 28 },
  header: { marginBottom: 12 },
  title: { color: '#E9EEF2', fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#A8B0B6', fontSize: 13, marginTop: 4 },
  metaCard: { backgroundColor: '#0F1C24', borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: '#19303D', padding: 14, marginBottom: 14 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  metaLabel: { color: '#8FA0A8', fontSize: 12 },
  metaValue: { color: '#E8EEF2', fontWeight: '600' },
  previewCard: { backgroundColor: '#0F1C24', borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: '#19303D', padding: 14, marginBottom: 14 },
  sectionTitle: { color: '#B8C2C8', fontSize: 13, marginBottom: 10 },
  previewBox: { backgroundColor: '#0D1720', borderRadius: 12, borderWidth: 1, borderColor: '#1E3A49', padding: 12 },
  fileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#122530', borderWidth: 1, borderColor: '#1E3A49', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 8 },
  fileName: { color: '#E8EEF2', fontWeight: '700' },
  fileMeta: { color: '#8FA0A8', fontSize: 12, marginTop: 2 },
  openBtn: { backgroundColor: '#153848', borderWidth: 1, borderColor: '#1F7A8C', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 },
  openBtnText: { color: '#D5E7ED', fontSize: 12, fontWeight: '700' },
  feedbackCard: { backgroundColor: '#0F1C24', borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: '#19303D', padding: 14 },
  decisionRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  decisionChip: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#0F1C24', borderWidth: 1, borderColor: '#1E3A49', borderRadius: 999 },
  decisionActive: { backgroundColor: '#153848', borderColor: '#1F7A8C' },
  decisionText: { color: '#B8C2C8', fontSize: 12, fontWeight: '700' },
  decisionTextActive: { color: '#E7F5FA' },
  inputLabel: { color: '#8FA0A8', fontSize: 12, marginBottom: 6 },
  textarea: { minHeight: 120, borderRadius: 12, backgroundColor: '#122530', borderWidth: 1, borderColor: '#1E3A49', padding: 12, color: '#E8EEF2' },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  primaryButton: { flex: 1, height: 48, borderRadius: 12, backgroundColor: '#1F7A8C', alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  emptySub: { color: '#8FA0A8', fontSize: 12 },
});
