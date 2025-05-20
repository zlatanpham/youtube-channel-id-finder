import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { url: string } },
) {
  const url = decodeURIComponent(params.url);
  try {
    const res = await fetch(url);
    const html = await res.text();
    const channelIdRegex =
      /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(.*?)"/;
    const match = html.match(channelIdRegex);
    const channelId = match ? match[1] : null;

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
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
