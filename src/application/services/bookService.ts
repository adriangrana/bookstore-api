import { Book } from '../../domain/entities/book';
import { BookRepository } from '../../domain/repositories/bookRepository';

export class BookService {
  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  async getBookByCode(id: string): Promise<Book | null> {
    return await this.bookRepository.getBookByCode(id);
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.getAllBooks();
  }
}
