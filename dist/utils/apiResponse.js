"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = (success, message, data = null) => ({
    success,
    message,
    data,
});
exports.apiResponse = apiResponse;
