import { useEffect, useMemo, useState } from "react";
import {
  Tabs,
  TabsContent,
} from "../../components/shadcn/animate-ui/components/radix/tabs.tsx";
import { Button } from "../../components/shadcn/animate-ui/components/buttons/button.tsx";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeIcon,
  SearchIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/shadcn/animate-ui/components/radix/dropdown-menu.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/shadcn/ui/dialog.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/shadcn/animate-ui/components/radix/accordion.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/shadcn/ui/input-group.tsx";
import { ScrollArea } from "../../components/shadcn/ui/scroll-area.tsx";
import { bibleService } from "./services/bible-services.js";

export default function BibleApp() {
  const [bible, setBible] = useState(undefined);
  const [currentBibleKey, setCurrentBibleKey] = useState("eng_pev");
  const [currentBook, setCurrentBook] = useState(undefined);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentView, setCurrentView] = useState(undefined);

  useEffect(() => {
    async function loadContent() {
      const bible = await bibleService.loadBible(currentBibleKey);
      setBible(bible);
      setCurrentBook(bible[0]);
    }

    loadContent();
  }, [currentBibleKey]);

  useEffect(() => {
    if (currentBook && currentBook.name) {
      setCurrentView(`${currentBook.name}-chapter-${currentChapterIndex + 1}`);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentBook, currentChapterIndex]);

  const handleChapterChange = (step) => {
    // Find where we are in the overall bible array
    const currentBookIndex = bible.findIndex(
      (b) => b.name === currentBook.name,
    );

    if (step === 1) {
      // Moving Forward (Next Chapter)
      if (currentChapterIndex < currentBook.chapters.length - 1) {
        // We are not at the end of the current book, just go to the next chapter
        const newChapterIndex = currentChapterIndex + 1;
        setCurrentChapterIndex(newChapterIndex);
        setCurrentView(`${currentBook.name}-chapter-${newChapterIndex + 1}`);
      } else if (currentBookIndex < bible.length - 1) {
        // We are at the end of the current book, move to the first chapter of the next book
        const nextBook = bible[currentBookIndex + 1];
        setCurrentBook(nextBook);
        setCurrentChapterIndex(0); // Start at chapter 1 (index 0)
        setCurrentView(`${nextBook.name}-chapter-1`);
      }
      // If we are on the last chapter of the last book, it falls through and does nothing.
    } else if (step === -1) {
      // Moving Backward (Previous Chapter)
      if (currentChapterIndex > 0) {
        // We are not at the beginning of the current book, just go back one chapter
        const newChapterIndex = currentChapterIndex - 1;
        setCurrentChapterIndex(newChapterIndex);
        setCurrentView(`${currentBook.name}-chapter-${newChapterIndex + 1}`);
      } else if (currentBookIndex > 0) {
        // We are at chapter 1, move to the last chapter of the previous book
        const prevBook = bible[currentBookIndex - 1];
        const lastChapterIndex = prevBook.chapters.length - 1; // Get the index of the final chapter

        setCurrentBook(prevBook);
        setCurrentChapterIndex(lastChapterIndex);
        setCurrentView(`${prevBook.name}-chapter-${lastChapterIndex + 1}`);
      }
      // If we are on the first chapter of the first book, it falls through and does nothing.
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleVersionChange = async (versionKey) => {
    const newBibleData = await bibleService.loadBible(versionKey);
    setBible(newBibleData);

    // Try to find the same book in the new version, otherwise default to the first book
    const equivalentBook =
      newBibleData.find((b) => b.abbrev === currentBook.abbrev) ||
      newBibleData[0];

    // Ensure the chapter index exists in the new book, otherwise fallback to chapter 1
    const safeChapterIndex =
      currentChapterIndex < equivalentBook.chapters.length
        ? currentChapterIndex
        : 0;

    setCurrentBook(equivalentBook);
    setCurrentChapterIndex(safeChapterIndex);
    setCurrentView(`${equivalentBook.name}-chapter-${safeChapterIndex + 1}`);
  };

  const handleSelectChapterFromIndex = (bookName, chapterIndex) => {
    const selectedBook = bible.find((b) => b.name === bookName);
    if (selectedBook) {
      setCurrentBook(selectedBook);
      setCurrentChapterIndex(chapterIndex);
      setCurrentView(`${selectedBook.name}-chapter-${chapterIndex + 1}`);
    }
  };

  if (!bible) {
    return (
      <div className="w-full py-12">
        <span className="text-center">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-[40vh] pt-24 pb-8 bg-linear-90 from-beta to-(--textHighlight) flex items-end justify-center text-wrap relative">
        <div className="w-full max-w-4xl p-12 max-md:px-6 text-center">
          {/* Book Selector Header */}
          <BibleIndexDialog
            currentBible={bible}
            onSelectChapter={handleSelectChapterFromIndex}
          >
            <span className="text-xl md:text-2xl text-white/80 text-center cursor-pointer hover:text-white transition-colors">
              {currentBook.name}
            </span>
          </BibleIndexDialog>

          <legend className="text-5xl md:text-6xl text-white font-bold mt-2">
            Chapter {currentChapterIndex + 1}
          </legend>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full md:w-5/6 lg:w-4/6 mx-auto px-4 py-10 md:py-18 flex justify-center whitespace-pre-wrap text-wrap relative">
        <Tabs
          value={currentView}
          onValueChange={(val) => {
            setCurrentView(val);
            // Sync the chapter index state when the tab changes
            const chapterNum = parseInt(val.split("-chapter-")[1], 10);
            setCurrentChapterIndex(chapterNum - 1);
          }}
          className="w-full flex flex-col items-center"
        >
          {/* Verses Content Mapping */}
          {currentBook.chapters.map((chapter, index) => {
            return (
              <TabsContent
                key={index}
                value={`${currentBook.name}-chapter-${index + 1}`}
                className="w-full text-left space-y-4 outline-none p-2"
              >
                <p className="text-xl md:text-3xl lg:text-2xl">
                  {chapter.map((verse, verseIndex) => (
                    <span
                      key={verseIndex}
                      className="leading-relaxed text-black"
                    >
                      <sup className="text-sm text-gray-500 font-semibold mr-2 select-none">
                        {" "}
                        {verseIndex + 1}
                      </sup>
                      {verse}
                    </span>
                  ))}
                </p>
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="w-full bg-alpha fixed bottom-0 left-0 right-0">
          <div className="w-full relative  flex justify-center py-4 px-4 gap-4">
            {/* NAVIGATION */}
            <div className="w-full max-w-sm bg-gray-100 rounded-full flex gap-2 p-2 shadow-xl">
              <Button
                variant={"secondary"}
                size={"icon-lg"}
                className="rounded-full bg-transparent hover:bg-transparent"
                onClick={() => handleChapterChange(-1)}
              >
                <ChevronLeftIcon className="size-5 md:size-6" />
              </Button>
              <BibleIndexDialog
                currentBible={bible}
                onSelectChapter={handleSelectChapterFromIndex}
              >
                <Button
                  variant={"secondary"}
                  size={"lg"}
                  className="flex-1 rounded-full bg-transparent hover:bg-transparent text-[17px] md:text-lg"
                >
                  {currentBook.name} {currentChapterIndex + 1}
                </Button>
              </BibleIndexDialog>
              <Button
                variant={"secondary"}
                size={"icon-lg"}
                className="rounded-full bg-transparent hover:bg-transparent"
                onClick={() => handleChapterChange(1)}
              >
                <ChevronRightIcon className="size-5 md:size-6" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"default"}
                  size={"icon-lg"}
                  className="rounded-full bg-gray-100 hover:bg-gray-200 w-14 h-14 shadow-xl text-black"
                >
                  <GlobeIcon className="size-5 md:size-6" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-full max-w-sm min-w-3xs bg-white rounded-2xl shadow-2xl p-4 border-none"
              >
                {bibleService.versions.map((version) => (
                  <DropdownMenuItem
                    key={version.key}
                    onClick={() => {
                      handleVersionChange(version.key);
                      setCurrentBibleKey(version.key);
                    }}
                    className="cursor-pointer p-3 flex gap-2 hover:bg-white bg-white rounded-none"
                  >
                    <div className="flex-1">{version.label}</div>
                    {currentBibleKey === version.key && (
                      <span className="text-green-500 font-bold">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}

function BibleIndexDialog({ currentBible, children, onSelectChapter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleChapterClick = (bookName, chapterIndex) => {
    onSelectChapter(bookName, chapterIndex);
    setIsOpen(false); // Close the dialog after selection
  };

  const filteredBooks = useMemo(() => {
    return currentBible.filter((c) =>
      c.name.toLowerCase().includes(searchVal.toLowerCase()),
    );
  }, [searchVal, currentBible]);

  useEffect(() => {
    if (!isOpen) {
      setSearchVal("");
    }
  }, [isOpen]);

  return (
    <Drawer direction={"left"} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-w-md! w-full! border-none bg-white shadow-2xl p-0 z-9999">
        <ScrollArea className="w-full h-screen">
          <div className="h-4"></div>
          <DrawerHeader className="w-full sticky top-0 z-10 bg-white">
            <InputGroup className="rounded-full border border-slate-300 bg-slate-100 shadow-none h-11 px-1 gap-2 outline-0 ring-0!">
              <InputGroupAddon>
                <SearchIcon className="size-4 text-gray-600" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Find books..."
                onChange={(e) => setSearchVal(e.target.value)}
              />
            </InputGroup>
          </DrawerHeader>
          <Accordion type="single" collapsible className="w-full">
            {filteredBooks.map((book) => (
              <AccordionItem
                key={book.name}
                value={book.name}
                className="border-b border-b-gray-300"
              >
                <AccordionTrigger
                  showArrow={false}
                  className="text-[1.075rem] transition-colors py-5 px-6"
                >
                  {book.name}
                </AccordionTrigger>
                <AccordionContent>
                  {/* Display chapters in a responsive grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 p-1 px-2.5 mt-2">
                    {book.chapters.map((_, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        size="lg"
                        className="w-full h-full aspect-3/2 text-center bg-gray-100 border-4 border-white/70 inset-shadow-sm shadow-md"
                        onClick={() => handleChapterClick(book.name, index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
