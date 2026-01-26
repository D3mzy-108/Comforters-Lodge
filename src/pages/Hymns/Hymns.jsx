import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/animate-ui/components/radix/accordion.tsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/animate-ui/components/radix/dropdown-menu";

import { Search, Music2, EllipsisVerticalIcon } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import HymnRow from "@/components/Hymns/HymnRow";
import { HymnGroup } from "@/utils/schemas";
import { api } from "@/utils/api/api_connection";

const buildSearchHaystack = (h) =>
  [
    String(h.hymn_number ?? ""),
    h.hymn_title,
    h.classification,
    h.tune_ref,
    h.cross_ref,
    h.scripture,
    h.chorus_title,
    h.chorus,
    ...(h.verses ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export default function HymnsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL instead of mirroring into local state
  const q = searchParams.get("hymn") ?? "";
  const normalizedQuery = useMemo(() => q.trim().toLowerCase(), [q]);

  const [openItems, setOpenItems] = useState([]);
  const [groups, setGroups] = useState([]);

  const setSearchParamsSafe = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams);
      if (next.hymn !== undefined) params.set("hymn", next.hymn);
      if (next.id !== undefined) {
        if (next.id) params.set("id", next.id);
        else params.delete("id");
      }
      // keep URL tidy
      if (!params.get("hymn")) params.delete("hymn");
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const expandAll = useCallback(() => {
    setOpenItems(groups.map((g) => g.group));
  }, [groups]);

  const collapseAll = useCallback(() => setOpenItems([]), []);

  useEffect(() => {
    document.title = "Hymns | Comforters Lodge";

    let cancelled = false;

    (async () => {
      const response = await api("/hymns/grouped");
      const hymnGroups = response.map((g) => new HymnGroup().fromJson(g));

      // Precompute _search once per hymn (big performance win on repeated searches)
      const withSearch = hymnGroups.map((g) => ({
        ...g,
        hymns: g.hymns.map((h) => ({
          ...h,
          _search: buildSearchHaystack(h),
        })),
      }));

      if (!cancelled) setGroups(withSearch);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!normalizedQuery) return groups;

    return groups
      .map((g) => ({
        ...g,
        hymns: g.hymns.filter((h) => h._search.includes(normalizedQuery)),
      }))
      .filter((g) => g.hymns.length > 0);
  }, [groups, normalizedQuery]);

  // Auto-open groups only while searching, and avoid resetting state unnecessarily
  useEffect(() => {
    if (!normalizedQuery) return;

    const next = filtered.map((g) => g.group);
    setOpenItems((prev) => {
      if (prev.length === next.length && prev.every((v, i) => v === next[i])) {
        return prev;
      }
      return next;
    });
  }, [normalizedQuery, filtered]);

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const value = String(formData.get("q") ?? "");
      setSearchParamsSafe({ hymn: value, id: "" });
    },
    [setSearchParamsSafe],
  );

  return (
    <div className="w-full">
      <PageBanner
        title="Immerse Yourself in the Timeless C&S Hymns"
        highlightedTitleText="Timeless C&S Hymns"
        subtitle="Sing with the saints of old, and let the Spirit breathe fresh life into your worship."
      />

      <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-6">
        {/* SEARCH BOX */}
        <div className="w-full flex max-md:flex-col items-start md:items-center gap-2">
          <div className="w-full flex justify-center items-center gap-2">
            <form
              onSubmit={onSubmitSearch}
              className="relative w-full max-w-3xl my-2"
            >
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search any detail you remember in the hymn and press Enter."
                className="w-full rounded-full bg-transparent pl-12 pr-8 py-3 border-2 border-(--primary) placeholder:text-(--primary) text-lg"
              />
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger className="bg-(--secondary)/40 rounded-full p-2 border-none outline-none">
                <EllipsisVerticalIcon className="text-xl text-(--textHighlight)" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white/50 backdrop-blur-md z-5000 border-none outline-none w-60 p-3">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    className="hover:bg-transparent"
                    onClick={expandAll}
                  >
                    <span>Expand All</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-(--primary) my-3" />

                  <DropdownMenuItem
                    variant="destructive"
                    className="hover:bg-transparent"
                    onClick={collapseAll}
                  >
                    <span>Collapse All</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
            No hymns matched your search.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="w-full"
          >
            {filtered.map((g) => (
              <AccordionItem
                key={g.group}
                value={g.group}
                className="border-b border-b-(--primary) last:border-b-0"
              >
                <AccordionTrigger
                  className={[
                    "py-6 text-left",
                    "data-[state=open]:[&>svg]:rotate-180",
                  ].join(" ")}
                >
                  <div className="flex w-full items-center justify-between gap-3 pr-2">
                    <div className="flex items-center gap-6">
                      <div className="grid size-14 place-items-center rounded-xl bg-(--secondary)/40">
                        <Music2 className="size-5 text-(--textHighlight)" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-xl">{g.group}</div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {g.hymns.map((h) => (
                      <HymnRow
                        key={h.id}
                        hymn={h}
                        onOpen={() => {
                          // Example: reflect selection in URL if you want
                          // setSearchParamsSafe({ hymn: h.hymn_title ?? "", id: h.id });
                        }}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
