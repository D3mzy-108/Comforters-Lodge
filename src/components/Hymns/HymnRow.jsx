import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/shadcn/ui/dialog";
import { Badge } from "@/components/shadcn/ui/badge";
import { XIcon } from "lucide-react";
import { HymnDetailsHeader, HymnDetailsVerses } from "./HymnDetails";
import { Separator } from "@/components/shadcn/ui/separator";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button.tsx";

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
            <div className="space-y-3 flex-1 text-start text-wrap">
              <div className="font-medium text-lg text-(--textHighlight)">
                {hymn.hymn_title.replaceAll("\t", "")}
              </div>

              <div className="flex items-center gap-2">
                {hymn.classification ? (
                  <Badge variant="default" className="h-6 bg-gray-200">
                    {hymn.classification}
                  </Badge>
                ) : null}
              </div>

              {/* <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {hymn.scripture ? (
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {hymn.scripture}
                  </span>
                ) : null}
                {hymn.tune_ref ? <span>• Tune: {hymn.tune_ref}</span> : null}
                {hymn.cross_ref ? <span>• Cross: {hymn.cross_ref}</span> : null}
              </div> */}
            </div>
            <div className="px-3 py-1 rounded-full bg-(--secondary)/60 grid place-items-center text-(--textHighlight) font-semibold text-lg">
              {hymn.hymn_number}
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        id="hymnDialogContent"
        className="max-w-3xl bg-white/80 backdrop-blur-2xl border-none z-9999 sm:rounded-3xl max-sm:h-full"
      >
        <div className="relative flex flex-col max-sm:h-dvh max-sm:max-h-dvh">
          <DialogClose asChild>
            <Button
              variant="default"
              size="default"
              className="w-fit ml-auto p-2 rounded-full bg-(--primary)/40 hover:bg-(--primary)/60 transition-colors absolute -top-2 -right-2 z-10"
            >
              <XIcon className="size-5 text-(--textHighlight)" />
            </Button>
          </DialogClose>

          <DialogHeader id="hymnDialogHead">
            <HymnDetailsHeader hymn={hymn} />
          </DialogHeader>
          <Separator className="mt-6 mb-8 bg-(--textHighlight)/70" />
          <div className="flex-1 sm:max-h-[55vh] overflow-auto scroll-style">
            <HymnDetailsVerses hymn={hymn} />
            <div className="mt-6 mb-12 text-(--textHighlight)">
              <span>Amin.</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
