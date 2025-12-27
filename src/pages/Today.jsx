import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../components/Navbar";
import { FaHeadphones } from "react-icons/fa";

const sampleDevotionals = [
  {
    id: "2025-12-11",
    date: "2025-12-11",
    title: "Fast",
    scripture: "Psalm 46:1-3",
    scriptureText:
      "God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear...",
    opening:
      "In a world where spiritual content floods our phones daily: videos promising prosperity, prophets declaring divine appointments, and ministries selling “anointed lingerie” or “keys to breakthrough”. From prophetic garments to miracle soaps and prosperity oils, some ministries today merchandise blessings, offering favour through fashion rather than through faith. ",
    body: "It’s easy for young believers to feel confused. Some lies come gift-wrapped as truth, but lead only to bondage. This week, we begin our journey by learning how to stand firm against deception; starting with seeing clearly what’s really going on around us. It’s important to remember, however, that some who teach wrongly may not be false prophets; some are just uninformed, immature, or still growing in their walk with Christ. That’s why we need both discernment and grace. See the Situation Clearly Seeing Through the Noise: How to Recognize Spiritual Deception Ayo sat alone at home watching a live stream from an international prophet who had gone viral online. He spoke with conviction, promising that everyone “under the sound of his voice” would receive “miracle money” in their phones. She watched testimonies of people claiming they’d received payment notifications from their banks. It looked real. It sounded divine. But deep inside, something didn’t sit right. Later that night, she searched online for more information. That’s when she came across reports about the pastor’s controversial “Miracle Money” doctrine. Some followers claim these teachings encourage mindless entitlement, stirring unhealthy expectations and passive faith, while others defend it as divine instruction and provision. There were no clear answers, only more confusion. Just like Eve in Eden, Ayo wasn’t being told outright lies, but half-truths wrapped in charisma and the appearance of anointing. And those are often the most dangerous type. When Adam and Eve were in the Garden of Eden, they lived in perfect relationship with God. There was no fear, no shame, and no confusion. But one day, a voice came, not from God, but from the enemy of their souls, and it whispered something that sounded like truth but led to destruction. “Did God really say…?” (Genesis 3:1). That question planted doubt, and soon after, sin entered the world. Eve wasn’t seduced by something ugly and uninviting; she was drawn to something pleasing to the eye and desirable for gaining wisdom (Genesis 3:6). Deception often feels right before it proves wrong. Today, the enemy still uses subtle questions, persuasive voices, and clever lies to distort truth. He doesn’t always come roaring like a lion; often, he speaks softly through social media, podcasts, or even well-meaning friends who unknowingly pass along false ideas about God, faith, or life. As new believers, it’s vital that we learn to 'see' spiritually. This means stepping back and asking: What is really happening here? What does Scripture say? Where might I be missing the mark? Technology makes it easier than ever before to access information; but not all information is truth. In fact, some of it can lead us away from God’s best. Just because someone sounds spiritual doesn’t mean they’re speaking truth. And just because something feels good doesn’t mean it aligns with God’s Word. But here’s the danger. Deception rarely announces itself. It arrives dressed as wisdom, cloaked in charisma, and backed by applause. So here’s the good news. God has given us everything we need to see clearly—His Word, His Spirit, and His people. ",
    reflection:
      "Ask: - What are the voices you're listening to most? - Are they drawing you closer to Jesus or keeping you distracted? - Have you ever questioned if something “spiritual” was actually leading you astray?",
    prayer:
      "Lord, help me see clearly what’s happening around me. Open my eyes to deception and sharpen my discernment. Let Your Word be my filter and Your Spirit my guide.",
    topic: "Steady in the Storm",
    act: "Act slowly, not reactively. Test everything against truth and Act in alignment, even when it costs you.",
    tags: ["trust", "steadfastness", "prayer"],
  },
  {
    id: "2025-12-09",
    date: "2025-12-09",
    title: "Stand",
    scripture: "Lamentations 3:22-23",
    scriptureText:
      "Because of the LORD’s great love we are not consumed, for his compassions never fail. They are new every morning...",
    opening:
      "In a world where spiritual content floods our phones daily: videos promising prosperity, prophets declaring divine appointments, and ministries selling “anointed lingerie” or “keys to breakthrough”. From prophetic garments to miracle soaps and prosperity oils, some ministries today merchandise blessings, offering favour through fashion rather than through faith. ",
    body: "Every morning gives us a fresh page. Grace isn't just forgiveness — it's power to begin again. Let today's routine be a way to receive that grace.",
    reflection:
      "How can you build a short morning moment to accept God's grace?",
    prayer:
      "Father, help me to meet each morning expecting Your new mercies. Amen.",
    topic: "Grace For the Morning",
    act: "Act slowly, not reactively. Test everything against truth and Act in alignment, even when it costs you.",
    tags: ["grace", "morning"],
  },
  {
    id: "2025-12-10",
    date: "2025-12-10",
    title: "Stand",
    scripture: "Lamentations 3:22-23",
    scriptureText:
      "Because of the LORD’s great love we are not consumed, for his compassions never fail. They are new every morning...",
    opening:
      "In a world where spiritual content floods our phones daily: videos promising prosperity, prophets declaring divine appointments, and ministries selling “anointed lingerie” or “keys to breakthrough”. From prophetic garments to miracle soaps and prosperity oils, some ministries today merchandise blessings, offering favour through fashion rather than through faith. ",
    body: "Every morning gives us a fresh page. Grace isn't just forgiveness — it's power to begin again. Let today's routine be a way to receive that grace.",
    reflection:
      "How can you build a short morning moment to accept God's grace?",
    prayer:
      "Father, help me to meet each morning expecting Your new mercies. Amen.",
    topic: "Grace For the Morning",
    act: "Act slowly, not reactively. Test everything against truth and Act in alignment, even when it costs you.",
    tags: ["grace", "morning"],
  },
  // ...add more entries
];

/* -------------------------
   Utilities
   ------------------------- */
function formatDateIso(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

/* -------------------------
   Component
   ------------------------- */
const TodaysDevotional = ({ devotionals = sampleDevotionals }) => {
  // default to today's date if exists, otherwise first item
  const todayIso = new Date().toISOString();
  const defaultIndex = devotionals.findIndex((d) => d.date === todayIso);
  const [index, setIndex] = useState(defaultIndex >= 0 ? defaultIndex : 0);
  const devotional = devotionals[index];

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const raw = localStorage.getItem("bookmarkedDevotionals");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const isBookmarked = useMemo(
    () => bookmarkedIds.includes(devotional?.id),
    [bookmarkedIds, devotional]
  );

  useEffect(() => {
    // persist bookmarks
    try {
      localStorage.setItem(
        "bookmarkedDevotionals",
        JSON.stringify(bookmarkedIds)
      );
    } catch {}
  }, [bookmarkedIds]);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(devotionals.length - 1, i + 1));
  const goToIndex = (i) =>
    setIndex(Math.max(0, Math.min(devotionals.length - 1, i)));

  function toggleBookmark() {
    if (!devotional) return;
    setBookmarkedIds((cur) =>
      cur.includes(devotional.id)
        ? cur.filter((id) => id !== devotional.id)
        : [devotional.id, ...cur]
    );
  }

  async function handleShare() {
    if (!devotional) return;
    const shareData = {
      title: devotional.title,
      text: `${devotional.title} — ${formatDateIso(devotional.date)}\n\n${
        devotional.scripture
      }`,
      // Note to self. I need a url
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
        await navigator.clipboard.writeText(
          `${shareData.title}\n${formatDateIso(devotional.date)}\n${
            devotional.scripture
          }\n\n${devotional.body}`
        );
        alert("Devotional copied to clipboard (share not supported).");
      } catch {
        alert("Share is not supported in this browser.");
      }
    }
  }

  function speakText() {
    if (!devotional) return;
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech not supported in this browser.");
      return;
    }
    const utter = new SpeechSynthesisUtterance(
      `${devotional.title}. ${devotional.scripture}. ${devotional.body} Reflection: ${devotional.reflection} Prayer: ${devotional.prayer}`
    );
    utter.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  if (!devotional) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-2xl font-semibold">No devotionals found</h2>
          <p className="mt-2 text-gray-600">
            Add devotional content to display today's devotional.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen py-25 px-4 md:px-8 text-wrap bg-white text-slate-900">
        <article className="max-w-4xl relative mx-auto">
          {/* Header card */}
          <header className="bg-linear-90 from-beta to-gamma text-white rounded-2xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm opacity-80">
                  {/* {formatDateIso(devotional.date)} */}
                  {devotional.topic}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight mt-1">
                  {devotional.title}
                </h1>
                <p className="mt-2 text-sm opacity-90">
                  • {readingTime(devotional.body)} min read
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleBookmark}
                  aria-pressed={isBookmarked}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  title={isBookmarked ? "Remove bookmark" : "Bookmark"}
                >
                  {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                </button>

                <button
                  onClick={handleShare}
                  className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                  title="Share devotional"
                >
                  Share
                </button>
              </div>
            </div>

            {/* nav small */}
            <nav className="mt-6 flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  disabled={index === 0}
                  className="px-3 py-2 rounded-md bg-white/8 disabled:opacity-40"
                >
                  ← Previous
                </button>
                <button
                  onClick={goNext}
                  disabled={index === devotionals.length - 1}
                  className="px-3 py-2 rounded-md bg-white/8 disabled:opacity-40"
                >
                  Next →
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs opacity-90">Jump to</label>
                <select
                  value={index}
                  onChange={(e) => goToIndex(Number(e.target.value))}
                  className="rounded-md px-2 py-1 bg-white/10"
                  aria-label="Select devotional by date"
                >
                  {devotionals.map((d, i) => (
                    <option key={d.id} value={i}>
                      {new Date(d.date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </nav>
          </header>

          {/* Content */}
          <section className="mt-8 space-y-8">
            {/* Scripture */}
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-[1.75rem] font-semibold">
                Scripture — {devotional.scripture}
              </h3>
              <blockquote className="mt-3 text-slate-700 text-[1.5rem] italic">
                “{devotional.scriptureText}”
              </blockquote>
            </div>

            {/* Body */}
            <div className="prose max-w-none text-[1.5rem]">
              <h2 className="text-xl font-semibold">Opening</h2>
              <p>{devotional.opening}</p>
              <h2 className="text-xl mt-4 font-semibold">Devotional</h2>
              <p>{devotional.body}</p>

              <h3 className="mt-4 font-semibold">Key thought</h3>
              <p className="italic">{devotional.reflection}</p>

              <h3 className="mt-4 font-semibold">Prayer</h3>
              <p>{devotional.prayer}</p>

              <h3 className="mt-4 font-semibold">Actions</h3>
              <p>{devotional.act}</p>
            </div>

            {/* Tags & Actions */}
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex gap-2 items-center flex-wrap">
                {devotional.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-800"
                  >
                    #{t}
                  </span>
                ))}
              </div>

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
            </div>

            {/* Bookmarks list preview */}
            <div className="rounded-lg bg-slate-50 p-4 border">
              <h4 className="font-semibold">Your bookmarks</h4>
              {bookmarkedIds.length === 0 ? (
                <p className="text-sm text-slate-600 mt-2">
                  No bookmarks yet — click “Bookmark” to save.
                </p>
              ) : (
                <ul className="mt-2 space-y-2 text-sm">
                  {bookmarkedIds.map((id) => {
                    const item = devotionals.find((d) => d.id === id);
                    return (
                      <li
                        key={id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{item?.title ?? id}</div>
                          <div className="text-xs text-slate-600">
                            {item ? formatDateIso(item.date) : ""}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const foundIndex = devotionals.findIndex(
                                (d) => d.id === id
                              );
                              if (foundIndex >= 0) setIndex(foundIndex);
                            }}
                            className="text-xs px-2 py-1 rounded border"
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              setBookmarkedIds((cur) =>
                                cur.filter((x) => x !== id)
                              )
                            }
                            className="text-xs px-2 py-1 rounded border"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>

          {/* Comments stub */}
          <section id="comments" className="mt-10 rounded-lg border p-6">
            <h3 className="font-semibold">Comments</h3>
            <p className="text-sm text-slate-600 mt-2">
              Comments are disabled in the sample. Integrate your comments
              provider here (Disqus, Firebase, custom API).
            </p>
          </section>

          <button
            onClick={speakText}
            className="px-3 fixed bottom-10 md:right-10 lg:right-50 py-2 rounded-full bg-black/40 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            title="Listen"
          >
            <FaHeadphones className="h-14 w-12" />
          </button>
        </article>
      </main>
    </>
  );
};
export default TodaysDevotional;
