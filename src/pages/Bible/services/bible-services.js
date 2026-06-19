import { TbNumber1Small } from "react-icons/tb";
import webBible from "../../../assets/bibles/eng_web.json";
import kjaBible from "../../../assets/bibles/eng_kja.json";
import yorBible from "../../../assets/bibles/yor_bib.json";
import iboBible from "../../../assets/bibles/ibo_bib.json";
import hauBible from "../../../assets/bibles/hau_ulb.json";

// const fetchData = async (url) => {
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error(res.statusText);
//     }

//     return await res.json();
//   } catch {
//     throw new Error("Something went wrong!!");
//   }
// };

const bibleService = {
  versions: [
    {
      key: "yor_bib",
      label: "Yoruba Bible",
    },
    {
      key: "ibo_bib",
      label: "Igbo Bible",
    },
    {
      key: "hau_ulb",
      label: "Hausa NT",
    },
    {
      key: "ENGWEBP",
      label: "English (WEB)",
    },
    {
      key: "eng_kja",
      label: "English (KJVA)",
    },
  ],

  loadBible: async (translationKey) => {
    // try {
    //   let books = JSON.parse(localStorage.getItem("bible_books"));

    //   if (!books) {
    //     const data = await fetchData(
    //       `https://bible.helloao.org/api/${translationKey}/books.json`,
    //     );

    //     books = data.books;
    //     localStorage.setItem("bible_books", JSON.stringify(books));
    //   }

    //   return books;
    // } catch (error) {
    //   throw new Error(error.message);
    // }
    let bible = null;
    switch (translationKey) {
      case "yor_bib":
        bible = yorBible;
        break;
      case "ibo_bib":
        bible = iboBible;
        break;
      case "hau_ulb":
        bible = hauBible;
        break;
      case "eng_kja":
        bible = kjaBible;
        break;
      default:
        bible = webBible;
        break;
    }

    return bible.books.map((book) => ({
      abbrev: book.id,
      name: book.name,
      chapters: book.chapters.map((chapter) =>
        chapter.chapter.content
          .filter((verse) => verse.type === "verse")
          .map((verse) => {
            return verse.content
              .map((part) => {
                if (typeof part === "string") {
                  return part;
                }
                if (part.text) {
                  return part.text;
                }
                return "";
              })
              .join(" ");
          }),
      ),
    }));
  },
};

export { bibleService };
