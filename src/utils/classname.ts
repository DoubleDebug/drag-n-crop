import { ID_MEDIA_ELEMENT } from './constant';

export function getMediaElementClassName(isImage: boolean) {
  const mediaElement = document.getElementById(ID_MEDIA_ELEMENT);
  if (!mediaElement) return 'h-full';

  let width, height;
  if (isImage) {
    width = (mediaElement as HTMLImageElement).naturalWidth;
    height = (mediaElement as HTMLImageElement).naturalHeight;
  } else {
    width = (mediaElement as HTMLVideoElement).videoWidth;
    height = (mediaElement as HTMLVideoElement).videoHeight;
  }

  if (width > height) {
    return 'h-full';
  }

  return 'h-min self-center';
}
