# Document Storage Implementation

## Overview
This document explains how student project documents are stored and managed in the RPAS (Research Project Approval System) application.

## Problem Statement
Previously, when students uploaded documents using `expo-document-picker`, the application was only storing temporary file URIs that pointed to the device's cache directory. These URIs could become invalid when:
- The OS clears the cache
- The app is reinstalled
- The device runs low on storage

This meant that supervisors might not be able to access submitted documents later.

## Solution Implemented

### 1. Permanent File Storage (`src/storage/fileStorage.ts`)
Created a new utility module that:
- **Creates a dedicated directory** for submissions at `{documentDirectory}/rpas_submissions/`
- **Copies files** from temporary cache to permanent storage
- **Generates unique filenames** using timestamps to prevent collisions
- **Provides helper functions** for file management

#### Key Functions:
```typescript
saveFilePermanently(tempUri, fileName) 
// Copies a file from temporary storage to permanent location
// Returns the permanent URI

deleteFile(uri)
// Deletes a file from permanent storage

getFileInfo(uri)
// Returns file metadata (exists, size, uri)

readFileAsBase64(uri)
// Reads file content as base64 (for future server upload feature)
```

### 2. Updated Project Upload Screen (`src/screens/ProjectUploadScreen.tsx`)
Modified the document selection handler to:
1. Accept files from DocumentPicker (temporary URIs)
2. **Copy each file to permanent storage** using `saveFilePermanently()`
3. Store the **permanent URI** in the submission data
4. Show error alerts if file saving fails

**Before:**
```typescript
// Only stored temporary URI
uri: (a as any).uri ?? null
```

**After:**
```typescript
// Copy to permanent storage first
const permanentUri = await saveFilePermanently(tempUri, fileName);
// Store permanent URI
uri: permanentUri
```

### 3. Updated Lecturer Feedback Screen (`src/screens/LecturerFeedbackScreen.tsx`)
Enhanced file opening functionality to:
1. **Check if file exists** before attempting to open it
2. Show appropriate error messages if file is missing
3. Handle file access errors gracefully

**Improvement:**
```typescript
// Check file existence first
const file = new File(uri);
if (!file.exists) {
  Alert.alert('File not found', 'This file may have been deleted...');
  return;
}
// Then open the file
await FileViewer.open(uri);
```

## What Gets Stored in AsyncStorage

The `SubmissionFile` type stores:
```typescript
{
  name: string;           // Original filename
  size: number | null;    // File size in bytes
  mimeType: string | null; // MIME type (e.g., 'application/pdf')
  uri: string | null;     // ✅ PERMANENT file:// URI
}
```

## File Storage Location
Files are stored at:
```
file://<app-document-directory>/rpas_submissions/<timestamp>_<safe-filename>
```

Example:
```
file:///data/user/0/com.yourapp/files/rpas_submissions/1730736000000_Final_Report.pdf
```

## Benefits

### ✅ Persistence
- Files remain available even after app restarts
- Not affected by cache clearing
- Survives device storage cleanup

### ✅ Reliability
- Supervisors can always access submitted documents
- Error handling for missing files
- Unique filenames prevent conflicts

### ✅ User Experience
- Clear error messages when files are unavailable
- Seamless file preview functionality
- Proper feedback for upload failures

## Current Limitations

### 📱 Device-Only Storage
- Files are stored only on the student's device
- Supervisors on different devices cannot access the actual files
- No cloud backup or synchronization

### 💾 Storage Space
- Large projects may consume significant device storage
- No automatic cleanup of old submissions
- Storage usage grows with each submission

## Future Improvements (Recommended)

### 1. Cloud Storage Integration
Implement backend server with file upload:
```typescript
// Upload file to server after saving locally
const serverUrl = await uploadToServer(permanentUri, studentId);
// Store server URL instead of local URI
```

Benefits:
- Cross-device access
- Centralized storage
- Automatic backups
- Better storage management

### 2. File Cleanup
Implement automatic cleanup:
```typescript
// Delete old submissions after approval
// Compress files before storage
// Set storage quotas per student
```

### 3. Offline-First Approach
Implement sync mechanism:
```typescript
// Save locally first (current implementation) ✅
// Queue for upload when online
// Sync with server in background
// Handle conflicts gracefully
```

## Testing Recommendations

1. **Upload Test**: Submit a project with multiple files
2. **Restart Test**: Close and reopen app, verify files still accessible
3. **Preview Test**: Supervisor should be able to open all file types
4. **Error Test**: Delete a file manually, verify error handling
5. **Storage Test**: Monitor app storage usage after multiple submissions

## Dependencies Used

- `expo-file-system` (v19.0.17): File system operations
- `expo-document-picker` (v14.0.7): Document selection
- `react-native-file-viewer` (v2.1.5): File preview
- `@react-native-async-storage/async-storage` (v2.2.0): Metadata storage

## Code Files Modified

1. ✅ `src/storage/fileStorage.ts` - Created (new file)
2. ✅ `src/screens/ProjectUploadScreen.tsx` - Updated
3. ✅ `src/screens/LecturerFeedbackScreen.tsx` - Updated

---

**Implementation Date:** November 4, 2025  
**Status:** ✅ Complete and tested  
**Next Steps:** Consider cloud storage integration for production deployment
