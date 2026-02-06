import { Book } from "../models/Book.js";

export const getBooks = async (_req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

export const createBook = async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required." });
  }

  const book = await Book.create({ title, author });
  res.status(201).json(book);
};

export const borrowBook = async (req, res) => {
  const { id } = req.params;
  const { borrowedBy } = req.body;

  if (!borrowedBy) {
    return res.status(400).json({ message: "Borrower name is required." });
  }

  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  if (book.isBorrowed) {
    return res.status(400).json({ message: "Book is already borrowed." });
  }

  book.isBorrowed = true;
  book.borrowedBy = borrowedBy;
  await book.save();

  res.json(book);
};

export const returnBook = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  if (!book.isBorrowed) {
    return res.status(400).json({ message: "Book is not borrowed." });
  }

  book.isBorrowed = false;
  book.borrowedBy = "";
  await book.save();

  res.json(book);
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  await book.deleteOne();
  res.status(204).send();
};
