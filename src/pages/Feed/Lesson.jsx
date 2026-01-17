import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  HeadphonesIcon,
  PauseIcon,
  PlayIcon,
  Share2Icon,
} from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/shadcn/animate-ui/components/radix/hover-card";
import { Link, useSearchParams } from "react-router";
import { api } from "@/utils/api/api_connection";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button.tsx";
import { formatDate, formatWeekDate } from "@/utils/formatters";
import logo from "@/assets/Logo1.png";

const LessonPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [upNext, setUpNext] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  const loadLesson = async () => {
    try {
      const id = searchParams.get("id");
      if (!id || id == null || id == "") {
        const p = await api(`/posts/daily-lessons`);
        setLessons(p.posts);
        setUpNext(p.up_next);
        setCurrentLesson(p.posts[0]);
      } else {
        const p = await api(`/posts/${id}`);
        setCurrentLesson(p);
        setLessons([p]);
      }
    } catch (error) {
      console.log(error.message);
      setLessons(lessons);
      setUpNext(upNext);
      setCurrentLesson(currentLesson);
    }
  };

  const changeLesson = ({ steps, id } = {}) => {
    // Guard: need lessons loaded
    if (!Array.isArray(lessons) || lessons.length === 0) {
      console.error("No lessons available to navigate.");
      return;
    }

    // Prefer direct navigation by id (if provided)
    if (id !== undefined && id !== null && `${id}`.trim() !== "") {
      const match = lessons.find((l) => `${l?.id}` === `${id}`);

      if (!match) {
        console.error(`Lesson with id "${id}" not found in lessons.`);
        return;
      }

      setCurrentLesson(match);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    // Otherwise navigate by steps
    if (steps === undefined || steps === null) {
      console.error('Provide either "steps" or "id".');
      return;
    }

    const parsedSteps = Number.parseInt(steps, 10);
    if (Number.isNaN(parsedSteps)) {
      console.error('Invalid "steps" value. It must be a number.');
      return;
    }

    const lessonIndex = lessons.findIndex((l) => l?.id === currentLesson?.id);
    if (lessonIndex === -1) {
      console.error("Current lesson does not exist in lessons list.");
      return;
    }

    const newIndex = lessonIndex + parsedSteps;

    if (newIndex < 0 || newIndex >= lessons.length) {
      console.warn("Reached the end of the lesson list.");
      return;
    }

    setCurrentLesson(lessons[newIndex]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    loadLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleShare() {
    if (!currentLesson || currentLesson == null) return;
    const sharedTxt = `${
      currentLesson.personal_question?.trim().endsWith("?")
        ? currentLesson.personal_question
        : currentLesson.opening_hook
    }\n\nhttps://www.clm.org.ng/lesson?date=${currentLesson.date_posted}&id=${
      currentLesson.id
    }`;

    const shareData = {
      // heading: currentLesson,
      title: `${currentLesson.series_title}`,
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
    if (!currentLesson) return;
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech not supported in this browser.");
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const speechContent = `${currentLesson.series_title}\n${currentLesson.personal_question}\n${currentLesson.theme}\n\n${currentLesson.opening_hook}\n${currentLesson.biblical_qa}\n\n${currentLesson.reflection}\n${currentLesson.story}\n\nLet us pray. ${currentLesson.prayer}\n Here's a task for you. ${currentLesson.activity_guide}`;
      const utter = new SpeechSynthesisUtterance(speechContent);
      utter.lang = "en-UK";
      utter.rate = 0.9;
      window.speechSynthesis.speak(utter);
      setIsSpeaking(true);
    }
  }

  return (
    <>
      {/* HERO BANNER */}
      <div className="w-full min-h-[40vh] pt-24 pb-8 bg-linear-90 from-beta to-(--textHighlight) flex items-end justify-center text-wrap relative">
        <div className="w-full max-w-4xl p-12 max-md:px-6">
          {/* BANNER HEADING */}
          <div className="text-sm bg-white/30 w-fit px-3 py-2 rounded-full text-white">
            {formatDate(currentLesson?.date_posted)}
          </div>
          <div className="text-white mt-4">
            <p className="text-base opacity-80">
              {/* {formatDateIso(devotional.date)} */}
              {currentLesson?.series_title ?? ""}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight my-3">
              {currentLesson?.personal_question ?? ""}
            </h1>
            <p className="text-base opacity-80">
              {/* {formatDateIso(devotional.date)} */}
              {currentLesson?.theme ?? ""}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 text-white mt-4 text-lg">
            {/* PLAY BTN */}
            <button
              onClick={speakText}
              className="px-4 aspect-square rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              title="Play"
            >
              {isSpeaking ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* SHARE BTN */}
            <button
              onClick={handleShare}
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white flex items-center gap-3"
              title="Share devotional"
            >
              Share
              <Share2Icon />
            </button>
          </div>

          {/* NAVIGATION */}
          {lessons.length > 1 && (
            <div className="w-full absolute bottom-3 left-0 px-4">
              <div className="w-full max-w-4xl mx-auto overflow-auto">
                <ul className="w-fit flex flex-row-reverse gap-2">
                  {lessons.map((lesson, index) => {
                    const isActive =
                      lesson.date_posted == currentLesson.date_posted;
                    return (
                      <li
                        key={lesson.date_posted}
                        className={`flex ${
                          isActive ? "gap-4" : "gap-2"
                        } items-center`}
                      >
                        {index == lessons.length - 1 ? (
                          <></>
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-white/40"></div>
                        )}
                        <button
                          type="button"
                          onClick={() => changeLesson({ id: lesson.id })}
                          className={`${
                            isActive
                              ? "text-white bg-white/20"
                              : "text-gray-300"
                          } font-sans px-3 py-2 rounded-lg`}
                        >
                          <span>{formatWeekDate(lesson.date_posted)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:py-6">
        <main className="text-wrap bg-white text-slate-900 w-full md:max-w-5/6 lg:max-w-4/6 mx-auto rounded-2xl">
          <article className="w-full relative">
            {!currentLesson ? (
              <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
                <div className="max-w-2xl w-full text-center">
                  <h2 className="text-2xl font-semibold">
                    No devotionals found
                  </h2>
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
                      {currentLesson.opening_hook}
                    </p>
                  </div>

                  {/* SCRIPTURE */}
                  <div className="border-l-2 border-l-(--primary) px-6 py-4">
                    <blockquote className="mt-3 text-slate-700 text-lg md:text-xl italic">
                      <i>“{currentLesson.biblical_qa}”</i>
                    </blockquote>
                  </div>

                  {/* BODY */}
                  <div className="space-y-6 py-3">
                    <p className="text-xl md:text-2xl">
                      {currentLesson.reflection}
                    </p>
                  </div>
                  <div className="space-y-6 py-3">
                    <p className="text-xl md:text-2xl">{currentLesson.story}</p>
                  </div>

                  {/* PRAYER AND ACTIVITY */}
                  <div className="space-y-6 py-3">
                    <p className="text-lg md:text-xl font-medium">Prayer</p>
                    <p className="text-xl md:text-2xl">
                      {currentLesson.prayer}
                    </p>
                  </div>
                  <div className="space-y-6 py-3">
                    <p className="text-lg md:text-xl font-medium">
                      Activity Guide
                    </p>
                    <p className="text-xl md:text-2xl">
                      {currentLesson.activity_guide}
                    </p>
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
                <section className="border-t-2 border-t-(--primary)">
                  <div className="w-full flex justify-between items-center mt-8 gap-4">
                    {lessons.indexOf(currentLesson) === lessons.length - 1 ? (
                      <>
                        <div className="w-full flex flex-col items-center text-center">
                          <p className="text-lg text-black">
                            <span>
                              {`If you found this message helpful, make sure to
                              spread the word with family and friends.`}
                              <br />
                              {"You can also "}
                            </span>
                            <Link to={"/scripture"}>
                              <span className="text-lg text-blue-700 underline">
                                {"explore"}
                              </span>
                            </Link>
                            <span>{" other interesting topics!"}</span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => changeLesson({ steps: 1 })}
                        className="flex gap-2 border-gray-200 rounded-xl text-black/80 px-6 py-6"
                      >
                        <ChevronLeft />
                        <span>Prev</span>
                      </Button>
                    )}

                    {lessons.indexOf(currentLesson) === 0 ? (
                      <>
                        {upNext !== null ? (
                          <div className="flex-1 flex justify-end">
                            <HoverCard followCursor={false}>
                              <HoverCardTrigger asChild>
                                <button
                                  type="button"
                                  onClick={(e) => e.preventDefault()}
                                  className="w-full max-w-[200px] md:max-w-xs rounded-xl border border-(--primary) p-3 text-start"
                                >
                                  <legend className="text-base font-semibold text-(--textHighlight)">
                                    Next Upload:
                                  </legend>
                                  <div className="text-lg px-2">
                                    <p className="line-clamp-1">
                                      {upNext?.personal_question}
                                    </p>
                                    <span className="text-base text-black/60">
                                      {formatDate(upNext?.date_posted)}
                                    </span>
                                  </div>
                                </button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-full max-w-sm bg-white border-(--primary) rounded-2xl p-6 max-lg:translate-y-2/6 max-lg:-translate-x-2">
                                <div className="flex flex-col gap-4 text-wrap">
                                  <img
                                    className="size-20 rounded-full overflow-hidden -ml-2 -mb-2"
                                    src={logo}
                                    alt="Logo"
                                  />
                                  <div className="flex flex-col gap-4">
                                    <div>
                                      <div className="font-bold">
                                        Coming Soon:
                                      </div>
                                      <div className="text-sm text-(--textHighlight) italic">
                                        @{upNext?.theme}
                                      </div>
                                    </div>
                                    <div className="text-base text-black">
                                      {upNext?.personal_question}
                                    </div>
                                    <div className="flex gap-4">
                                      <div className="text-sm bg-black/10 w-fit px-3 py-2 rounded-full text-black/80">
                                        {formatDate(currentLesson?.date_posted)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => changeLesson({ steps: -1 })}
                        className="flex gap-2 border-gray-200 rounded-xl text-black/80 px-6 py-6 ml-auto"
                      >
                        <span>Next</span>
                        <ChevronRight />
                      </Button>
                    )}
                  </div>
                </section>

                <button
                  onClick={speakText}
                  className="px-4 aspect-square cursor-pointer fixed bottom-3 right-3 md:bottom-5 md:right-5 lg:right-10 py-2 rounded-full bg-(--primary) hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  title="Listen"
                >
                  {isSpeaking ? (
                    <PauseIcon className="w-8 h-8" />
                  ) : (
                    <HeadphonesIcon className="w-8 h-8" />
                  )}
                </button>
              </>
            )}
          </article>
        </main>
      </div>
    </>
  );
};
export default LessonPage;
