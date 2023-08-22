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

  /**
   * @returns file name of the resource url.
   * @example
   * - input: "https://i.imgur.com/mXxCzXG.png"
   * - output: mXxCzXG.png
   */
  export function getFilename(url: string): string | null {
    const regex = new RegExp(/https:\/\/\S+\/(\S+?\.\S{3})(\?(\S*))?/);
    const matches = regex.exec(url);
    if (!matches || matches.length < 2) return null;
    return matches[1];
  }
}
