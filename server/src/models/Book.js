import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isBorrowed: {
      type: Boolean,
      default: false,
    },
    borrowedBy: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
