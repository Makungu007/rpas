import AsyncStorage from '@react-native-async-storage/async-storage';

export type Role = 'student' | 'supervisor';
export type Program = 'computer_science' | 'information_systems';

export type User = {
  id: string; 
  name: string;
  role: Role;
  password: string;
  // For supervisors: their program; For students: selected program
  program?: Program;
  // For students: assigned supervisor id
  supervisorId?: string;
};

const USERS_KEY = 'rpas/users';
const SEEDED_KEY = 'rpas/users_seeded_v2';
const CURRENT_USER_KEY = 'rpas/current_user';

const seedData: User[] = [
  // Supervisors (4) — two for each program
  { id: 'SUP100', name: 'Dr. A. Mumba', role: 'supervisor', password: 'pass100', program: 'computer_science' },
  { id: 'SUP200', name: 'Dr. B. Zulu', role: 'supervisor', password: 'pass200', program: 'computer_science' },
  { id: 'SUP300', name: 'Prof. C. Banda', role: 'supervisor', password: 'pass300', program: 'information_systems' },
  { id: 'SUP400', name: 'Mr. D. Phiri', role: 'supervisor', password: 'pass400', program: 'information_systems' },
  // Students (8) — program/supervisor chosen later
  { id: 'BIT230001', name: 'Alice Mwila', role: 'student', password: 'bit001' },
  { id: 'BIT230002', name: 'Brian Tembo', role: 'student', password: 'bit002' },
  { id: 'BIT230003', name: 'Chipo Nkhoma', role: 'student', password: 'bit003' },
  { id: 'BIT230004', name: 'Daniela Moyo', role: 'student', password: 'bit004' },
  { id: 'BIT230005', name: 'Edgar Kalaba', role: 'student', password: 'bit005' },
  { id: 'BIT230006', name: 'Flora Chanda', role: 'student', password: 'bit006' },
  { id: 'BIT230007', name: 'Grace Mwape', role: 'student', password: 'bit007' },
  { id: 'BIT230008', name: 'Henry Mulenga', role: 'student', password: 'bit008' },
];

export async function seedUsersOnce(): Promise<void> {
  try {
    const seeded = await AsyncStorage.getItem(SEEDED_KEY);
    if (seeded) return;

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(seedData));
    await AsyncStorage.setItem(SEEDED_KEY, 'true');
  } catch (e) {
    // No-op: seeding failure should not crash the app
    console.warn('Seeding users failed', e);
  }
}

export async function getAllUsers(): Promise<User[]> {
  const json = await AsyncStorage.getItem(USERS_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json) as User[];
  } catch {
    return [];
  }
}

export async function findUserByCredentials(id: string, password: string): Promise<User | null> {
  const users = await getAllUsers();
  const found = users.find(u => u.id.toLowerCase() === id.toLowerCase() && u.password === password);
  return found ?? null;
}

export async function login(id: string, password: string): Promise<User> {
  const user = await findUserByCredentials(id, password);
  if (!user) throw new Error('Invalid ID or password');
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export async function getCurrentUser(): Promise<User | null> {
  const json = await AsyncStorage.getItem(CURRENT_USER_KEY);
  if (!json) return null;
  try {
    return JSON.parse(json) as User;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
}

// Helpers for programs/supervisors
export async function getSupervisorsByProgram(program: Program): Promise<User[]> {
  const users = await getAllUsers();
  return users.filter(u => u.role === 'supervisor' && u.program === program);
}

export async function setStudentProgramAndSupervisor(studentId: string, program: Program, supervisorId: string): Promise<User> {
  const users = await getAllUsers();
  const studentIdx = users.findIndex(u => u.id === studentId && u.role === 'student');
  if (studentIdx === -1) throw new Error('Student not found');

  const supervisor = users.find(u => u.id === supervisorId && u.role === 'supervisor');
  if (!supervisor) throw new Error('Supervisor not found');
  if (supervisor.program !== program) throw new Error('Supervisor does not belong to selected program');

  const updatedStudent: User = { ...users[studentIdx], program, supervisorId };
  users[studentIdx] = updatedStudent;
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

  // keep current user cache in sync if this student is logged in
  const current = await getCurrentUser();
  if (current && current.id === studentId) {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedStudent));
  }

  return updatedStudent;
}
