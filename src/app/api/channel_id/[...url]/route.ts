import { isValidYouTubeChannelUrl } from '@/lib/youtube';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ url: string[] }> },
) {
  const resolvedParams = await params;
  if (!resolvedParams?.url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }
  const url = decodeURIComponent(resolvedParams.url.join('/'));

  if (!isValidYouTubeChannelUrl(url)) {
    return NextResponse.json(
      { error: `Invalid YouTube channel URL: ${url}` },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(url);
    const html = await res.text();
    const channelIdRegex =
      /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(.*?)"/;
    const match = html.match(channelIdRegex);
    const channelId = match ? match[1] : null;

    if (channelId === null) {
      return NextResponse.json(
        { error: 'The channel could not be found' },
        { status: 400 },
      );
    }

    // Extract description
    const descriptionRegex = /<meta name="description" content="(.*?)"/;
    const descriptionMatch = html.match(descriptionRegex);
    const description = descriptionMatch ? descriptionMatch[1] : null;

    // Extract title
    const titleRegex = /<title>(.*?)<\/title>/;
    const titleMatch = html.match(titleRegex);
    const title = titleMatch ? titleMatch[1] : null;

    return NextResponse.json({
      channelId,
      url: `https://www.youtube.com/channel/${channelId}`,
      rss: `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      description,
      title,
      // handle: handlerID,
    });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Handle unexpected errors
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
