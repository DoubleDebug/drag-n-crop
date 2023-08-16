export namespace UrlHelper {
  /**
   * @returns `true` if the URL points to an image file with one of the supported extensions.
   */
  export function isImageUrl(url: string): boolean {
    const regex = new RegExp(
      /https:\/\/(.*?)(.(jpg|jpeg|png|gif|bmp|webp|svg))(\?(.*))?/
    );
    return regex.test(url);
  }

  /**
   * @returns `true` if the URL points to a video file with one of the supported extensions.
   */
  export function isVideoUrl(url: string): boolean {
    const regex = new RegExp(
      /https:\/\/(.*?)(\.(mp4|mkv|flv|avi|mov|wmv|webm))(\?(.*))?/
    );
    return regex.test(url);
  }
}
