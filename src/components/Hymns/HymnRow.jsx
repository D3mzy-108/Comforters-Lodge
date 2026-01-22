import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/shadcn/ui/dialog";
import { Badge } from "@/components/shadcn/ui/badge";
import { BookOpen, XIcon } from "lucide-react";
import { HymnDetailsHeader, HymnDetailsVerses } from "./HymnDetails";
import { Separator } from "@/components/shadcn/ui/separator";

export default function HymnRow({ hymn, onOpen }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={() => onOpen?.(hymn)}
          className={"w-full p-4 border border-(--primary) rounded-2xl"}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="px-3 py-1 rounded-full bg-(--secondary)/60 grid place-items-center text-(--textHighlight) font-semibold text-xl">
              {hymn.hymn_number}
            </div>
            <div className="space-y-3 flex-1 text-start text-wrap">
              <div className="flex items-center gap-2">
                {hymn.classification ? (
                  <Badge variant="default" className="h-6 bg-(--primary)">
                    {hymn.classification}
                  </Badge>
                ) : null}
              </div>

              <div className="font-medium text-lg">
                {hymn.hymn_title.replaceAll("\t", "")}
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {hymn.scripture ? (
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {hymn.scripture}
                  </span>
                ) : null}
                {hymn.tune_ref ? <span>• Tune: {hymn.tune_ref}</span> : null}
                {hymn.cross_ref ? <span>• Cross: {hymn.cross_ref}</span> : null}
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-3xl bg-white/80 backdrop-blur-lg border-none z-9999 rounded-3xl"
      >
        <div className="relative">
          <DialogClose asChild className="absolute -top-2 -right-2">
            <button
              type="button"
              className="p-2 rounded-full bg-(--primary)/40 hover:bg-(--primary)/60 transition-colors"
            >
              <XIcon className="size-5 text-(--textHighlight)" />
            </button>
          </DialogClose>

          <DialogHeader>
            <HymnDetailsHeader hymn={hymn} />
          </DialogHeader>
          <Separator className="my-8 bg-(--textHighlight)/70" />
          <HymnDetailsVerses hymn={hymn} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
