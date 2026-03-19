import { useState } from "react";
import {
  Tabs,
  TabsContent,
} from "../../components/shadcn/animate-ui/components/radix/tabs.tsx";
import { Button } from "../../components/shadcn/animate-ui/components/buttons/button.tsx";
import englishBibleData from "@/assets/bibles/english-bible.json";
import englishBibleKJVData from "@/assets/bibles/english-bible-kjv.json";
import { ChevronLeftIcon, ChevronRightIcon, GlobeIcon } from "lucide-react";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/shadcn/animate-ui/components/radix/accordion.tsx";
import { ScrollArea } from "../../components/shadcn/ui/scroll-area.tsx";

const bibleDataSources = {
  english: englishBibleData,
  kjv: englishBibleKJVData,
};

const bibleVersions = [
  { key: "english", label: "English Standard Version (ESV)" },
  { key: "kjv", label: "King James Version (KJV)" },
];

export default function BibleApp() {
  const [bible, setBible] = useState(bibleDataSources.english);
  const [currentBibleIndex, setCurrentBibleIndex] = useState(0);
  const [currentBook, setCurrentBook] = useState(bible[0]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentView, setCurrentView] = useState(
    `${currentBook.name}-chapter-${currentChapterIndex + 1}`,
  );

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
  };

  const handleVersionChange = (versionKey) => {
    const newBibleData = bibleDataSources[versionKey];
    setBible(newBibleData);

    // Try to find the same book in the new version, otherwise default to the first book
    const equivalentBook =
      newBibleData.find((b) => b.name === currentBook.name) || newBibleData[0];

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
                  {currentBook.name}
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
                className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-4 border-none"
              >
                {bibleVersions.map((version, index) => (
                  <DropdownMenuItem
                    key={version.key}
                    onClick={() => {
                      handleVersionChange(version.key);
                      setCurrentBibleIndex(index);
                    }}
                    className="cursor-pointer p-3 flex gap-2 hover:bg-white bg-white rounded-none"
                  >
                    <div className="flex-1">{version.label}</div>
                    {currentBibleIndex === index && (
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

  const handleChapterClick = (bookName, chapterIndex) => {
    onSelectChapter(bookName, chapterIndex);
    setIsOpen(false); // Close the dialog after selection
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* max-h-[80vh] and overflow-y-auto ensure the dialog is scrollable */}
      <DialogContent
        className="max-w-md border-none bg-white rounded-3xl shadow-2xl p-0"
        showCloseButton={false}
      >
        <DialogHeader className="hidden">
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Books
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-[70vh] p-8">
          <Accordion type="single" collapsible className="w-full">
            {currentBible.map((book) => (
              <AccordionItem
                key={book.name}
                value={book.name}
                className="border-b border-b-gray-300"
              >
                <AccordionTrigger className="text-lg transition-colors">
                  {book.name}
                </AccordionTrigger>
                <AccordionContent>
                  {/* Display chapters in a responsive grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 p-1 mt-2">
                    {book.chapters.map((_, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        size="lg"
                        className="w-full h-full aspect-3/2 text-center bg-white border-2 border-white/40 inset-shadow-sm shadow-md"
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
      </DialogContent>
    </Dialog>
  );
}
