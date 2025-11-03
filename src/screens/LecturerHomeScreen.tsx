import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, User } from '../storage/userStore';
import { getSubmissionsForSupervisor, Submission } from '../storage/submissionStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function LecturerHomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Submission[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'supervisor') return;
    getSubmissionsForSupervisor(user.id).then(setItems).catch(() => setItems([]));
  }, [user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Documents to Review</Text>
          <Text style={styles.subtitle}>Review and approve student submissions</Text>
        </View>

        <View style={styles.list}>
          {items.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No submissions yet.</Text>
              <Text style={styles.emptySub}>When students submit, they will appear here.</Text>
            </View>
          ) : (
            items.map((it) => (
              <View key={it.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardTitle}>{it.description.substring(0, 60) || 'Project Submission'}</Text>
                  <View style={[styles.badge, { backgroundColor: '#0E2D3A', borderColor: '#1F7186' }]}>
                    <Text style={styles.badgeText}>{it.status}</Text>
                  </View>
                </View>
                <Text style={styles.cardMeta}>Student: {it.studentId} • Program: {it.program.replace('_', ' ')}</Text>
                <Text style={styles.cardMetaSecondary}>Files: {it.files.length}</Text>
                <View style={styles.cardBottom}>
                  <Text style={styles.due}>{new Date(it.createdAt).toLocaleString()}</Text>
                  <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('LecturerFeedback', { submissionId: it.id })}>
                    <Text style={styles.reviewButtonText}>Review</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Pull to refresh for new documents</Text>
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
  list: {
    marginTop: 8,
  },
  emptyBox: {
    backgroundColor: '#102532',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#244354',
    padding: 14,
    alignItems: 'center',
  },
  emptyText: { color: '#C6D4DA', fontWeight: '700' },
  emptySub: { color: '#8FA0A8', fontSize: 12, marginTop: 6 },
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
    textTransform: 'capitalize',
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
