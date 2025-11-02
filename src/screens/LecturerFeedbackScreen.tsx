import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LecturerFeedbackScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Review Document</Text>
          <Text style={styles.subtitle}>Preview the document and provide your feedback</Text>
        </View>

        {/* Document Meta */}
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Title</Text>
            <Text style={styles.metaValue}>Midterm Exam Paper</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Course</Text>
            <Text style={styles.metaValue}>CSC201 - Algorithms</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Submitted by</Text>
            <Text style={styles.metaValue}>Dept. of CS</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Version</Text>
            <Text style={styles.metaValue}>v1.3 • Uploaded Oct 30</Text>
          </View>
        </View>

        {/* Preview */}
        <View style={styles.previewCard}>
          <Text style={styles.sectionTitle}>Document Preview</Text>
          <View style={styles.previewBox}>
            <View style={styles.page}>
              <Text style={styles.pageHeader}>Page 1</Text>
              <View style={styles.line} />
              <View style={[styles.line, { width: '92%' }]} />
              <View style={[styles.line, { width: '85%' }]} />
              <View style={[styles.line, { width: '70%' }]} />
              <View style={[styles.line, { width: '60%' }]} />
              <View style={[styles.line, { width: '80%' }]} />
            </View>
            <View style={styles.page}>
              <Text style={styles.pageHeader}>Page 2</Text>
              <View style={styles.line} />
              <View style={[styles.line, { width: '88%' }]} />
              <View style={[styles.line, { width: '76%' }]} />
              <View style={[styles.line, { width: '64%' }]} />
            </View>
          </View>
          <View style={styles.previewFooter}>
            <View style={styles.previewChip}><Text style={styles.previewChipText}>Zoom 100%</Text></View>
            <View style={styles.previewChip}><Text style={styles.previewChipText}>2 pages</Text></View>
            <View style={styles.previewChip}><Text style={styles.previewChipText}>Open externally</Text></View>
          </View>
        </View>

        {/* Feedback */}
        <View style={styles.feedbackCard}>
          <Text style={styles.sectionTitle}>Feedback</Text>

          {/* Decision (static UI) */}
          <View style={styles.decisionRow}>
            <View style={[styles.decisionChip, styles.decisionActive]}>
              <Text style={[styles.decisionText, styles.decisionTextActive]}>Approve</Text>
            </View>
            <View style={styles.decisionChip}>
              <Text style={styles.decisionText}>Request Changes</Text>
            </View>
          </View>

          {/* Tags (static UI) */}
          <View style={styles.tagsRow}>
            <View style={styles.tag}><Text style={styles.tagText}>Clarity</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Formatting</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Accuracy</Text></View>
          </View>

          {/* Text area */}
          <Text style={styles.inputLabel}>Comments</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Write your feedback here (UI only)"
            placeholderTextColor="#8B9AA2"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* Attachments (static) */}
          <View style={styles.attachRow}>
            <View style={styles.attachButton}><Text style={styles.attachButtonText}>+ Add attachment</Text></View>
            <Text style={styles.attachHint}>Optional</Text>
          </View>

          {/* Actions (static) */}
          <View style={styles.actionsRow}>
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Save Draft</Text>
            </View>
            <View style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Submit Feedback</Text>
            </View>
          </View>
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
    marginBottom: 14,
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
  previewCard: {
    backgroundColor: '#0F1C24',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#19303D',
    padding: 14,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#B8C2C8',
    fontSize: 13,
    marginBottom: 10,
  },
  previewBox: {
    backgroundColor: '#0D1720',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E3A49',
    padding: 12,
  },
  page: {
    backgroundColor: '#102532',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#244354',
    padding: 12,
    marginBottom: 10,
  },
  pageHeader: {
    color: '#9FB0B8',
    marginBottom: 8,
    fontSize: 12,
  },
  line: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#254657',
    marginBottom: 8,
  },
  previewFooter: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  previewChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#153848',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1F7A8C',
  },
  previewChipText: {
    color: '#D5E7ED',
    fontSize: 12,
    fontWeight: '600',
  },
  feedbackCard: {
    backgroundColor: '#0F1C24',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#19303D',
    padding: 14,
  },
  decisionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  decisionChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0F1C24',
    borderWidth: 1,
    borderColor: '#1E3A49',
    borderRadius: 999,
  },
  decisionActive: {
    backgroundColor: '#153848',
    borderColor: '#1F7A8C',
  },
  decisionText: {
    color: '#B8C2C8',
    fontSize: 12,
    fontWeight: '700',
  },
  decisionTextActive: {
    color: '#E7F5FA',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#122530',
    borderWidth: 1,
    borderColor: '#1E3A49',
    borderRadius: 999,
  },
  tagText: {
    color: '#C3D0D6',
    fontSize: 12,
    fontWeight: '600',
  },
  inputLabel: {
    color: '#8FA0A8',
    fontSize: 12,
    marginBottom: 6,
  },
  textarea: {
    minHeight: 120,
    borderRadius: 12,
    backgroundColor: '#122530',
    borderWidth: 1,
    borderColor: '#1E3A49',
    padding: 12,
    color: '#E8EEF2',
  },
  attachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  attachButton: {
    backgroundColor: '#153848',
    borderWidth: 1,
    borderColor: '#1F7A8C',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  attachButtonText: {
    color: '#D5E7ED',
    fontWeight: '700',
    fontSize: 12,
  },
  attachHint: {
    color: '#7E8E95',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#183142',
    borderWidth: 1,
    borderColor: '#1E3A49',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#CFE5EC',
    fontWeight: '700',
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
