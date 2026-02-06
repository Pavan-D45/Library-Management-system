import { Router } from "express";
import {
  getBooks,
  createBook,
  borrowBook,
  returnBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = Router();

router.get("/", getBooks);
router.post("/", createBook);
router.patch("/:id/borrow", borrowBook);
router.patch("/:id/return", returnBook);
router.delete("/:id", deleteBook);

export default router;
