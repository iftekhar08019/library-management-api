import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: err,
    });
  }
  if (err.message === 'Book not found') {
    return res.status(404).json({
      message: 'Book not found',
      success: false,
      error: err,
    });
  }
  res.status(500).json({
    message: 'Internal Server Error',
    success: false,
    error: err,
  });
};
