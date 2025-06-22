import express, { Application } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/books/book.route';
import { BorrowRoutes } from './modules/borrow/borrow.route';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', BookRoutes);
app.use('/api/borrow', BorrowRoutes);
app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Library Management API is running!',
    docs: 'See /api/books and /api/borrow'
  });
});


// Error handler
app.use(errorHandler);

export default app;
