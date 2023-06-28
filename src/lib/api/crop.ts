import axios from 'axios';
import type { ApiResult, CropOptions } from '../../app';

export namespace CropApi {
  const ROOT_URL = 'http://127.0.0.1:8000';

  export async function cropImage(data: CropOptions) {
    const url = `${ROOT_URL}/api/crop-image`;
    const response = await axios.post<ApiResult>(url, data);
    return response.data;
  }

  export async function cropVideo(data: CropOptions) {
    const url = `${ROOT_URL}/api/crop-video`;
    const response = await axios.post<ApiResult>(url, data);
    return response.data;
  }
}
