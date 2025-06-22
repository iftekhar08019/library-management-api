"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const apiResponse_1 = require("../../utils/apiResponse");
const createBook = async (req, res, next) => {
    try {
        const book = await book_model_1.default.create(req.body);
        return res.status(201).json((0, apiResponse_1.apiResponse)(true, 'Book created successfully', book));
    }
    catch (err) {
        next(err);
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res, next) => {
    try {
        let { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const find = {};
        if (filter)
            find.genre = filter;
        const books = await book_model_1.default.find(find)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        return res.json((0, apiResponse_1.apiResponse)(true, 'Books retrieved successfully', books));
    }
    catch (err) {
        next(err);
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res, next) => {
    try {
        const book = await book_model_1.default.findById(req.params.bookId);
        if (!book)
            return res.status(404).json((0, apiResponse_1.apiResponse)(false, 'Book not found', null));
        return res.json((0, apiResponse_1.apiResponse)(true, 'Book retrieved successfully', book));
    }
    catch (err) {
        next(err);
    }
};
exports.getBookById = getBookById;
const updateBook = async (req, res, next) => {
    try {
        const book = await book_model_1.default.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!book)
            return res.status(404).json((0, apiResponse_1.apiResponse)(false, 'Book not found', null));
        return res.json((0, apiResponse_1.apiResponse)(true, 'Book updated successfully', book));
    }
    catch (err) {
        next(err);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res, next) => {
    try {
        const book = await book_model_1.default.findByIdAndDelete(req.params.bookId);
        if (!book)
            return res.status(404).json((0, apiResponse_1.apiResponse)(false, 'Book not found', null));
        return res.json((0, apiResponse_1.apiResponse)(true, 'Book deleted successfully', null));
    }
    catch (err) {
        next(err);
    }
};
exports.deleteBook = deleteBook;
