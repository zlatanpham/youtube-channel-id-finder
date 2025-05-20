import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CopyButton from './copy-button';

interface ChannelData {
  channelId: string;
  url: string;
  rss: string;
  description: string;
  title: string;
}

interface ChannelDataDialogProps {
  data: ChannelData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChannelDataDialog({
  data,
  open,
  onOpenChange,
}: ChannelDataDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Channel Information</DialogTitle>
          <DialogDescription>
            Here is the channel information. Click to copy.
          </DialogDescription>
        </DialogHeader>
        {data ? (
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="channelId" className="w-20 flex-none">
                Channel ID
              </Label>
              <Input
                type="text"
                id="channelId"
                value={data.channelId}
                readOnly
              />
              <CopyButton text={data.channelId} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="url" className="w-20 flex-none">
                URL
              </Label>
              <Input type="text" id="url" value={data.url} readOnly />
              <CopyButton text={data.url} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="rss" className="w-20 flex-none">
                RSS
              </Label>
              <Input type="text" id="rss" value={data.rss} readOnly />
              <CopyButton text={data.rss} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="title" className="w-20 flex-none">
                Title
              </Label>
              <Input type="text" id="title" value={data.title} readOnly />
              <CopyButton text={data.title} />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="description" className="w-20 flex-none">
                Description
              </Label>
              <Input
                type="text"
                id="description"
                value={data.description}
                readOnly
              />
              <CopyButton text={data.description} />
            </div>
          </div>
        ) : (
          <div>No data available.</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
