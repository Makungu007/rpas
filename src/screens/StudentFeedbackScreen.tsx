import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getSubmissionById, Submission } from '../storage/submissionStore';
import * as Sharing from 'expo-sharing';
import { File } from 'expo-file-system';

export default function StudentFeedbackScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'StudentFeedback'>>();
  const navigation = useNavigation();
  const { submissionId } = route.params;

  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    getSubmissionById(submissionId).then(setSubmission).catch(() => setSubmission(null));
  }, [submissionId]);

  const openFile = async (uri?: string | null, mimeType?: string | null) => {
    if (!uri) {
      Alert.alert('Missing file', 'No URI available for this file.');
      return;
    }

    try {
      const file = new File(uri);
      if (!file.exists) {
        Alert.alert('File not found', 'This file may have been deleted or is no longer available.');
        return;
      }

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Not supported', 'File sharing is not available on this device.');
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: mimeType || undefined,
        dialogTitle: 'Open document',
        UTI: mimeType || undefined,
      });
    } catch (e) {
      console.error('Error opening file:', e);
      Alert.alert('Unable to open', 'Could not open this file on your device.');
    }
  };

  if (!submission) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const hasNoFeedback = !submission.feedbackDecision;
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.subtitle}>
            {hasNoFeedback ? 'Awaiting supervisor feedback' : 'Review from your supervisor'}
          </Text>
        </View>

        {/* Document Meta */}
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Program</Text>
            <Text style={styles.metaValue}>{submission.program.replace('_', ' ')}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Supervisor</Text>
            <Text style={styles.metaValue}>{submission.supervisorId}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Submitted</Text>
            <Text style={styles.metaValue}>{new Date(submission.createdAt).toLocaleDateString()}</Text>
          </View>
          {submission.feedbackAt && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Feedback date</Text>
              <Text style={styles.metaValue}>{new Date(submission.feedbackAt).toLocaleDateString()}</Text>
            </View>
          )}
        </View>

        {/* Status banner */}
        {!hasNoFeedback && (
          <View style={[
            styles.statusBanner,
            submission.status === 'approved' ? styles.statusApproved : styles.statusChanges
          ]}>
            <Text style={styles.statusText}>
              {submission.status === 'approved' ? 'Approved' : 'Changes Requested'}
            </Text>
          </View>
        )}

        {/* Project Description */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Project Description</Text>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>
              {submission.description || 'No description provided'}
            </Text>
          </View>
        </View>

        {/* Feedback content */}
        {!hasNoFeedback && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Supervisor Comments</Text>
            <View style={styles.commentBox}>
              <Text style={styles.commentText}>
                {submission.feedbackComments || 'No comments provided'}
              </Text>
            </View>
          </View>
        )}

        {/* Submitted Files */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Submitted Files</Text>
          {submission.files.length === 0 ? (
            <Text style={styles.emptyText}>No files attached.</Text>
          ) : (
            submission.files.map((f, idx) => (
              <TouchableOpacity
                key={`${f.name}-${idx}`}
                onPress={() => openFile(f.uri, f.mimeType)}
                style={styles.attachmentItem}
              >
                <Text style={styles.attachmentName}>{f.name}</Text>
                <Text style={styles.attachmentMeta}>
                  {f.mimeType || 'Unknown'} • {typeof f.size === 'number' ? `${Math.round(f.size / 1024)} KB` : 'Unknown size'}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          {submission.feedbackAt && (
            <View style={styles.timelineItem}>
              <View style={[styles.dot, { backgroundColor: '#1F7A8C' }]} />
              <View style={styles.timelineTexts}>
                <Text style={styles.timelineTitle}>Feedback Provided</Text>
                <Text style={styles.timelineSub}>
                  {new Date(submission.feedbackAt).toLocaleString()}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.timelineItem}>
            <View style={[styles.dot, { backgroundColor: submission.feedbackAt ? '#3A6A79' : '#1F7A8C' }]} />
            <View style={styles.timelineTexts}>
              <Text style={styles.timelineTitle}>
                {submission.feedbackAt ? 'Under Review' : 'Awaiting Review'}
              </Text>
              <Text style={styles.timelineSub}>
                {new Date(submission.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.dot, { backgroundColor: '#2C4755' }]} />
            <View style={styles.timelineTexts}>
              <Text style={styles.timelineTitle}>Submitted</Text>
              <Text style={styles.timelineSub}>
                {new Date(submission.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
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
    paddingBottom: 28,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    color: '#E9EEF2',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#A8B0B6',
    fontSize: 13,
    marginTop: 4,
  },
  metaCard: {
    backgroundColor: '#0F1C24',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#19303D',
    padding: 14,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  metaLabel: {
    color: '#8FA0A8',
    fontSize: 12,
  },
  metaValue: {
    color: '#E8EEF2',
    fontWeight: '600',
  },
  statusBanner: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  statusApproved: {
    backgroundColor: '#0E2D1E',
    borderColor: '#1C7A4E',
  },
  statusChanges: {
    backgroundColor: '#3A2E09',
    borderColor: '#7F6B1A',
  },
  statusText: {
    color: '#E9EEF2',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#0F1C24',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#19303D',
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#B8C2C8',
    fontSize: 13,
    marginBottom: 10,
  },
  commentBox: {
    backgroundColor: '#122530',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E3A49',
    padding: 12,
  },
  commentText: {
    color: '#DDE6EA',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    color: '#8FA0A8',
    fontSize: 12,
  },
  attachmentItem: {
    backgroundColor: '#122530',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E3A49',
    padding: 12,
    marginBottom: 8,
  },
  attachmentName: {
    color: '#E8EEF2',
    fontWeight: '700',
  },
  attachmentMeta: {
    color: '#8FA0A8',
    fontSize: 12,
    marginTop: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  timelineTexts: {
    flex: 1,
  },
  timelineTitle: {
    color: '#DDE6EA',
    fontWeight: '700',
  },
  timelineSub: {
    color: '#8FA0A8',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1F7A8C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
