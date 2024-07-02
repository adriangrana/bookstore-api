import request from 'supertest';
import app from './app';
import { Request, Response, NextFunction } from 'express';

// Mock the necessary modules
jest.mock('./infrastructure/database/mongoose', () => ({ connectDB: jest.fn() }));
jest.mock('./application/services/bookService');
jest.mock('./infrastructure/database/mongooseBookRepository');
jest.mock('./infrastructure/routes/bookRoutes', () => jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()));
jest.mock('swagger-ui-express', () => ({
  serve: jest.fn((req, res, next) => next()),
  setup: jest.fn(() => (req: Request, res: Response) => res.send('Swagger UI')),
}));
jest.mock('./infrastructure/config/swaggerConfig', () => ({}));


describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });



  it('should serve Swagger UI at /api-docs', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.text).toBe('Swagger UI');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });
});
