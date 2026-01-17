import { useEffect, useMemo, useState } from "react";
import {
  BookOpenIcon,
  HomeIcon,
  RefreshCcwDotIcon,
  SearchIcon,
  SortDesc,
} from "lucide-react";
import { api } from "@/utils/api/api_connection";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button.tsx";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/shadcn/ui/card.tsx";
import { Input } from "@/components/shadcn/ui/input.tsx";
import {
  DevotionalDialog,
  DevotionalRail,
} from "@/components/Feed/DevotionalRail";
import LessonCard from "@/components/Feed/LessonCardComponents";
import { Link } from "react-router";
import { formatDate } from "@/utils/formatters";
import PageBanner from "@/components/PageBanner";

function ScripturesPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [lessons, setLessons] = useState([]);
  const [devotionals, setDevotionals] = useState([]);

  const [selectedDev, setSelectedDev] = useState(null);
  const [devDialogOpen, setDevDialogOpen] = useState(false);
  const [devDialogBg, setDevDialogBg] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

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
          formatDate(l.date_posted),
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

  const refreshPosts = async (page = pageNumber) => {
    try {
      const data = await api(`/posts/daily-lessons?page=${page}`);
      if (!lessons.includes(data.posts)) {
        setLessons([...lessons, ...data.posts]);
      }
      setPageNumber(data.page);
    } catch (e) {
      console.error(e.message);
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
      <PageBanner title="Scriptures" />

      {/* Body */}
      <main className="mx-auto px-2 md:px-6 py-2 md:py-4 space-y-8">
        {/* DAILY DEVOTIONS */}
        <div className="w-full pt-4 md:pt-6">
          <DevotionalRail devotionals={devotionals} onOpen={openDev} />
        </div>

        {/* LESSONS */}
        <div className="w-full p-4 md:p-6">
          <div className="space-y-10">
            <div className="flex max-lg:flex-col sm:items-center sm:justify-between gap-4">
              {/* SECTION TITLE */}
              <div className="flex items-center gap-2">
                <div className="inline-flex size-11 items-center justify-center rounded-xl border bg-background">
                  <BookOpenIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    Lessons for the Week
                  </div>
                  <div className="text-base text-muted-foreground">
                    Moments of truth and guidance from recent days.
                  </div>
                </div>
              </div>

              {/* SEARCH */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
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
                  className="h-11 rounded-2xl gap-2 bg-(--primary) hover:bg-(--primary) text-black capitalize"
                  onClick={() =>
                    setSort((s) => (s === "newest" ? "oldest" : "newest"))
                  }
                >
                  <SortDesc className="h-4 w-4" />
                  {sort}
                </Button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div
                key={sort + "|" + query}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
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

            <div className="w-full text-center">
              <button
                type="button"
                onClick={() => refreshPosts(pageNumber + 1)}
                className="bg-transparent border border-gray-400 text-black text-base flex gap-2 items-center px-4 py-2 rounded-full mx-auto cursor-pointer"
              >
                <RefreshCcwDotIcon className="size-5" />
                Show More
              </button>
            </div>
          </div>
        </div>
      </main>

      <DevotionalDialog
        open={devDialogOpen}
        onOpenChange={setDevDialogOpen}
        devotional={selectedDev}
        containerBG={devDialogBg}
      />
    </div>
  );
}

export default ScripturesPage;
