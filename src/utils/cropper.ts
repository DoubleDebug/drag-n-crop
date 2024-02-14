import Cropper from 'cropperjs';
import { get } from 'svelte/store';
import { cropper } from '../stores/state';
import { ID_CROP_AREA, ID_VIDEO_ELEMENT } from './constant';

export namespace CropperUtils {
  export function initCropper() {
    let cropperValue = get(cropper);
    if (cropperValue) return;

    const imageEl = document.getElementById(ID_CROP_AREA) as HTMLImageElement;
    cropper.set(
      new Cropper(imageEl, {
        zoomable: false,
        movable: false,
        rotatable: false,
        background: false,
        highlight: false,
        modal: false,
        minContainerHeight: 0,
        minContainerWidth: 0,
      })
    );

    setTimeout(() => {
      cropperValue = get(cropper);
      const videoElement = document.getElementById(ID_VIDEO_ELEMENT);
      if (videoElement && cropperValue) {
        const cropperContainers =
          document.getElementsByClassName('cropper-container');
        if (cropperContainers.length === 0) return;
        (cropperContainers[0] as HTMLDivElement).style.width = '';
        (cropperContainers[0] as HTMLDivElement).style.height = '';
        (cropperContainers[0] as HTMLDivElement).style.zIndex = '1';

        cropperValue.setCropBoxData({
          top: videoElement.clientHeight * 0.05,
          height: videoElement.clientHeight * 0.9,
        });
      }
    }, 100);
  }
}
