export namespace FileApi {
  /**
   * @returns extension including the dot, or null if the fileName is invalid.
   * @example
   * const extension = FileApi.getExtension("my-fav-video.mp4");
   * console.log(extension); // .mp4
   */
  export function getExtension(fileName: string): string | null {
    const regex = new RegExp(/^[a-zA-Z0-9_\-]*(\.[a-zA-Z0-9]+)$/);
    const result = regex.exec(fileName);
    if (result === null || result.length !== 2) return null;

    return result[1];
  }
}
