"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = require("./modules/books/book.route");
const borrow_route_1 = require("./modules/borrow/borrow.route");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/books', book_route_1.BookRoutes);
app.use('/api/borrow', borrow_route_1.BorrowRoutes);
app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'Library Management API is running!',
        docs: 'See /api/books and /api/borrow'
    });
});
// Error handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
