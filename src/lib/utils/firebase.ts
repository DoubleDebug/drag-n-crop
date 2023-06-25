import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  type UploadTask,
} from 'firebase/storage';
import { FileApi } from './file';
import type { UploadOptions } from '../../app';

const firebaseConfig = {
  apiKey: 'AIzaSyCezpvLZnBEKSoAJg9MBJHyzSUg69LVVx4',
  authDomain: 'drag-n-crop.firebaseapp.com',
  projectId: 'drag-n-crop',
  storageBucket: 'drag-n-crop.appspot.com',
  messagingSenderId: '779975548758',
  appId: '1:779975548758:web:4e1b9ff1b7f4ae543480f7',
  measurementId: 'G-DQ1NQFKTBS',
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export namespace FirebaseApi {
  const STORAGE_PATH_RAW = 'raw';
  const STORAGE_PATH_CROPPED = 'cropped';

  function generateNewFileName(): string {
    return crypto.randomUUID();
  }

  function formatStoragePath(extension: string, isImage: boolean): string {
    const newFileName = generateNewFileName();
    const subfolder = isImage ? 'images' : 'videos';
    return `${STORAGE_PATH_RAW}/${subfolder}/${newFileName}${extension}`;
  }

  export function uploadFile(options: UploadOptions) {
    const extension = FileApi.getExtension(options.file.name)!;
    const storagePath = formatStoragePath(extension, options.isImage);
    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, options.file);
    uploadTask.on(
      'state_changed',
      options.onStateChange,
      options.onError,
      () => {
        if (options.onSuccess) {
          getDownloadURL(uploadTask.snapshot.ref).then(options.onSuccess);
        }
      }
    );
  }
}
