# Library Management System (MERN)

A simple **MERN stack** project to manage books in a library.

## Tech Stack

- **MongoDB** + Mongoose
- **Express.js** + Node.js
- **React** (Vite)

## Features

- View all books
- Add a new book
- Borrow a book (set borrower name)
- Return a book
- Delete a book

---

## Project Structure

```
.
├── server
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── server.js
│       ├── config/db.js
│       ├── controllers/bookController.js
│       ├── models/Book.js
│       └── routes/bookRoutes.js
├── client
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       └── api.js
└── .env.example
```

---

## Setup

### 1) Configure environment

Copy and edit environment variables:

```bash
cp .env.example .env
```

Update `MONGO_URI` if needed.

### 2) Run backend

```bash
cd server
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

### 3) Run frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## API Endpoints

- `GET /api/books` - list books
- `POST /api/books` - add book
- `PATCH /api/books/:id/borrow` - borrow book
- `PATCH /api/books/:id/return` - return book
- `DELETE /api/books/:id` - delete book
