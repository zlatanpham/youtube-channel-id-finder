'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TvMinimalPlayIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChannelDataDialog } from '@/components/channel-data-dialog';
import * as z from 'zod';
import { isValidYouTubeChannelUrl } from '@/lib/youtube';
import CopyButton from '@/components/copy-button';

interface ChannelData {
  channelId: string;
  url: string;
  rss: string;
  description: string;
  title: string;
}

const formSchema = z.object({
  youtubeChannelUrl: z.string().url().refine(isValidYouTubeChannelUrl, {
    message: 'Must be a valid YouTube channel URL',
  }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ChannelData | null>(null);
  const [open, setOpen] = useState(false);
  const host = window.location.host;
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  useEffect(() => {
    if (data) {
      setOpen(true);
    }
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeChannelUrl: '',
    },
  });

  const youtubeChannelUrl = form.watch('youtubeChannelUrl');
  const textUrl = `${protocol}://${host}/id/${youtubeChannelUrl}`;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/channel_id/${encodeURIComponent(values.youtubeChannelUrl)}`,
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching channel data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <TvMinimalPlayIcon className="size-10" />
                  </div>
                  <span className="sr-only">Logo</span>
                </a>
                <h1 className="text-xl font-bold">Youtube Channel ID Finder</h1>
                <div className="text-center text-sm">
                  Enter the URL of the YouTube channel you want to process. We
                  will extract the channel ID for you.
                </div>
              </div>
              <FormField
                control={form.control}
                name="youtubeChannelUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="https://www.youtube.com/@bbc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Finding
                  </>
                ) : (
                  'Find Channel ID'
                )}
              </Button>
            </form>
          </Form>
          {youtubeChannelUrl ? (
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm text-muted-foreground">
                or get from the text URL:
              </div>
              <div className="flex items-center gap-2 w-full">
                <Input readOnly value={textUrl} className="flex-1" />
                <CopyButton text={textUrl} />
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-6 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          Made with ❤️ by{' '}
          <a href="https://github.com/zlatanpham">Zlatan Pham</a>
        </div>
        <ChannelDataDialog data={data} open={open} onOpenChange={setOpen} />
      </div>
    </div>
  );
}
