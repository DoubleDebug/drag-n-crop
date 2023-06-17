import { writable } from 'svelte/store';

export const stage = writable<AppStage>('ready-to-upload');
