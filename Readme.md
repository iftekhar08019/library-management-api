# 📚 Library Management API  
*Assignment 3 – Level 2 Web Dev*

A RESTful API for managing books and borrows in a library, built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Features

- **Book CRUD** (Create, Read, Update, Delete)
- **Borrow Book** with stock/availability control
- **Borrow Summary** (aggregation pipeline)
- **Validation & Error Handling** (returns required error structure)
- **Filtering, Sorting, Pagination** for listing books
- **Mongoose Middleware** (pre/post), **Instance Method**
- **Strict API endpoint and response format compliance**

---

## 🏗️ Technologies Used

- [Express](https://expressjs.com/) (v4)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://nodemon.io/) (for development)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)

---

## 🛠️ Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/Apollo-Level2-Web-Dev/B5A3.git
cd B5A3
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Configure Environment**

Create a `.env` file in the root directory and set:

```env
MONGO_URI=mongodb://localhost:27017/library
PORT=5000
```

### 4. **Build and Run (For TypeScript development)**

```bash
# Build TypeScript
tsc

# Run the server (change port if needed)
npm run dev
```

---

## 🧑‍💻 API Documentation

---

### 📘 Book Endpoints

#### 1. Create Book

**Endpoint:**
```
POST /api/books
```

**Request Body:**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

**Response:**
Success and error responses strictly follow assignment format.

---

#### 2. Get All Books

**Endpoint:**
```
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

**Query Params:**
- `filter` – genre (FICTION, NON_FICTION, etc.)
- `sortBy` – (default: createdAt)
- `sort` – `asc` or `desc` (default: desc)
- `limit` – number (default: 10)

**Response:**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "title": "...",
      "author": "...",
      "isbn": "...",
      ...
    }
  ]
}
```

---

#### 3. Get Book By ID

**Endpoint:**
```
GET /api/books/:bookId
```

**Response:**
Book details or error structure.

---

#### 4. Update Book

**Endpoint:**
```
PUT /api/books/:bookId
```

**Request Body:**
```json
{ "copies": 50 }
```

**Response:**
Updated book or error structure.

---

#### 5. Delete Book

**Endpoint:**
```
DELETE /api/books/:bookId
```

**Response:**
Success confirmation.

---

### 📗 Borrow Endpoints

#### 6. Borrow Book

**Endpoint:**
```
POST /api/borrow
```

**Request Body:**
```json
{
  "book": "<bookId>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Business Logic:**
- Checks for enough available copies
- Deducts stock, updates availability (via instance method & pre-save middleware)
- Returns borrow record

---

#### 7. Borrowed Books Summary

**Endpoint:**
```
GET /api/borrow
```

**Response:**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "...",
        "isbn": "..."
      },
      "totalQuantity": 5
    }
  ]
}
```

---

### 🛡️ Error Responses

All errors conform to this structure:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    /* error object */
  }
}
```

---

## 📂 Project Structure

```txt
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── middlewares/
├── package.json
├── tsconfig.json
├── .env
```

---

## ✨ Bonus

- **Code Quality:** Clean, modular, and well-commented code.
- **Error Handling:** Handles validation and 404 errors per spec.
- **Documentation:** This README and in-code comments.
- **Aggregation:** Uses MongoDB aggregation for borrow summary.

---

## 📹 Demo Links

- **Video Demo:** [Video Explanation Link Here](#)
- **Live Demo:** [Live Deployment Link Here](#)
