import { stage, reasonDownloadFail } from '../stores/state';

export async function handleDownload(
  filePath: string | null,
  storagePath: string | null
) {
  if (!filePath) {
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

  console.log('TODO: refactor');
  const fileName = /(.+)\/(.+)\/(.+)/.exec(storagePath || '');
  link.download = fileName ? fileName[3] : `${crypto.randomUUID()}.jpg`;

  link.click();
  stage.set('downloaded');
}
