import { Book } from '../../domain/entities/book';
import { BookRepository } from '../../domain/repositories/bookRepository';
import mongoose, { Schema, Document, Model, ClientSession } from 'mongoose';

interface BookDocument extends Document {
  title: string;
  author: string;
  year: number;
}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

export const BookMongooseModel: Model<BookDocument> = mongoose.model<BookDocument>('Book', bookSchema);

export class MongooseBookRepository implements BookRepository {

  async getBookByCode(id: string): Promise<Book | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const book = await BookMongooseModel.findById(id).lean();
    if (!book) {
      return null;
    }
    return {
      id: book!._id.toString(),
      title: book!.title,
      author: book!.author,
      year: book!.year,
    };
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await BookMongooseModel.find().lean();
    const savedBooks: Book[] = books.map(doc => ({
      id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      year: doc.year,
    }));
    return savedBooks;
  }
}

