const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

//Destructuring
{
  const book = getBook(2);
  const { title, author, genres } = book;
  const [primaryGenre, secondaryGenre] = genres; // Assign [[0], [1]]
}

// Rest/spread
{
  //Rest
  const book = getBook(2);
  const { title, author, genres } = book;
  const [primaryGenre, secondaryGenre, ...otherGenres] = genres; //only works for last element of destructuring
  console.log(otherGenres);

  //Spread
  const newGenres = [...genres, "epic fantasy"]; //equivalent to ruby flatten; can be placed anywhere in parent list
  console.log(newGenres);
  const updatedBook = {
    ...book, //flattens objects as well
    moviePublicationDate: "2001-12-19",
    pages: 1210, //can overwrite properties as well; latest property is final
  };
  console.log(updatedBook);
}

// Template literals
{
  const book = getBook(2);
  const { title, author, genres, pages, publicationDate } = book;
  const summary = `${title} is a book with ${pages} pages written by ${author} and published in ${
    publicationDate.split("-")[0]
  }`;
}

// Ternary Operator
{
  const book = getBook(2);
  const { title, author, genres, pages, publicationDate, hasMovieAdaptation } =
    book;
  const pagesRange = pages > 1000 ? "over a thousand" : "1000 or less";
  console.log(`The book has ${pagesRange} pages.`);
  console.log(
    `The book has ${hasMovieAdaptation ? "" : "not "}been adapted to a movie.`
  );
}

// Arrow functions
{
  const book = getBook(2);
  const { title, author, genres, pages, publicationDate, hasMovieAdaptation } =
    book;
  const getYear = (pubDate) => {
    return pubDate.split("-")[0];
  };
  console.log(
    `${title} was published in the year ${getYear(publicationDate)}.`
  );
}

// Logical Operators + Short-circuiting
{
  const book = getBook(2);
  const { title, author, genres, pages, publicationDate, hasMovieAdaptation } =
    book;
  // Short rundown: the logical operators && and || actually return their operands, NOT a converted T/F
  console.log(true && "Some String");
  console.log(false && "Some String");
  console.log("Some String" || "true"); // note second operand is a string as well
  console.log("" || "Some String"); // no shortcircuit
}

// Optional Chaining
{
  const book = getBook(3); //book 3 does not have librarything reviews
  const {
    title,
    author,
    genres,
    pages,
    publicationDate,
    hasMovieAdaptation,
    reviews,
  } = book;

  const getTotalReviewCount = (b) => {
    const goodReads = b.reviews.goodreads.reviewsCount;
    const librarything = b.reviews.librarything?.reviewsCount ?? 0;
    return goodReads + librarything;
  };
  console.log(getTotalReviewCount(book));
}

// Array.map
{
  const books = getBooks();
  const ids = books.map((book) => {
    return book.id;
  });
  const titles = books.map((book) => {
    return book.title;
  });
  const authors = books.map((book) => {
    return book.author;
  });
  const essentialData = books.map((book) => ({
    title: book.title,
    author: book.author,
  }));
  console.log(ids);
  console.log(titles);
  console.log(authors);
  console.log(essentialData);
}

// Array.filter
{
  const books = getBooks();
  const longBooks = books
    .filter((book) => book.pages > 500)
    .filter((book) => book.hasMovieAdaptation);
  const adventureBooks = books
    .filter((book) => book.genres.includes("adventure"))
    .map((book) => book.title);
  console.log(adventureBooks);
  console.log(longBooks);
}

// Array.reduce
{
  const books = getBooks();
  const totalPages = books.reduce((sum, book) => {
    return sum + book.pages;
  }, 0);
  console.log(totalPages);
}

// Array.sort
{
  const books = getBooks();
  const sortedByPagesAsc = books
    .sort((a, b) => a.pages - b.pages)
    .map((book) => ({
      title: book.title,
      pages: book.pages,
    }));
  const sortedByPagesDesc = books
    .sort((a, b) => b.pages - a.pages)
    .map((book) => ({
      title: book.title,
      pages: book.pages,
    }));
  const sortedByTitleAsc = books
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((book) => ({
      title: book.title,
      pages: book.pages,
    }));
  const sortedByTitleDesc = books
    .sort((a, b) => b.title.localeCompare(a.title))
    .map((book) => ({
      title: book.title,
      pages: book.pages,
    }));
  console.log(sortedByPagesAsc);
  console.log(sortedByPagesDesc);
  console.log(sortedByTitleAsc);
  console.log(sortedByTitleDesc);
}

// Immutability
{
  const newBook = {
    id: 6,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  };

  const booksAfterAdd = [...getBooks(), newBook];
  booksAfterAdd;

  const booksAfterDelete = booksAfterAdd.filter((book) => {
    return book.id !== 6;
  });
  console.log(booksAfterDelete.length);

  const booksAfterUpdate = booksAfterDelete.map((book) => {
    return book.id === 1 ? { ...book, pages: 1 } : book;
  });
  console.log(booksAfterUpdate);
}

// Promises
{
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  console.log("Hello");
}

// Async/Await
const getTodos = async () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

getTodos();
