import { Paths, Directory, File } from 'expo-file-system';

// Create a dedicated directory for submissions
const SUBMISSIONS_DIR = new Directory(Paths.document, 'rpas_submissions');

/**
 * Ensure the documents directory exists
 */
async function ensureDirectoryExists(): Promise<void> {
  if (!SUBMISSIONS_DIR.exists) {
    SUBMISSIONS_DIR.create();
  }
}

/**
 * Copy a temporary file to permanent storage
 * @param tempUri - The temporary URI from DocumentPicker
 * @param fileName - The file name to save as
 * @returns The permanent file URI
 */
export async function saveFilePermanently(
  tempUri: string,
  fileName: string
): Promise<string> {
  await ensureDirectoryExists();
  
  // Generate unique filename to avoid collisions
  const timestamp = Date.now();
  const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const permanentFile = new File(SUBMISSIONS_DIR, `${timestamp}_${safeFileName}`);
  
  // Copy from temp to permanent location
  const tempFile = new File(tempUri);
  await tempFile.copy(permanentFile);
  
  return permanentFile.uri;
}

/**
 * Delete a file from permanent storage
 */
export async function deleteFile(uri: string): Promise<void> {
  const file = new File(uri);
  if (file.exists) {
    await file.delete();
  }
}

/**
 * Get file info (size, exists, etc.)
 */
export async function getFileInfo(uri: string) {
  const file = new File(uri);
  return {
    exists: file.exists,
    size: file.size,
    uri: file.uri,
  };
}

/**
 * Read file as base64 (for potential upload to server)
 */
export async function readFileAsBase64(uri: string): Promise<string> {
  const file = new File(uri);
  const arrayBuffer = await file.arrayBuffer();
  // Convert ArrayBuffer to base64
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
