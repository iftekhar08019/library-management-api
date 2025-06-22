import { Router } from 'express';
import * as borrowController from './borrow.controller';

export const BorrowRoutes = Router();

BorrowRoutes.post('/', borrowController.borrowBook);
BorrowRoutes.get('/', borrowController.getBorrowSummary);
