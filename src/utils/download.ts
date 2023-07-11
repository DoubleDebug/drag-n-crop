import { FileApi } from '$lib/api/file';
import { stage, reasonDownloadFail } from '../stores/state';

export async function handleDownload(
  filePath: string | null,
  storagePath: string | null
) {
  if (!filePath || !storagePath) {
    stage.set('failed-to-download');
    reasonDownloadFail.set(
      'There was an issue while storing the cropped image or video.'
    );
    return;
  }

  const image = await fetch(filePath).then((file) => file.blob());
  if (image.type === 'application/json') {
    stage.set('failed-to-download');
    reasonDownloadFail.set(
      'There was an issue while accessing the cropped file.'
    );
    return;
  }
  const url = URL.createObjectURL(image);
  const link = document.createElement('a');
  link.href = url;

  const fileName = FileApi.getFilenameFromStoragePath(storagePath);
  link.download = fileName;

  link.click();
  stage.set('downloaded');
}

export function formatElapsedTime(seconds: number): string {
  if (seconds > 60) {
    const minutes = seconds % 60;
    return `${minutes} minutes, ${seconds} second${seconds === 1 ? '' : 's'}`;
  }

  return `${seconds} second${seconds === 1 ? '' : 's'}`;
}
