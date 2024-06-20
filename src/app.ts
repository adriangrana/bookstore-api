import express from 'express';
import { connectDB } from './infrastructure/database/mongoose';
import { BookService } from './application/services/bookService';
import { MongooseBookRepository } from './infrastructure/database/mongooseBookRepository';
import bookRoutes from './infrastructure/routes/bookRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './infrastructure/config/swaggerConfig';

const app = express();

app.use(express.json());

// Connect to mongo database
connectDB();

// Configure dependency injection
const bookRepository = new MongooseBookRepository();
const bookService = new BookService(bookRepository);

// book routes
app.use('/v1', bookRoutes(bookService));

// Swagger configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
