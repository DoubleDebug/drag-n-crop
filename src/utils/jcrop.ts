import { jcrop } from '../stores/state';
import { CONTAINER_HEIGHT, ID_CROP_AREA, ID_VIDEO_ELEMENT } from './constant';

export namespace JcropUtils {
  /**
   * Attaches a new jcrop instance to the image/video element.
   */
  export function attachJcrop(isImage: boolean) {
    const cropper = Jcrop.attach(ID_CROP_AREA);
    const jcropStage = document.getElementsByClassName(
      'jcrop-stage'
    )[0] as HTMLElement;
    jcropStage.style.height = `${CONTAINER_HEIGHT}px`;
    jcropStage.style.position = 'absolute';
    cropper.addClass('jcrop-ux-no-outline');
    jcrop.set(cropper);

    let mediaElement;
    if (isImage) {
      mediaElement = document.getElementById(ID_CROP_AREA);
    } else {
      mediaElement = document.getElementById(ID_VIDEO_ELEMENT);
    }
    if (!mediaElement) return;

    const { width, height } = mediaElement.getBoundingClientRect();
    const w = width * 0.8;
    const h = height * 0.4;
    const x = width * 0.1;
    const y = width * 0.1;

    cropper.newWidget(Jcrop.Rect.create(x, y, w, h));
  }

  /**
   * Checks if Jcrop wasn't correctly attached.
   * In this case, it removes it and attaches a new one.
   */
  export function validateJcropPlacement(jcropRef: any) {
    const videoElement = document.getElementById(ID_VIDEO_ELEMENT);
    const jcropElement = document.getElementsByClassName(
      'jcrop-stage'
    )[0] as HTMLElement;
    if (!videoElement || !jcropElement || jcropRef) return;

    const videoWidth = videoElement.clientWidth;
    const jcropWidth = jcropElement.clientWidth;

    if (jcropWidth <= videoWidth) return;

    jcropElement.style.width = `${videoElement.clientWidth}px`;
    while (jcropElement.children.length > 1) {
      document.removeChild(
        jcropElement.children[jcropElement.children.length - 1]
      );
    }
    jcropRef.removeWidget(jcropRef.active);

    const { width, height } = videoElement.getBoundingClientRect();
    const w = width * 0.8;
    const h = height * 0.4;
    const x = width * 0.1;
    const y = width * 0.1;

    jcropRef.newWidget(Jcrop.Rect.create(x, y, w, h));
  }
}
