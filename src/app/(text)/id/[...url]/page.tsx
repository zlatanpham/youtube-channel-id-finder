import { Metadata } from 'next';
import { headers } from 'next/headers';

async function getData(youtubeChannelUrl: string) {
  const reqHeaders = await headers();
  const host = reqHeaders.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const response = await fetch(
    `${protocol}://${host}/api/channel_id/${encodeURIComponent(
      youtubeChannelUrl,
    )}`,
  );
  if (!response.ok || response.status !== 200) {
    const result = await response.json();
    throw new Error(`${result?.error || 'Unknown error'}`);
  }
  const data = await response.json();

  return data.channelId;
}

type Props = {
  params: Promise<{ url: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  let youtubeChannelUrl = resolvedParams?.url.join('/') || '';
  youtubeChannelUrl = decodeURIComponent(youtubeChannelUrl);
  return {
    title: `RSS Feed URL for ${youtubeChannelUrl}`,
  };
}

export default async function RssPage({ params }: Props) {
  const resolvedParams = await params;
  let youtubeChannelUrl = resolvedParams?.url.join('/') || '';
  youtubeChannelUrl = decodeURIComponent(youtubeChannelUrl);

  if (!youtubeChannelUrl) {
    return <div>Missing url</div>;
  }

  try {
    const rssUrl = await getData(youtubeChannelUrl);
    return <div>{rssUrl}</div>;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }
    return <div>An unexpected error occurred.</div>;
  }
}
