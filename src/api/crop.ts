import axios from 'axios';
import type { ApiResult, CropOptions, UploadMediaRequest } from '../app';
import { timeElapsed } from '../stores/state';

export namespace CropApi {
  const ROOT_URL = 'http://localhost:8000';

  async function middleware<T>(request: () => Promise<T>): Promise<T> {
    const before = new Date();
    const response = await request();
    const after = new Date();
    const diffMilliseconds = after.getTime() - before.getTime();
    const diffSeconds = Number((diffMilliseconds / 1000).toFixed(2));
    timeElapsed.set(diffSeconds);

    return response;
  }

  export async function cropImage(data: CropOptions): Promise<ApiResult> {
    const url = `${ROOT_URL}/api/crop-image`;
    const response = await middleware(() => axios.post<ApiResult>(url, data));
    return response.data;
  }

  export async function cropVideo(data: CropOptions): Promise<ApiResult> {
    const url = `${ROOT_URL}/api/crop-video`;
    const response = await middleware(() =>
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    const badResult: ApiResult = {
      success: false,
      data: null,
      message: 'There was an error while cropping the video.',
    };
    try {
      const reader = response.body?.getReader();
      while (reader) {
        const { value } = await reader.read();
        if (!value) continue;

        const regex = new RegExp(/data:({.*})/);
        const decodedResponse = new TextDecoder().decode(value);
        const matches = regex.exec(decodedResponse);
        if (!matches || matches.length < 2) continue;

        const result = JSON.parse(matches[1]);

        // TODO: implement better type validation
        if (
          result.success === undefined ||
          result.message === undefined ||
          result.data === undefined
        )
          return badResult;

        return result;
      }
    } catch (error) {
      console.log(badResult.message, JSON.stringify(error));
      return badResult;
    }

    return badResult;
  }

  export async function uploadMedia(
    data: UploadMediaRequest
  ): Promise<ApiResult> {
    const url = `${ROOT_URL}/api/upload-media`;
    const response = await axios.post(url, data);
    return response.data;
  }
}
