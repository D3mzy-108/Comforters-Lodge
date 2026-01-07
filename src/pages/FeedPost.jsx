import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { HeadphonesIcon, Square } from "lucide-react";
import { useSearchParams } from "react-router";
import { api } from "@/utils/api/api_connection";

/* -------------------------
   Utilities
   ------------------------- */
// function formatDateIso(isoDate) {
//   const d = new Date(isoDate);
//   return d.toLocaleDateString(undefined, {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

const FeedPost = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [lesson, setLesson] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const loadLesson = async () => {
    try {
      const p = await api(`/posts/${searchParams.get("id")}`);
      setLesson(p);
    } catch (error) {
      console.log(error.message);
      setLesson(lesson);
    }
  };

  useEffect(() => {
    loadLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleShare() {
    if (!lesson || lesson == null) return;
    const sharedTxt = `${
      lesson.personal_question?.trim().endsWith("?")
        ? lesson.personal_question
        : lesson.opening_hook
    }\n\nhttps://www.clm.org.ng/lesson?date=${lesson.date_posted}&id=${
      lesson.id
    }`;

    const shareData = {
      heading: lesson,
      title: `${lesson.series_title}`,
      text: `${sharedTxt}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or failed
        console.warn("Share failed:", err);
      }
    } else {
      // fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${sharedTxt}`);
        alert("Devotional copied to clipboard.");
      } catch {
        alert("Share is not supported in this browser.");
      }
    }
  }

  function speakText() {
    if (!lesson) return;
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech not supported in this browser.");
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const speechContent = `${lesson.series_title}\n${lesson.personal_question}\n${lesson.theme}\n\n${lesson.opening_hook}\n${lesson.biblical_qa}\n\n${lesson.reflection}\n${lesson.story}\n\nLet us pray. ${lesson.prayer}\n Here's a task for you. ${lesson.activity_guide}`;
      const utter = new SpeechSynthesisUtterance(speechContent);
      utter.lang = "en-UK";
      window.speechSynthesis.speak(utter);
      setIsSpeaking(true);
    }
  }

  return (
    <>
      <NavBar />
      <div className="w-full h-[400px] py-16 lg:py-4 bg-linear-90 from-beta to-(--textHighlight) flex items-end justify-center text-wrap">
        <div className="w-full max-w-4xl p-12">
          <div className="text-white">
            <p className="text-base opacity-80">
              {/* {formatDateIso(devotional.date)} */}
              {lesson?.series_title ?? ""}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight my-3">
              {lesson?.personal_question ?? ""}
            </h1>
            <p className="text-base opacity-80">
              {/* {formatDateIso(devotional.date)} */}
              {lesson?.theme ?? ""}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 text-white mt-4 text-lg">
            <button
              onClick={() => {}}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              title={"Bookmark"}
            >
              {"☆ Bookmark"}
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              title="Share devotional"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      <main className="text-wrap bg-white text-slate-900 w-full md:max-w-5/6 lg:max-w-4/6 mx-auto my-6 rounded-2xl">
        <article className="w-full relative">
          {!lesson ? (
            <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
              <div className="max-w-2xl w-full text-center">
                <h2 className="text-2xl font-semibold">No devotionals found</h2>
                <p className="mt-2 text-gray-600">
                  Add devotional content to display today's devotional.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Content */}
              <section className="space-y-8">
                {/* OPENING */}
                <div className="space-y-6 py-3">
                  <p className="text-xl md:text-2xl font-medium font-mono uppercase">
                    {lesson.opening_hook}
                  </p>
                </div>

                {/* SCRIPTURE */}
                <div className="border-l-2 border-l-(--primary) px-6 py-4">
                  <blockquote className="mt-3 text-slate-700 text-lg md:text-xl italic">
                    <i>“{lesson.biblical_qa}”</i>
                  </blockquote>
                </div>

                {/* BODY */}
                <div className="space-y-6 py-3">
                  <p className="text-xl md:text-2xl">{lesson.reflection}</p>
                </div>
                <div className="space-y-6 py-3">
                  <p className="text-xl md:text-2xl">{lesson.story}</p>
                </div>

                {/* PRAYER AND ACTIVITY */}
                <div className="space-y-6 py-3">
                  <p className="text-lg md:text-xl font-medium">Prayer</p>
                  <p className="text-xl md:text-2xl">{lesson.prayer}</p>
                </div>
                <div className="space-y-6 py-3">
                  <p className="text-lg md:text-xl font-medium">
                    Activity Guide
                  </p>
                  <p className="text-xl md:text-2xl">{lesson.activity_guide}</p>
                </div>

                {/* Tags & Actions */}
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => window.print()}
                    className="text-sm px-3 py-2 rounded-md border border-slate-200"
                  >
                    Print
                  </button>

                  <a
                    href={`#comments`}
                    className="text-sm px-3 py-2 rounded-md border border-slate-200"
                  >
                    Comments
                  </a>
                </div>
              </section>

              {/* Comments stub */}
              <section
                id="comments"
                className="mt-10 border-t-2 border-t-(--primary) p-6"
              >
                <h3 className="font-semibold">Comments</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Comments are disabled in the sample. Integrate your comments
                  provider here (Disqus, Firebase, custom API).
                </p>
              </section>

              <button
                onClick={speakText}
                className="px-4 aspect-square cursor-pointer fixed bottom-3 right-3 md:bottom-5 md:right-5 lg:right-10 py-2 rounded-full bg-(--primary) hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                title="Listen"
              >
                {isSpeaking ? (
                  <Square fill="fill" className="w-8 h-8" />
                ) : (
                  <HeadphonesIcon className="w-8 h-8" />
                )}
              </button>
            </>
          )}
        </article>
      </main>
    </>
  );
};
export default FeedPost;
