import { useEffect, useMemo, useState } from "react";
import {
  BookOpenIcon,
  ChevronRight,
  SearchIcon,
  SortAsc,
  SparklesIcon,
} from "lucide-react";
import { api } from "@/utils/api/api_connection";
import { Button } from "@/components/animate-ui/components/buttons/button.tsx";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  DevotionalDialog,
  DevotionalRail,
} from "@/components/Feed/DevotionalRail";
import LessonCard from "@/components/Feed/LessonCardComponents";

function Section({ icon, title, children }) {
  return (
    <div className="rounded-3xl border bg-background/70 p-4">
      <div className="flex items-center gap-2">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border bg-background">
          {icon}
        </div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}

function Feed() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [lessons, setLessons] = useState([]);
  const [devotionals, setDevotionals] = useState([]);

  const [selectedDev, setSelectedDev] = useState(null);
  const [devDialogOpen, setDevDialogOpen] = useState(false);
  const [devDialogBg, setDevDialogBg] = useState(false);

  const filtered = useMemo(() => {
    let arr = lessons;

    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter((l) => {
        const hay = [
          l.opening_hook,
          l.personal_question,
          l.biblical_qa,
          l.reflection,
          l.story,
          l.prayer,
          l.activity_guide,
          l.date_posted,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    arr.sort((a, b) => {
      if (sort === "newest") return b.date_posted.localeCompare(a.date_posted);
      if (sort === "oldest") return a.date_posted.localeCompare(b.date_posted);
      return 0;
    });

    return arr;
  }, [query, sort, lessons]);

  // eslint-disable-next-line no-unused-vars
  function openLesson(lesson) {
    // TODO: OPEN LESSON PAGE
  }

  function openDev(d, containerBg) {
    setSelectedDev(d);
    setDevDialogOpen(true);
    setDevDialogBg(containerBg);
  }

  // ==============================
  // LOAD PAGE DATA
  // ==============================

  const refreshPosts = async () => {
    try {
      const data = await api("/posts");
      setLessons(data);
    } catch (e) {
      console.log(e.message);
      setLessons(lessons);
    }
  };

  const refreshDevotions = async () => {
    try {
      const data = await api("/devotions");
      setDevotionals(data);
    } catch (e) {
      console.log(e.message);
      setDevotionals(devotionals);
    }
  };

  const refreshAll = async () => {
    await Promise.all([refreshPosts(), refreshDevotions()]);
  };

  useEffect(() => {
    // Initial load
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen text-wrap bg-linear-to-b from-muted/40 via-background to-background">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-(--secondary)/20 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-background shadow-sm">
                <SparklesIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold">Fellowship Feed</div>
                <div className="text-sm text-muted-foreground">
                  Daily devotionals and lessons for a shared walk with Jesus.
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-80">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search lessons, series, tags..."
                  className="h-11 rounded-2xl pl-9"
                />
              </div>

              <Button
                variant="secondary"
                className="h-11 rounded-2xl gap-2 bg-(--primary) text-black"
                onClick={() =>
                  setSort((s) => (s === "newest" ? "oldest" : "newest"))
                }
              >
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <main className="mx-auto px-4 md:px-12 py-6 md:py-8 space-y-6">
        <DevotionalRail devotionals={devotionals} onOpen={openDev} />

        <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
          {/* Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border bg-background">
                  <BookOpenIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Lessons</div>
                  <div className="text-xs text-muted-foreground">
                    Short highlights now, full details later.
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Showing {filtered.length}
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div
                key={sort + "|" + query}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onOpen={openLesson}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <Card className="rounded-3xl border bg-background/70">
                <CardContent className="p-6 text-sm text-muted-foreground">
                  No lessons match that search. Try a different word or clear
                  filters.
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:border-l lg:border-l-gray-200">
            <div className="flex flex-col gap-4 divide p-4">
              <Card className="rounded-3xl bg-(--secondary)/20 border border-b-2 border-(--primary) shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-(--textHighlight)">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button
                    variant="secondary"
                    className="rounded-lg p-6 shadow-sm justify-between bg-(--secondary)/40"
                  >
                    Request prayer
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-lg p-6 shadow-sm justify-between bg-(--secondary)/40"
                  >
                    Join small group
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-lg p-6 shadow-sm justify-between bg-(--secondary)/40"
                  >
                    See announcements
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <DevotionalDialog
        open={devDialogOpen}
        onOpenChange={setDevDialogOpen}
        devotional={selectedDev}
        containerBG={devDialogBg}
      />

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-2 text-xs text-muted-foreground">
        <Separator className="mb-4" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Bible Fellowship</div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border bg-background px-3 py-1">
              Built for: feed + devotionals
            </span>
            <span className="rounded-full border bg-background px-3 py-1">
              Cards: minimal, magazine, sermon
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Feed;
