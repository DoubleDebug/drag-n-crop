import { initializeApp } from 'firebase/app';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  type UploadMetadata,
} from 'firebase/storage';
import { FileApi } from './file';
import type {
  FirebaseUploadFileOptions,
  FirebaseUploadUintArrayOptions,
} from '../app';

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

export namespace FirebaseStorageApi {
  const STORAGE_PATH_RAW = 'raw';

  function generateNewFileName(): string {
    return crypto.randomUUID();
  }

  function formatStoragePath(extension: string, isImage: boolean): string {
    const newFileName = generateNewFileName();
    const subfolder = isImage ? 'images' : 'videos';
    return `${STORAGE_PATH_RAW}/${subfolder}/${newFileName}${extension}`;
  }

  export function uploadFile(options: FirebaseUploadFileOptions) {
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

    return storagePath;
  }

  export function uploadUintArray(options: FirebaseUploadUintArrayOptions) {
    const extension = FileApi.getExtension(options.fileName)!;
    const storagePath = formatStoragePath(extension, options.isImage);
    const storageRef = ref(storage, storagePath);

    const metadata: UploadMetadata = {
      customMetadata: {
        isUintArray: 'true',
      },
    };

    const uploadTask = uploadBytesResumable(
      storageRef,
      options.uintArray,
      metadata
    );
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

    return storagePath;
  }

  export async function getDownloadUrl(storagePath: string) {
    const storageRef = ref(storage, storagePath);
    const url = await getDownloadURL(storageRef);
    return url;
  }

  export async function deleteFile(storagePath: string) {
    const storageRef = ref(storage, storagePath);
    return await deleteObject(storageRef);
  }
}
