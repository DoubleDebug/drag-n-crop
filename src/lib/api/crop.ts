import axios from 'axios';
import type { ApiResult, CropOptions } from '../../app';
import { timeElapsed } from '../../stores/state';

export namespace CropApi {
  const ROOT_URL = 'http://127.0.0.1:8000';

  async function middleware<T>(request: () => Promise<T>): Promise<T> {
    const before = new Date();
    const response = await request();
    const after = new Date();
    const diffMilliseconds = after.getTime() - before.getTime();
    const diffSeconds = Number((diffMilliseconds / 1000).toFixed(2));
    timeElapsed.set(diffSeconds);

    return response;
  }

  export async function cropImage(data: CropOptions) {
    const url = `${ROOT_URL}/api/crop-image`;
    const response = await middleware(() => axios.post<ApiResult>(url, data));
    return response.data;
  }

  export async function cropVideo(data: CropOptions) {
    const url = `${ROOT_URL}/api/crop-video`;
    const response = await middleware(() => axios.post<ApiResult>(url, data));
    return response.data;
  }
}
