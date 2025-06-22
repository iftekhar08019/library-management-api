"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("../books/book.model"));
const borrow_model_1 = __importDefault(require("./borrow.model"));
const apiResponse_1 = require("../../utils/apiResponse");
const borrowBook = async (req, res, next) => {
    const { book: bookId, quantity, dueDate } = req.body;
    try {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        const book = await book_model_1.default.findById(bookId).session(session);
        if (!book)
            throw new Error('Book not found');
        if (book.copies < quantity)
            return res.status(400).json((0, apiResponse_1.apiResponse)(false, 'Not enough copies available', null));
        book.copies -= quantity;
        await book.save({ session });
        await book_model_1.default.updateAvailability(book._id.toString());
        const borrow = await borrow_model_1.default.create([{ book: bookId, quantity, dueDate }], { session });
        await session.commitTransaction();
        session.endSession();
        return res.status(201).json((0, apiResponse_1.apiResponse)(true, 'Book borrowed successfully', borrow[0]));
    }
    catch (err) {
        next(err);
    }
};
exports.borrowBook = borrowBook;
const getBorrowSummary = async (req, res, next) => {
    try {
        const summary = await borrow_model_1.default.aggregate([
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
        res.json((0, apiResponse_1.apiResponse)(true, 'Borrowed books summary retrieved successfully', summary));
    }
    catch (err) {
        next(err);
    }
};
exports.getBorrowSummary = getBorrowSummary;
