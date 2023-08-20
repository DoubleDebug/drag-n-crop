export namespace UrlHelper {
  /**
   * @returns `true` if the URL points to an image file with one of the supported extensions.
   */
  export function isImageUrl(url: string): boolean {
    const regex = new RegExp(
      /https:\/\/(\S*?)(.(jpg|jpeg|png|gif|bmp|webp|svg))(\?(\S*))?/
    );
    return regex.test(url);
  }

  /**
   * @returns `true` if the URL points to a video file with one of the supported extensions.
   */
  export function isVideoUrl(url: string): boolean {
    const regex = new RegExp(
      /https:\/\/(\S*?)(\.(mp4|mkv|flv|avi|mov|wmv|webm))(\?(\S*))?/
    );
    return regex.test(url);
  }
}
