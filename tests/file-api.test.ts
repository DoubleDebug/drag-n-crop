import { describe, expect, it } from 'vitest';
import { FileApi } from '../src/api/file';

describe('file api', () => {
  it('get extension', () => {
    expect(FileApi.getExtension('test.jpg')).toBe('.jpg');
    expect(FileApi.getExtension('component.svelte')).toBe('.svelte');
    expect(FileApi.getExtension('abc.def.ghijk')).toBe('.ghijk');
    expect(FileApi.getExtension('abcd')).toBe(null);
    expect(FileApi.getExtension('')).toBe(null);
    expect(FileApi.getExtension('..........')).toBe(null);
  });

  it('is format supported', () => {
    expect(FileApi.isImageFormatSupported('test.jpg')).toBe(true);
    expect(FileApi.isImageFormatSupported('test.bmp')).toBe(true);
    expect(FileApi.isImageFormatSupported('vid.wmv')).toBe(false);
    expect(FileApi.isImageFormatSupported('asdf')).toBe(false);

    expect(FileApi.isVideoFormatSupported('test.mp4')).toBe(true);
    expect(FileApi.isVideoFormatSupported('test.wav')).toBe(false);
    expect(FileApi.isVideoFormatSupported('vid.wmv')).toBe(true);
    expect(FileApi.isVideoFormatSupported('asdf')).toBe(false);
  });

  it('is file valid', () => {
    const imageFile = { name: 'sun.jpg', size: 8000 };
    const videoFile = { name: 'doc.FLV', size: 12000 };
    const textFile = { name: 'doc.txt', size: 300 };
    const largeFile = { name: 'movie.mp4', size: 2000000000 };

    expect(FileApi.isFileValid(imageFile as File)).toStrictEqual({
      isImage: true,
      isValid: true,
      reason: null,
    });
    expect(FileApi.isFileValid(videoFile as File)).toStrictEqual({
      isImage: false,
      isValid: true,
      reason: null,
    });
    expect(FileApi.isFileValid(textFile as File)).toStrictEqual({
      isImage: false,
      isValid: false,
      reason: 'invalid-file-format',
    });
    expect(FileApi.isFileValid(largeFile as File)).toStrictEqual({
      isImage: false,
      isValid: false,
      reason: 'file-too-large',
    });
  });

  it('get file size from url', async () => {
    const size = await FileApi.getFileSizeFromUrl(
      'https://i.imgur.com/mXxCzXG.png'
    );
    expect(size).toBe('0.03');
  });

  it('get filename from storage path', () => {
    const storagePath1 = 'raw/images/40585bbe-530d-4ac6-9bb1-38fd3776d833.jpg';
    const storagePath2 =
      '/cropped/videos/7cfcf6f5-8fb5-470a-8c16-d1597f8eeb6c.mp4';

    expect(FileApi.getFilenameFromStoragePath(storagePath1)).toBe(
      '40585bbe-530d-4ac6-9bb1-38fd3776d833.jpg'
    );
    expect(FileApi.getFilenameFromStoragePath(storagePath2)).toBe(
      '7cfcf6f5-8fb5-470a-8c16-d1597f8eeb6c.mp4'
    );
  });
});
