import { Book } from '../entities/book';

export interface BookRepository {
  getBookByCode(id: string): Promise<Book | null>;
  getAllBooks(): Promise<Book[]>;
}
