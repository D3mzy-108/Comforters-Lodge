import { Badge } from "@/components/shadcn/ui/badge";
import { BookOpen } from "lucide-react";
import { DialogTitle } from "@/components/shadcn/ui/dialog.tsx";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area.tsx";

export function HymnDetailsHeader({ hymn }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3 relative">
        <div
          className={[
            "absolute -bottom-3 right-0",
            "grid place-items-center",
            "text-xl font-bold text-(--textHighlight)",
          ].join(" ")}
          style={{ fontFamily: "var(--comic-sans)" }}
        >
          {hymn.hymn_number}
        </div>
        <div className="space-y-3 flex-1 text-start text-wrap">
          <div className="flex items-center gap-2">
            {hymn.classification ? (
              <Badge variant="default" className="h-6 bg-(--primary)/75">
                {hymn.classification}
              </Badge>
            ) : null}
          </div>

          <DialogTitle className="font-bold text-xl mt-2">
            {hymn.hymn_title.replaceAll("\t", "")}
          </DialogTitle>

          <div className="flex flex-wrap gap-1 text-base text-muted-foreground">
            {hymn.scripture ? (
              <ScrollArea dir="horizontal" className="w-full">
                <span className="inline-flex items-center gap-1 text-nowrap">
                  <BookOpen className="h-3.5 w-3.5" />
                  {hymn.scripture}
                </span>
              </ScrollArea>
            ) : null}
            {hymn.tune_ref ? <span>- Tune: {hymn.tune_ref}</span> : null}
            {hymn.cross_ref ? <span>- Cross: {hymn.cross_ref}</span> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export function HymnDetailsVerses({ hymn }) {
  return (
    <>
      <div className="w-full text-wrap">
        {/* VERSES */}
        <div className="space-y-10">
          {(hymn.verses ?? []).length === 0 ? (
            <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
              No verses found.
            </div>
          ) : (
            hymn.verses.map((v, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-muted-foreground">
                    Verse {idx + 1}
                  </div>
                </div>
                <div className="whitespace-pre-wrap rounded-lg py-2 text-lg leading-relaxed">
                  <p>{v}</p>
                </div>

                {hymn.chorus && hymn.chorus.replace("\t", "") !== "-" ? (
                  <div className="whitespace-pre-wrap rounded-lg border border-(--primary) bg-(--secondary)/40 p-3 text-base leading-relaxed space-y-2">
                    <span className="text-sm font-semibold text-(--textHighlight)">
                      Chorus
                    </span>
                    <p className="text-lg">{hymn.chorus}</p>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
