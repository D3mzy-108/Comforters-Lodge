import { Share2Icon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button.tsx";
import { _pickDailyBackground } from "@/utils/devotion-verse-bg";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area.tsx";
import logo from "@/assets/Logo1.png";
import { toBlob } from "html-to-image";

export default function DevotionalDetailsView({ devotional }) {
  const imgRef = useRef(null);
  const backgroundImage = _pickDailyBackground(devotional.date_posted);

  const prayerText =
    devotional.prayer ??
    "Take a quiet moment here. Let this verse guide your own words before the Lord. Speak from your heart.";

  const shareDevotional = async () => {
    try {
      if (!imgRef.current) return;

      // Ensure the background image is warmed up before capture (reduces “blank bg” risk)
      if (backgroundImage) {
        const preload = new Image();
        preload.src = backgroundImage;
        // @ts-ignore
        if (preload.decode) await preload.decode();
      }

      const blob = await toBlob(imgRef.current, {
        cacheBust: true,
        pixelRatio: 2, // sharper
      });

      if (!blob) throw new Error("Failed to generate image.");

      const fileName = `daily-verse-${devotional.date_posted ?? "today"}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      const shareText = `📖 ${devotional.citation}\n“${devotional.verse_content}”\n\n🙏 Prayer:\n${prayerText}`;

      // Check support for file sharing
      const canShareFiles =
        typeof navigator !== "undefined" &&
        "share" in navigator &&
        // @ts-ignore
        (!navigator.canShare || navigator.canShare({ files: [file] }));

      if (canShareFiles) {
        // @ts-ignore
        await navigator.share({
          title: `Daily Verse • ${devotional.citation}`,
          text: shareText, // prayer as text (plus verse)
          files: [file], // verse image
        });
        return;
      }

      // Fallback: download the image + copy text to clipboard (best possible outside Web Share)
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
        // optionally show toast: “Image downloaded. Text copied.”
      }
    } catch (err) {
      console.error(err);
      // optionally show toast: “Couldn’t share right now.”
    }
  };

  return (
    <>
      <ScrollArea className="w-full p-4 h-[90vh]">
        <div className="flex flex-col gap-4 items-center">
          {/* VERSE CONTENT */}
          <div
            ref={imgRef}
            className="relative w-full max-w-xs aspect-2/3 overflow-hidden"
          >
            {/* Background image layer (blurred) */}
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-fill scale-110"
              style={{ filter: "blur(4px)" }}
            />

            {/* Foreground content */}
            <div className="relative h-full grid place-items-center px-6 py-24">
              <img
                src={logo}
                alt="logo"
                className="size-24 absolute -top-1 -left-1"
              />

              <p
                className="text-2xl text-center italic"
                style={{ fontFamily: "serif" }}
              >
                "{devotional.verse_content}"
                <br />
                <span> - {devotional.citation}</span>
              </p>

              <div
                className="w-full absolute bottom-0 right-0 left-0 text-end py-1 px-2 text-(--textHighlight) text-[11px]"
                style={{ lineHeight: "1.2" }}
              >
                <span className="font-medium">
                  Comforter's Lodge Ministries
                </span>
                <br />
                <span className="font-light text-[10px]">
                  An outreach of the Cherubim & Seraphim Church
                </span>
                <br />
                <span className="font-light">www.clm.org | info@clm.org</span>
              </div>
            </div>
          </div>

          {/* SHARE */}
          <Button
            variant="secondary"
            onClick={shareDevotional}
            className="rounded-full bg-(--primary)"
          >
            <Share2Icon className="mr-2 h-4 w-4" />
            Share
          </Button>

          {/* PRAYER */}
          <div className="w-full p-4 rounded-2xl bg-white/70">
            <legend className="text-(--textHighlight) font-bold">
              Prayer:
            </legend>
            <p className="text-lg italic">{prayerText}</p>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
