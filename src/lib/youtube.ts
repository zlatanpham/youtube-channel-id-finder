export const youtubeChannelUrlPattern =
  /^https?:\/{1,2}(?:www\.)?youtube\.com\/@[\w\-.]{3,}$/;

export function isValidYouTubeChannelUrl(url: string): boolean {
  return youtubeChannelUrlPattern.test(url);
}
