"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
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
exports.errorHandler = errorHandler;
