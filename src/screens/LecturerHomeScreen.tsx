import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LecturerHomeScreen() {
  // Static sample data (UI only)
  const items = [
    { id: '1', title: 'Midterm Exam Paper', course: 'CSC201 - Algorithms', submitted: 'Dept. of CS', due: 'Due: Nov 12', status: 'Pending' as const },
    { id: '2', title: 'Lab Manual Update', course: 'EEE310 - Control Systems', submitted: 'Quality Office', due: 'Due: Nov 5', status: 'Overdue' as const },
    { id: '3', title: 'Assignment Brief', course: 'MAT120 - Calculus II', submitted: 'Dept. of Math', due: 'Due: Nov 9', status: 'In Review' as const },
    { id: '4', title: 'Course Outline', course: 'BUS101 - Intro to Business', submitted: 'Dean’s Office', due: 'Due: Nov 18', status: 'Pending' as const },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Documents to Review</Text>
          <Text style={styles.subtitle}>Review and approve departmental documents</Text>
        </View>

        <View style={styles.filters}>
          <View style={[styles.chip, styles.chipActive]}>
            <Text style={[styles.chipText, styles.chipTextActive]}>All</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Pending</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>In Review</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Overdue</Text>
          </View>
        </View>

        <View style={styles.list}>
          {items.map((it) => (
            <View key={it.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{it.title}</Text>
                <View style={[styles.badge, getBadgeStyle(it.status)]}>
                  <Text style={styles.badgeText}>{it.status}</Text>
                </View>
              </View>

              <Text style={styles.cardMeta}>{it.course}</Text>
              <Text style={styles.cardMetaSecondary}>Submitted by {it.submitted}</Text>

              <View style={styles.cardBottom}>
                <Text style={styles.due}>{it.due}</Text>
                <View style={styles.reviewButton}>
                  <Text style={styles.reviewButtonText}>Review</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Pull to refresh for new documents</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getBadgeStyle(status: 'Pending' | 'In Review' | 'Overdue') {
  switch (status) {
    case 'Pending':
      return { backgroundColor: '#3A2E09', borderColor: '#7F6B1A' };
    case 'In Review':
      return { backgroundColor: '#0E2D3A', borderColor: '#1F7186' };
    case 'Overdue':
      return { backgroundColor: '#3A0E0E', borderColor: '#8A1F1F' };
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B141A',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 10,
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
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0F1C24',
    borderWidth: 1,
    borderColor: '#1E3A49',
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: '#153848',
    borderColor: '#1F7A8C',
  },
  chipText: {
    color: '#B8C2C8',
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#DEF3F8',
  },
  list: {
    marginTop: 8,
  },
  card: {
    backgroundColor: '#0F1C24',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#19303D',
    padding: 14,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#E8EEF2',
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
    paddingRight: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    color: '#DDE6EA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardMeta: {
    color: '#9FB0B8',
    marginTop: 6,
  },
  cardMetaSecondary: {
    color: '#7E8E95',
    marginTop: 2,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  due: {
    color: '#B8C2C8',
    fontSize: 12,
  },
  reviewButton: {
    backgroundColor: '#1F7A8C',
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    marginTop: 4,
  },
  footerText: {
    color: '#6E7F88',
    fontSize: 12,
  },
});
