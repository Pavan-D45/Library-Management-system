import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [borrower, setBorrower] = useState({});

  const loadBooks = async () => {
    const { data } = await api.get("/books");
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    await api.post("/books", { title, author });
    setTitle("");
    setAuthor("");
    loadBooks();
  };

  const borrowBook = async (bookId) => {
    const name = borrower[bookId]?.trim();
    if (!name) return;
    await api.patch(`/books/${bookId}/borrow`, { borrowedBy: name });
    setBorrower((prev) => ({ ...prev, [bookId]: "" }));
    loadBooks();
  };

  const returnBook = async (bookId) => {
    await api.patch(`/books/${bookId}/return`);
    loadBooks();
  };

  const deleteBook = async (bookId) => {
    await api.delete(`/books/${bookId}`);
    loadBooks();
  };

  return (
    <main className="container">
      <h1>Library Management System</h1>

      <form onSubmit={addBook} className="card form">
        <input
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      <section className="card">
        <h2>Books</h2>
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <ul className="list">
            {books.map((book) => (
              <li key={book._id} className="item">
                <div>
                  <strong>{book.title}</strong> by {book.author}
                  <div className="status">
                    {book.isBorrowed
                      ? `Borrowed by ${book.borrowedBy}`
                      : "Available"}
                  </div>
                </div>

                <div className="actions">
                  {!book.isBorrowed ? (
                    <>
                      <input
                        placeholder="Borrower name"
                        value={borrower[book._id] || ""}
                        onChange={(e) =>
                          setBorrower((prev) => ({
                            ...prev,
                            [book._id]: e.target.value,
                          }))
                        }
                      />
                      <button onClick={() => borrowBook(book._id)}>Borrow</button>
                    </>
                  ) : (
                    <button onClick={() => returnBook(book._id)}>Return</button>
                  )}
                  <button className="danger" onClick={() => deleteBook(book._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
