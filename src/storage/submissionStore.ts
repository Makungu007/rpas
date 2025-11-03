import AsyncStorage from '@react-native-async-storage/async-storage';
import { Program } from './userStore';

export type SubmissionFile = {
  name: string;
  size?: number | null;
  mimeType?: string | null;
  uri?: string | null;
};

export type SubmissionStatus = 'draft' | 'submitted' | 'approved' | 'changes_requested';

export type Submission = {
  id: string;
  studentId: string;
  supervisorId: string;
  program: Program;
  description: string;
  files: SubmissionFile[];
  status: SubmissionStatus;
  createdAt: number;
  // feedback fields
  feedbackDecision?: 'approved' | 'changes_requested';
  feedbackComments?: string;
  feedbackAt?: number;
};

const SUBMISSIONS_KEY = 'rpas/submissions_v1';

function uuid(): string {
  // simple uuid v4-like
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function getAllSubmissions(): Promise<Submission[]> {
  const json = await AsyncStorage.getItem(SUBMISSIONS_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json) as Submission[];
  } catch {
    return [];
  }
}

async function saveAllSubmissions(items: Submission[]): Promise<void> {
  await AsyncStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(items));
}

export async function submitProject(params: Omit<Submission, 'id' | 'status' | 'createdAt' | 'feedbackDecision' | 'feedbackComments' | 'feedbackAt'>): Promise<Submission> {
  const all = await getAllSubmissions();
  const item: Submission = {
    id: uuid(),
    status: 'submitted',
    createdAt: Date.now(),
    ...params,
  };
  all.unshift(item);
  await saveAllSubmissions(all);
  return item;
}

export async function saveDraft(params: Omit<Submission, 'id' | 'status' | 'createdAt' | 'feedbackDecision' | 'feedbackComments' | 'feedbackAt'> & { id?: string }): Promise<Submission> {
  const all = await getAllSubmissions();
  if (params.id) {
    const idx = all.findIndex(s => s.id === params.id && s.studentId === params.studentId);
    if (idx !== -1) {
      const updated: Submission = { ...all[idx], ...params, status: 'draft' } as Submission;
      all[idx] = updated;
      await saveAllSubmissions(all);
      return updated;
    }
  }
  const item: Submission = {
    id: uuid(),
    status: 'draft',
    createdAt: Date.now(),
    ...params,
  };
  all.unshift(item);
  await saveAllSubmissions(all);
  return item;
}

export async function getSubmissionsForSupervisor(supervisorId: string): Promise<Submission[]> {
  const all = await getAllSubmissions();
  return all.filter((s) => s.supervisorId === supervisorId);
}

export async function getSubmissionsForStudent(studentId: string): Promise<Submission[]> {
  const all = await getAllSubmissions();
  return all.filter((s) => s.studentId === studentId);
}

export async function getSubmissionById(id: string): Promise<Submission | null> {
  const all = await getAllSubmissions();
  return all.find(s => s.id === id) ?? null;
}

export async function submitFeedback(
  submissionId: string,
  supervisorId: string,
  decision: 'approved' | 'changes_requested',
  comments: string
): Promise<Submission> {
  const all = await getAllSubmissions();
  const idx = all.findIndex(s => s.id === submissionId);
  if (idx === -1) throw new Error('Submission not found');
  const sub = all[idx];
  if (sub.supervisorId !== supervisorId) throw new Error('Not authorized for this submission');

  const updated: Submission = {
    ...sub,
    status: decision,
    feedbackDecision: decision,
    feedbackComments: comments,
    feedbackAt: Date.now(),
  };
  all[idx] = updated;
  await saveAllSubmissions(all);
  return updated;
}
