import { describe, expect, it } from 'vitest';
import { formatElapsedTime } from '../src/utils/download';

describe('formatting utils', () => {
  it('format elapsed time', () => {
    expect(formatElapsedTime(8)).toBe('8 seconds');
    expect(formatElapsedTime(128)).toBe('2 minutes, 8 seconds');
    expect(formatElapsedTime(1)).toBe('1 second');
  });
});
