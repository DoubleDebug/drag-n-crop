import axios from 'axios';
import type { FileValidationResult } from '../../app';

export namespace FileApi {
  export const imageSizeLimit = 1024 * 1024 * 100; // 100 MB
  export const videoSizeLimit = 1024 * 1024 * 1000; // 1 GB
  export const validImageFormats = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.webp',
    '.svg',
  ];
  export const validVideoFormats = [
    '.mp4',
    '.mkv',
    '.flv',
    '.avi',
    '.mov',
    '.wmv',
    '.webm',
  ];
  /**
   * @returns extension including the dot, or null if the fileName is invalid.
   * @example
   * const extension = FileApi.getExtension("my-fav-video.mp4");
   * console.log(extension); // .mp4
   */
  export function getExtension(fileName: string): string | null {
    const regex = new RegExp(/^[a-zA-Z0-9\._-\s]*(\.[a-zA-Z0-9]+)$/);
    const result = regex.exec(fileName);
    if (result === null || result.length !== 2) return null;

    return result[1];
  }

  /**
   * @returns `true` if the extension of the image file name is supported
   */
  export function isImageFormatSupported(fileName: string): boolean {
    const extension = getExtension(fileName);
    if (!extension) return false;

    return validImageFormats.includes(extension.toLowerCase());
  }

  /**
   * @returns `true` if the extension of the video file name is supported
   */
  export function isVideoFormatSupported(fileName: string): boolean {
    const extension = getExtension(fileName);
    if (!extension) return false;

    return validVideoFormats.includes(extension.toLowerCase());
  }

  /**
   * @returns `true` if the file satisfies the defined limitations:
   * - is supported file format
   * - is within size limit
   */
  export function isFileValid(file: File): FileValidationResult {
    const fileName = file.name;

    // 1) file format
    const isImage = isImageFormatSupported(fileName);
    const isVideo = isVideoFormatSupported(fileName);
    if (!isImage && !isVideo) {
      return {
        isValid: false,
        isImage: false,
        reason: 'invalid-file-format',
      };
    }

    // 2) file size
    if (isImage && file.size > imageSizeLimit) {
      return {
        isValid: false,
        isImage: true,
        reason: 'file-too-large',
      };
    }
    if (isVideo && file.size > videoSizeLimit) {
      return {
        isValid: false,
        isImage: false,
        reason: 'file-too-large',
      };
    }

    return {
      isValid: true,
      isImage,
      reason: null,
    };
  }

  /**
   * Gets file size from URL by reading the content length.
   * @returns file size in megabytes
   * @example 14.25
   */
  export async function getFileSizeFromUrl(
    fileUrl: string
  ): Promise<string | null> {
    const response = await axios.get(fileUrl);
    const bytes = response.headers['content-length']?.toString();
    if (!bytes) return null;

    return (Number(bytes) / (1024 * 1024)).toFixed(2);
  }

  /**
   * Parses the file name from the storage path.
   * If unsuccessful, it generates a new one in the form of a UUID.
   * @returns parsed file name.
   */
  export function getFilenameFromStoragePath(storagePath: string): string {
    const extension = getExtension(storagePath);
    const regexResult = /(.+)\/(.+)\/(.+)/.exec(storagePath);
    if (!regexResult || regexResult.length !== 4) {
      const filename = `${crypto.randomUUID()}.${extension}`;
      return filename;
    }

    return regexResult[3];
  }
}
