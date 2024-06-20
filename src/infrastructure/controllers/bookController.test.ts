import { Request, Response } from 'express';
import { getBookByCode, getAllBooks } from './bookController';
import { BookService } from '../../application/services/bookService';
import { Book } from '../../domain/entities/book';

describe('bookController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let bookService: Partial<BookService>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    bookService = {
      getBookByCode: jest.fn(),
      getAllBooks: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookByCode', () => {
    it('should return a book if found', async () => {
      const book = { _id: '1', title: 'Book 1', author: 'Author 1', year: 2020 };
      bookService.getBookByCode = jest.fn().mockResolvedValue(book);
      req.params = { code: '1' };

      await getBookByCode(req as Request, res as Response, bookService as BookService);

      expect(bookService.getBookByCode).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(book);
    });

    it('should return 400 if book not found', async () => {
      bookService.getBookByCode = jest.fn().mockResolvedValue(null);
      req.params = { code: '1' };

      await getBookByCode(req as Request, res as Response, bookService as BookService);

      expect(bookService.getBookByCode).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'book not found' });
    });

    it('should return 500 on internal server error', async () => {
      const error = new Error('Internal server error');
      bookService.getBookByCode = jest.fn().mockRejectedValue(error);
      req.params = { code: '1' };

      await getBookByCode(req as Request, res as Response, bookService as BookService);

      expect(bookService.getBookByCode).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const books = [
        { _id: '1', title: 'Book 1', author: 'Author 1', year: 2020 },
        { _id: '2', title: 'Book 2', author: 'Author 2', year: 2021 },
      ];
      bookService.getAllBooks = jest.fn().mockResolvedValue(books);

      await getAllBooks(req as Request, res as Response, bookService as BookService);

      expect(bookService.getAllBooks).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(books);
    });

    it('should return 500 on internal server error', async () => {
      const error = new Error('Internal server error');
      bookService.getAllBooks = jest.fn().mockRejectedValue(error);

      await getAllBooks(req as Request, res as Response, bookService as BookService);

      expect(bookService.getAllBooks).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
