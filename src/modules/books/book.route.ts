import { Router } from 'express';
import * as bookController from './book.controller';

export const BookRoutes = Router();

BookRoutes.post('/', bookController.createBook);
BookRoutes.get('/', bookController.getAllBooks);
BookRoutes.get('/:bookId', bookController.getBookById);
BookRoutes.put('/:bookId', bookController.updateBook);
BookRoutes.delete('/:bookId', bookController.deleteBook);
