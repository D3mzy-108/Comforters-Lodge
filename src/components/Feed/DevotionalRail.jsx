import { formatDate } from "@/utils/formatters";
import { Button } from "@/components/animate-ui/components/buttons/button.tsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Dialog, DialogContent } from "@/components/ui/dialog.tsx";
import { BookmarkIcon, Share2Icon, XIcon } from "lucide-react";

const devotionBgList = [
  "linear-gradient(135deg, rgba(17, 94, 89, .95), rgba(20, 184, 166, .55))",
  "linear-gradient(135deg, rgba(88, 28, 135, .95), rgba(236, 72, 153, .5))",
  "linear-gradient(135deg, rgba(30, 64, 175, .95), rgba(59, 130, 246, .55))",
  "linear-gradient(135deg, rgba(185, 28, 28, .95), rgba(245, 158, 11, .55))",
  "linear-gradient(135deg, rgba(15, 23, 42, .96), rgba(100, 116, 139, .55))",
];

export function DevotionalRail({ devotionals, onOpen }) {
  return (
    <div className="bg-(--secondary)/30 rounded-3xl border-2 border-(--primary) p-4 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div>
            <div className="text-xl font-semibold">Daily Devotionals</div>
            <div className="text-base text-muted-foreground">
              Like status updates, but for the soul.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 px-2 md:px-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {devotionals.map((d, idx) => {
          const containerBG = devotionBgList[idx % devotionBgList.length];
          return (
            <motion.button
              key={d.id}
              onClick={() => onOpen(d, containerBG)}
              className="group relative w-32 md:w-48 aspect-4/5 shrink-0 overflow-hidden rounded-2xl shadow bg-background text-left text-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: containerBG,
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-black/0" />
              <div className="relative flex h-full flex-col justify-between p-3">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-white/15 px-2 py-1 text-xs md:text-sm font-medium text-white/90 backdrop-blur">
                    {formatDate(d.date_posted)}
                  </div>
                  <div className="h-2 w-2 rounded-full bg-white/70 opacity-0 transition group-hover:opacity-100" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-white line-clamp-3">
                    {d.verse_content}
                  </div>
                  <div className="mt-0.5 text-xs md:text-sm text-white/85">
                    {d.citation}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function DevotionalDialog({
  open,
  onOpenChange,
  devotional,
  containerBG,
}) {
  if (!devotional) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-xl overflow-hidden rounded-3xl p-0 border-0 text-wrap"
      >
        <div className="relative">
          <div
            className="h-[420px] w-full"
            style={{ background: containerBG }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-black/0" />

          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              {formatDate(devotional.date_posted)}
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/15 text-white hover:bg-white/20"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-white">
                  {devotional.verse_content}
                </div>
                <div className="text-base text-white/85">
                  {devotional.citation}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  className="rounded-full bg-white/15 text-white hover:bg-white/20"
                >
                  <Share2Icon className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full bg-white/15 text-white hover:bg-white/20"
                >
                  <BookmarkIcon className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white/10 p-4 text-white/95 backdrop-blur">
              Tip: Use this as a breath prayer throughout the day.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
