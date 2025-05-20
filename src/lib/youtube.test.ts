import { describe, it, expect } from 'vitest';
import { isValidYouTubeChannelUrl } from './youtube';

describe('isValidYouTubeChannelUrl', () => {
  it.each([
    { url: 'https://www.youtube.com/@testchannel', expected: true },
    { url: 'https:/www.youtube.com/@testchannel', expected: true },
    { url: 'https://youtube.com/@testchannel', expected: true },
    { url: 'https:/youtube.com/@testchannel', expected: true },
  ])('should return $expected for $url', ({ url, expected }) => {
    expect(isValidYouTubeChannelUrl(url)).toBe(expected);
  });

  it.each([
    { url: 'https://www.youtube.com/testchannel', expected: false },
    { url: 'https://www.youtube.com/@testchannel/videos', expected: false },
    { url: 'invalid url', expected: false },
  ])('should return $expected for $url', ({ url, expected }) => {
    expect(isValidYouTubeChannelUrl(url)).toBe(expected);
  });
});
