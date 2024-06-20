import { Book } from "../../domain/entities/book";
import { BookRepository } from "../../domain/repositories/bookRepository";
import { BookService } from "./bookService";

describe('BookService', () => {
  let bookRepository: jest.Mocked<BookRepository>;
  let bookService: BookService;

  beforeEach(() => {
    bookRepository = {
      getBookByCode: jest.fn(),
      getAllBooks: jest.fn(),
    } as jest.Mocked<BookRepository>;
    bookService = new BookService(bookRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a book when getBookByCode is called with a valid id', async () => {
    const book: Book = { id: '1', title: 'Book 1', author: 'Author 1', year: 2020 };
    bookRepository.getBookByCode.mockResolvedValue(book);

    const result = await bookService.getBookByCode('1');
    expect(result).toEqual(book);
    expect(bookRepository.getBookByCode).toHaveBeenCalledWith('1');
  });

  it('should return null when getBookByCode is called with an invalid id', async () => {
    bookRepository.getBookByCode.mockResolvedValue(null);

    const result = await bookService.getBookByCode('invalid-id');
    expect(result).toBeNull();
    expect(bookRepository.getBookByCode).toHaveBeenCalledWith('invalid-id');
  });

  it('should return all books when getAllBooks is called', async () => {
    const books: Book[] = [
      { id: '1', title: 'Book 1', author: 'Author 1', year: 2020 },
      { id: '2', title: 'Book 2', author: 'Author 2', year: 2021 },
    ];
    bookRepository.getAllBooks.mockResolvedValue(books);

    const result = await bookService.getAllBooks();
    expect(result).toEqual(books);
    expect(bookRepository.getAllBooks).toHaveBeenCalled();
  });

  it('should return an empty array when getAllBooks is called and there are no books', async () => {
    bookRepository.getAllBooks.mockResolvedValue([]);

    const result = await bookService.getAllBooks();
    expect(result).toEqual([]);
    expect(bookRepository.getAllBooks).toHaveBeenCalled();
  });
});
