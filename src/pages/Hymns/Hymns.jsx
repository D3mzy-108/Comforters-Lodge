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

import {
  Search,
  Music2,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  ListMusicIcon,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import HymnRow from "@/components/Hymns/HymnRow";
import { HymnGroup } from "@/utils/schemas";
import { api } from "@/utils/api/api_connection";
import { convertSpecialCharactersToPlainTxt } from "@/utils/formatters";

const buildSearchHaystack = (h) =>
  convertSpecialCharactersToPlainTxt({
    stringValue: [
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
      .toLowerCase(),
    withSpecialCharacters: false,
  });

export default function HymnsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL instead of mirroring into local state
  const q = searchParams.get("hymn") ?? "";
  const c = searchParams.get("category") ?? "";
  const normalizedQuery = useMemo(
    () =>
      convertSpecialCharactersToPlainTxt({
        stringValue: q.trim().toLowerCase(),
        withSpecialCharacters: false,
      }),
    [q],
  );

  const [openItems, setOpenItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);

  const setSearchParamsSafe = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams);
      if (next.hymn !== undefined) params.set("hymn", next.hymn);
      if (next.id !== undefined) params.set("id", next.id);
      if (next.category !== undefined) params.set("category", next.category);

      // keep URL tidy
      if (!params.get("hymn")) params.delete("hymn");
      if (!params.get("id")) params.delete("id");
      if (!params.get("category")) params.delete("category");
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  function getClassifications(groups) {
    const classifications = groups
      .flatMap((g) => g.hymns)
      .map((h) => (h.classification ?? "").trim())
      .filter(Boolean);

    return [...new Set(classifications)].sort((a, b) => a.localeCompare(b));
  }

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
      setCategories(getClassifications(hymnGroups));

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
    const hasQuery = normalizedQuery.length > 0;
    const hasClass = c.length > 0;

    if (!hasQuery && !hasClass) return groups;

    return groups
      .map((g) => ({
        ...g,
        hymns: g.hymns.filter((h) => {
          const matchesQuery =
            !hasQuery || (h._search?.includes(normalizedQuery) ?? false);
          const matchesClass = !hasClass || h.classification === c;
          return matchesClass && matchesQuery;
        }),
      }))
      .filter((g) => g.hymns.length > 0);
  }, [c, groups, normalizedQuery]);

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
        <div className="w-full max-w-3xl mx-auto flex flex-col items-start md:items-center gap-2">
          {/* SEARCH FILTER */}
          <div className="w-full flex max-md:flex-col items-center gap-2 border border-(--textHighlight) rounded-xl px-2">
            <form onSubmit={onSubmitSearch} className="relative flex-1 my-2">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-(--textHighlight)" />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search any detail you remember in the hymn and press Enter."
                className="w-full rounded-xl bg-transparent pl-12 pr-8 py-2.5 border-0 text-lg"
              />
            </form>

            <div className="w-full md:w-0.5 h-0.5 md:h-8 bg-black/30 max-md:-mt-2"></div>

            <div className="flex w-full md:w-fit items-center gap-2 max-md:pb-2">
              {/* CATEGORY FILTER */}
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full max-md:flex-1 md:w-fit bg-transparent px-4 py-2.5 text-lg">
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 whitespace-nowrap md:max-w-24 overflow-clip text-start">
                      {c == "" ? "Select Category" : c}
                    </div>
                    <ChevronDownIcon className="size-5" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white/70 backdrop-blur-2xl z-5000 border-none outline-none w-60 p-1">
                  <DropdownMenuItem className="text-muted-foreground font-bold text-sm">
                    Categories:
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-black/40 mx-1 mt-2 mb-3" />
                  <DropdownMenuGroup>
                    <div>
                      <DropdownMenuItem
                        variant="destructive"
                        className={`hover:bg-(--secondary) px-3 py-3 ${c === "" && "bg-(--primary)"}`}
                        onClick={() => {
                          setSearchParamsSafe({
                            hymn: q,
                            id: "",
                            category: "",
                          });
                        }}
                      >
                        <span>Any</span>
                      </DropdownMenuItem>
                    </div>
                    {categories.map((category, index) => {
                      return (
                        <div key={index}>
                          <DropdownMenuItem
                            variant="destructive"
                            className={`hover:bg-(--secondary) px-3 py-3 ${category === c && "bg-(--primary)"}`}
                            onClick={() => {
                              setSearchParamsSafe({
                                hymn: q,
                                id: "",
                                category: category,
                              });
                            }}
                          >
                            <span>{category}</span>
                          </DropdownMenuItem>
                        </div>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="w-0.5 h-8 bg-black/30"></div>

              {/* EXPAND OR COLLAPSE */}
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-(--primary) rounded-xl p-2 mx-2 border-none outline-none">
                  <EllipsisVerticalIcon className="text-xl text-black" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white/70 backdrop-blur-2xl z-5000 border-none outline-none w-60 p-3">
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
        </div>

        {filtered.length === 0 ? (
          <div className="w-full max-w-xl mt-4 aspect-video mx-auto grid place-items-center border-2 md:border-4 border-dashed rounded-3xl border-(--primary)">
            <div className="w-fit text-center flex flex-col gap-4 items-center">
              <ListMusicIcon className="size-10 md:size-14 text-(--primary)/70" />
              <span className="text-xl md:text-2xl text-(--textHighlight) font-semibold">
                No Hymns Found!
              </span>
            </div>
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
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 px-3 py-px">
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
