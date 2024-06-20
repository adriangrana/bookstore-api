import { Request, Response } from 'express';
import { BookService } from '../../application/services/bookService';

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /book/{code}:
 *   get:
 *     summary: Get a book by Code
 *     tags: [books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: book ID
 *     responses:
 *       200:
 *         description: book found
 *       400:
 *         description: book not found
 *       500:
 *         description: Internal server error
 */
export const getBookByCode = async (req: Request, res: Response, bookService: BookService) => {
  try {
    const book = await bookService.getBookByCode(req.params.code as string);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(400).json({ message: 'book not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [books]
 *     responses:
 *       200:
 *         description: List of books
 *       500:
 *         description: Internal server error
 */
export const getAllBooks = async (req: Request, res: Response, bookService: BookService) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
