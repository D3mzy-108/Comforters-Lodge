"use client";
import { cx, formatDate } from "@/utils/formatters";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card.tsx";
import { Badge } from "@/components/shadcn/ui/badge.tsx";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button.tsx";
import { BookOpenIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router";

function LessonMetaRow({ lesson }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <Badge
        variant="secondary"
        className="rounded-full bg-(--primary) text-black"
      >
        #{lesson.id}
      </Badge>
      <span className="text-muted-foreground">•</span>
      <span className="text-muted-foreground">
        {formatDate(lesson.date_posted)}
      </span>
    </div>
  );
}

export default function LessonCard({ lesson, onOpen }) {
  return (
    <Link to={`/lesson?date=${lesson.date_posted}&id=${lesson.id}`}>
      <Card
        className={cx(
          "group cursor-pointer rounded-3xl border border-(--primary) bg-background/70 shadow-md transition hover:shadow-lg text-wrap",
        )}
        onClick={() => onOpen(lesson)}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-3 text-start">
            <div className="min-w-0">
              <LessonMetaRow lesson={lesson} />
              <CardTitle className="mt-4 line-clamp-2 text-lg group-hover:underline">
                {lesson.personal_question}
              </CardTitle>
            </div>
            <div
              className={cx(
                "inline-flex items-center gap-2 rounded-2xl px-3 py-2",
              )}
            >
              <BookOpenIcon className="h-4 w-4" />
              {/* <span className="text-xs font-semibold">{lesson.passage}</span> */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 border border-(--primary) rounded-2xl">
            <div className="rounded-2xl p-3 border-b border-b-(--primary) bg-(--secondary)/40">
              <div className="text-sm font-semibold text-muted-foreground">
                Reflection
              </div>
              <div className="mt-1 line-clamp-2 text-base">
                {lesson.reflection}
              </div>
            </div>
            <div className="rounded-2xl p-3">
              <div className="text-sm font-semibold text-muted-foreground">
                Activity guide
              </div>
              <div className="mt-1 line-clamp-2 text-base">
                {lesson.activity_guide}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
