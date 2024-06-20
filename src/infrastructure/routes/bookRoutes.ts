import { Router } from 'express';
import { BookService } from '../../application/services/bookService';
import { getAllBooks, getBookByCode,   } from '../controllers/bookController';

const userRoutes = (bookService: BookService) => {
  const router = Router();

  router.get('/book/:code', (req, res) => getBookByCode(req, res, bookService));
  router.get('/books', (req, res) => getAllBooks(req, res, bookService));

  return router;
};

export default userRoutes;
