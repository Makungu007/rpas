import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StudentFeedbackScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.subtitle}>Review result for Midterm Exam Paper</Text>
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
            <Text style={styles.metaLabel}>Lecturer</Text>
            <Text style={styles.metaValue}>Dr. A. Banda</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Feedback date</Text>
            <Text style={styles.metaValue}>Nov 2, 2025</Text>
          </View>
        </View>

        {/* Status banner */}
        <View style={[styles.statusBanner, styles.statusChanges]}>
          <Text style={styles.statusText}>Changes Requested</Text>
        </View>

        {/* Feedback content */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Lecturer Comments</Text>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>
              The structure is generally good. Please clarify Question 2(b) and provide clearer marking
              guidelines for Section C. Ensure the diagrams in Question 4 are high-resolution.
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Areas Highlighted</Text>
          <View style={styles.tagsRow}>
            <View style={styles.tag}><Text style={styles.tagText}>Clarity</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Formatting</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Accuracy</Text></View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Attachments</Text>
          <View style={styles.attachmentItem}>
            <Text style={styles.attachmentName}>markup_midterm_v1_3.pdf</Text>
            <Text style={styles.attachmentMeta}>Annotated PDF • 1.2 MB</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          <View style={styles.timelineItem}>
            <View style={[styles.dot, { backgroundColor: '#1F7A8C' }]} />
            <View style={styles.timelineTexts}>
              <Text style={styles.timelineTitle}>Feedback Provided</Text>
              <Text style={styles.timelineSub}>Nov 2, 2025 at 10:35</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.dot, { backgroundColor: '#3A6A79' }]} />
            <View style={styles.timelineTexts}>
              <Text style={styles.timelineTitle}>Under Review</Text>
              <Text style={styles.timelineSub}>Nov 1, 2025</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.dot, { backgroundColor: '#2C4755' }]} />
            <View style={styles.timelineTexts}>
              <Text style={styles.timelineTitle}>Submitted</Text>
              <Text style={styles.timelineSub}>Oct 30, 2025</Text>
            </View>
          </View>
        </View>

        {/* Actions (UI only) */}
        <View style={styles.actionsRow}>
          <View style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Download document</Text>
          </View>
          <View style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Back to Home</Text>
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
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  attachmentItem: {
    backgroundColor: '#122530',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E3A49',
    padding: 12,
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
