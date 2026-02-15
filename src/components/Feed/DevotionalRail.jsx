import { formatDate } from "@/utils/formatters";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button.tsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@/components/shadcn/ui/dialog.tsx";
import DevotionalDetailsView from "./DevotionalDetailsView";
import { XIcon } from "lucide-react";

const devotionBgList = [
  "linear-gradient(135deg, rgba(17, 94, 89, .95), rgba(20, 184, 166, .55))",
  "linear-gradient(135deg, rgba(88, 28, 135, .95), rgba(236, 72, 153, .5))",
  "linear-gradient(135deg, rgba(30, 64, 175, .95), rgba(59, 130, 246, .55))",
  "linear-gradient(135deg, rgba(185, 28, 28, .95), rgba(245, 158, 11, .55))",
  "linear-gradient(135deg, rgba(15, 23, 42, .96), rgba(100, 116, 139, .55))",
];

export function DevotionalRail({ devotionals, onOpen }) {
  return (
    <>
      {/* ========== */}
      <div className="p-4 md:p-6 flex max-md:flex-col gap-6 lg:gap-24 items-center">
        <div className="w-full max-lg:max-w-[350px] lg:w-fit flex flex-col gap-4">
          <legend className="section-title" style={{ fontSize: "3.5rem" }}>
            <span className="text-(--textHighlight)">{"Daily"}</span>
            <span className="text-black/90">{" Devotions"}</span>
          </legend>
          <p className="text-black/60 text-xl font-normal italic">
            {"Status updates, but for the soul."}
          </p>
        </div>

        <div className="w-full flex-1 overflow-auto p-2 max-sm:mt-2 lg:p-4 rounded-4xl bg-(--secondary)/30 border-2 border-(--primary)/50">
          <div className="mt-2 px-2 md:px-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {devotionals.map((d) => {
              const idx = devotionals.slice(0).reverse().indexOf(d);
              const containerBG = devotionBgList[idx % devotionBgList.length];
              return (
                <motion.button
                  key={d.id}
                  onClick={() => onOpen(d)}
                  className="group relative w-48 aspect-4/5 shrink-0 overflow-hidden rounded-3xl shadow bg-background text-left text-wrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <DevotionalCard
                    devotion={d}
                    properties={{ idx: idx, containerBG: containerBG }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function DevotionalCard({ devotion, properties }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: properties.containerBG,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-black/0" />
      <div className="relative flex h-full flex-col justify-between px-3 py-4">
        <div className="flex items-center justify-between">
          <div className="rounded-full bg-white/15 px-2 py-1 text-sm font-medium text-white/90 backdrop-blur">
            {formatDate(devotion.date_posted)}
          </div>
          <div className="h-2 w-2 rounded-full bg-white/70 opacity-0 transition group-hover:opacity-100" />
        </div>
        <div>
          <div
            className="text-lg font-semibold text-white/90 line-clamp-3"
            style={{ fontFamily: "var(--comic-sans)" }}
          >
            {devotion.verse_content}
          </div>
          <div className="mt-0.5 text-sm text-white/75">
            {devotion.citation}
          </div>
        </div>
      </div>
    </>
  );
}

export function DevotionalDialog({ open, onOpenChange, devotional }) {
  if (!devotional) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="z-99999999" />
      <DialogContent
        showCloseButton={false}
        className="max-w-xl overflow-hidden rounded-3xl p-0 border-0 text-wrap z-99999999 bg-(--secondary)/30 backdrop-blur-2xl"
      >
        <DialogTitle className="hidden">Devotion</DialogTitle>
        <DialogDescription className="hidden">
          Reflection verse of the day
        </DialogDescription>
        <div className="w-full relative">
          <div className="flex items-center justify-between">
            <div className="rounded-none rounded-br-full bg-(--secondary)/30 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur">
              {formatDate(devotional.date_posted)}
            </div>
            <Button
              variant="secondary"
              size="icon-lg"
              className="px-6 rounded-none rounded-bl-full bg-(--secondary)/50 text-white hover:bg-(--secondary)/30"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="size-6" />
            </Button>
          </div>
          <DevotionalDetailsView devotional={devotional} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
