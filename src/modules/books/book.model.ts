import { Schema, model, Document, Model } from 'mongoose';

export type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

interface BookModel extends Model<IBook> {
  updateAvailability(bookId: string): Promise<void>;
}

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: [0, 'Copies must be a positive number'] },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Static method for business logic
bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

// Mongoose middleware for availability
bookSchema.pre('save', function (next) {
  if (this.copies === 0) this.available = false;
  else if (this.copies > 0) this.available = true;
  next();
});

const Book = model<IBook, BookModel>('Book', bookSchema);
export default Book;
