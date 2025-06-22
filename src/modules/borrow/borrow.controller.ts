import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '../books/book.model';
import Borrow from './borrow.model';
import { apiResponse } from '../../utils/apiResponse';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  const { book: bookId, quantity, dueDate } = req.body;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const book = await Book.findById(bookId).session(session);

    if (!book) throw new Error('Book not found');
    if (book.copies < quantity)
      return res.status(400).json(apiResponse(false, 'Not enough copies available', null));

    book.copies -= quantity;
    await book.save({ session });

    await Book.updateAvailability((book._id as mongoose.Types.ObjectId).toString());

    const borrow = await Borrow.create([{ book: bookId, quantity, dueDate }], { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(apiResponse(true, 'Book borrowed successfully', borrow[0]));
  } catch (err) {
    next(err);
  }
};

export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          book: { title: '$bookDetails.title', isbn: '$bookDetails.isbn' },
          totalQuantity: 1,
        },
      },
    ]);
    res.json(apiResponse(true, 'Borrowed books summary retrieved successfully', summary));
  } catch (err) {
    next(err);
  }
};
