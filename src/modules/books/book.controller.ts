import { Request, Response, NextFunction } from 'express';
import Book from './book.model';
import { apiResponse } from '../../utils/apiResponse';

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(apiResponse(true, 'Book created successfully', book));
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query as any;
    const find: any = {};
    if (filter) find.genre = filter;

    const books = await Book.find(find)
      .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));
    return res.json(apiResponse(true, 'Books retrieved successfully', books));
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json(apiResponse(false, 'Book not found', null));
    return res.json(apiResponse(true, 'Book retrieved successfully', book));
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json(apiResponse(false, 'Book not found', null));
    return res.json(apiResponse(true, 'Book updated successfully', book));
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json(apiResponse(false, 'Book not found', null));
    return res.json(apiResponse(true, 'Book deleted successfully', null));
  } catch (err) {
    next(err);
  }
};
