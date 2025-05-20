# YouTube Channel ID Finder

This is a simple NextJS application that allows you to find the YouTube channel ID of any YouTube channel by entering the channel url.

## Quick Start

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

You can use the UI to retrieve the channel ID by entering the channel URL. Or you can use the API directly by open the following URL in your browser:

```
http://localhost:3000/id/${channel_url}
http://localhost:3000/rss/${channel_url}
```

Or you can try at the Vercel deployment:

```
https://youtube-channel-id-finder.vercel.app/id/@bbc
https://youtube-channel-id-finder.vercel.app/rss/@bbc
```

## License

This project is licensed under the MIT License.
