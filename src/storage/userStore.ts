import AsyncStorage from '@react-native-async-storage/async-storage';

export type Role = 'student' | 'supervisor';

export type User = {
  id: string; // e.g., student number or staff code
  name: string;
  role: Role;
  password: string;
};

const USERS_KEY = 'rpas/users';
const SEEDED_KEY = 'rpas/users_seeded_v1';
const CURRENT_USER_KEY = 'rpas/current_user';

const seedData: User[] = [
  // Supervisors (4)
  { id: 'SUP100', name: 'Dr. A. Mumba', role: 'supervisor', password: 'pass100' },
  { id: 'SUP200', name: 'Dr. B. Zulu', role: 'supervisor', password: 'pass200' },
  { id: 'SUP300', name: 'Prof. C. Banda', role: 'supervisor', password: 'pass300' },
  { id: 'SUP400', name: 'Mr. D. Phiri', role: 'supervisor', password: 'pass400' },
  // Students (8)
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
