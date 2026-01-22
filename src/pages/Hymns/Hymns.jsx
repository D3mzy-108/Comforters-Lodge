import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/animate-ui/components/radix/accordion.tsx";
import { Badge } from "@/components/shadcn/ui/badge";

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

export default function HymnsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [openItems, setOpenItems] = useState([]);
  const [groups, setGroups] = useState([]);

  const normalizedQuery = query.trim().toLowerCase();

  const setSearch = (hymn, id) => {
    setSearchParams({ hymn: hymn, id: id });
  };

  const filtered = useMemo(() => {
    if (!normalizedQuery) return groups;

    const match = (h) => {
      const haystack = [
        String(h.hymn_number),
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

      return haystack.includes(normalizedQuery);
    };

    return groups
      .map((g) => ({ ...g, hymns: g.hymns.filter(match) }))
      .filter((g) => g.hymns.length > 0);
  }, [groups, normalizedQuery]);

  useEffect(() => {
    document.title = "Hymns | Comforters Lodge";

    const fetchHymns = async () => {
      const response = await api("/hymns/grouped");
      const hymnGroups = response.map((g) => new HymnGroup().fromJson(g));
      setGroups(hymnGroups);
    };
    fetchHymns();
  }, []);

  useEffect(() => {
    setQuery(searchParams.get("hymn") ?? "");
  }, [searchParams]);
  // Auto-open matching groups while searching.
  useEffect(() => {
    if (!normalizedQuery) return;
    setOpenItems(filtered.map((g) => g.group));
  }, [normalizedQuery, filtered]);

  return (
    <div className="w-full">
      <PageBanner title="Hymns" />

      <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-6">
        {/* SEARCH BOX */}
        <div className="w-full flex max-md:flex-col items-start md:items-center gap-2">
          <legend
            className="flex-1 text-2xl font-bold text-(--textHighlight)"
            style={{ fontFamily: "var(--comic-sans)" }}
          >
            {"K&S Hymnal"}
          </legend>
          <div className="w-full flex justify-end items-center gap-2">
            <div className="relative w-full max-w-sm ml-auto my-2">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchParams.get("hymn") ?? ""}
                onChange={(e) => setSearch(e.target.value, "")}
                placeholder="Search by number, title, scripture, words in verses..."
                className="w-full rounded-full bg-transparent pl-12 pr-8 py-3 border-2 border-(--primary) placeholder:text-(--primary) text-lg"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="bg-(--secondary)/40 rounded-full p-2 border-none outline-none">
                <EllipsisVerticalIcon className="text-xl text-(--textHighlight)" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white/50 backdrop-blur-md z-5000 border-none outline-none w-60 p-3">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    className="hover:bg-transparent"
                    onClick={() => setOpenItems(groups.map((g) => g.group))}
                  >
                    <span>Expand All</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-(--primary) my-3" />
                  <DropdownMenuItem
                    variant="destructive"
                    className="hover:bg-transparent"
                    onClick={() => setOpenItems([])}
                  >
                    <span>Collapse All</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
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
                    // animate-ui friendly: subtle motion when toggling
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
                        onOpen={(hymn) => setSearch(hymn.hymn_title, hymn.id)}
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
