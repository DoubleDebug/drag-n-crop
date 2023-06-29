import UploadIcon from '$lib/icons/UploadIcon.svelte';
import SelectIcon from '$lib/icons/SelectIcon.svelte';
import LoadingIcon from '$lib/icons/LoadingIcon.svelte';
import DownloadIcon from '$lib/icons/DownloadIcon.svelte';

export const steps = [
  {
    text: 'Upload file',
    icon: UploadIcon,
  },
  {
    text: 'Select an area',
    icon: SelectIcon,
  },
  {
    text: 'Download file',
    icon: DownloadIcon,
  },
];
