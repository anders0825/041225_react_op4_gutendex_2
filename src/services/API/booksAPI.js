/* JS
booksAPI.js
*/

class BooksAPI {
  constructor() {
    this.baseURL = "https://gutendex.com";
  }

  formatBook(book) {
    const formatAuthors = (authors) => {};

    const languageNames = {
      en: "English",
      fr: "French",
      es: "Spanish",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      zh: "Chinese",
      ar: "Arabic",
      nl: "Dutch",
      sv: "Swedish",
      no: "Norwegian",
      fi: "Finnish",
      da: "Danish",
      pl: "Polish",
      cs: "Czech",
      hu: "Hungarian",
      tr: "Turkish",
      ko: "Korean",
      el: "Greek",
      he: "Hebrew",
      id: "Indonesian",
      vi: "Vietnamese",
      th: "Thai",
      hi: "Hindi",
      bn: "Bengali",
      ur: "Urdu",
      fa: "Persian",
      ro: "Romanian",
      sk: "Slovak",
      sl: "Slovenian",
      et: "Estonian",
      lv: "Latvian",
      lt: "Lithuanian",
      sr: "Serbian",
      hr: "Croatian",
      bg: "Bulgarian",
      mk: "Macedonian",
      ms: "Malay",
      sw: "Swahili",
    };
    const languageCodes = book.languages || [];
    const languages = languageCodes.map((code) => languageNames[code] || code);

    const rawCategories = Array.isArray(book.bookshelves)
      ? book.bookshelves
      : [];

    const categories = rawCategories
      .map((c) => c.replace(/^Category:\s*/i, "").trim())
      .filter(Boolean)
      .filter(
        (c) =>
          !c.toLowerCase().includes("best books") &&
          !c.toLowerCase().includes("banned books") &&
          !c.toLowerCase().includes("harvard classics") &&
          !c.toLowerCase().includes("movie books")
      );

    const toHttps = (url) => {
      return url.replace(/^http:\/\//i, "https://");
    };

    return {
      id: book.id,
      title: book.title,
      author:
        book.authors
          ?.map((a) => {
            if (!a.name) return "";

            const parts = a.name.split(",").map((s) => s.trim());

            if (parts.length === 2) {
              const [last, first] = parts;
              return `${first} ${last}`;
            }

            // Fallback
            return a.name;
          })
          .filter(Boolean)
          .join(", ") || "Unknown",
      categories: [...new Set(categories)],
      languages,
      coverImage: toHttps(book.formats?.["image/jpeg"]) || null,
      digitalLink: toHttps(book.formats?.["text/html"]) || null,
      downloadCount: book.download_count,
    };
  }

  async fetchBooksBySearch(query) {
    const response = await fetch(
      `${this.baseURL}/books?search=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      books: data.results.map((book) => this.formatBook(book)),
      nextUrl: data.next,
    };
  }

  async fetchBooksByTopic(topic) {
    const response = await fetch(`${this.baseURL}/books?topic=${topic}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      books: data.results.map((book) => this.formatBook(book)),
      nextUrl: data.next,
    };
  }

  async fetchBookById(id) {
    const response = await fetch(`${this.baseURL}/books/${id}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const book = await response.json();
    return this.formatBook(book);
  }

  async fetchNextPage(nextUrl) {
    if (!nextUrl) return null;

    const response = await fetch(nextUrl);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      books: data.results.map((book) => this.formatBook(book)),
      nextUrl: data.next,
    };
  }
}

export default new BooksAPI();
