import mongoose from 'mongoose';
import { BookMongooseModel, MongooseBookRepository } from './mongooseBookRepository';
import { Book } from '../../domain/entities/book';

describe('MongooseBookRepository', () => {
  let mongooseBookRepository: MongooseBookRepository;
  let findByIdMock: jest.Mock;
  let findMock: jest.Mock;

  const books = [
    { _id: '1', title: 'Book 1', author: 'Author 1', year: 2020 },
    { _id: '2', title: 'Book 2', author: 'Author 2', year: 2021 },
  ];

  beforeEach(() => {
    mongooseBookRepository = new MongooseBookRepository();
    findByIdMock = jest.fn().mockReturnValue({
      lean: jest.fn()
    });
    findMock = jest.fn().mockReturnValue({
      lean: jest.fn()
    });
    jest.spyOn(BookMongooseModel, 'findById').mockImplementation(findByIdMock);
    jest.spyOn(BookMongooseModel, 'find').mockImplementation(findMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should return a book when getBookByCode is called with a valid id', async () => {
    const valiExistingId = new mongoose.Types.ObjectId().toString();
    const book = { _id: valiExistingId, title: 'Book 1', author: 'Author 1', year: 2020 };
    findByIdMock.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValueOnce(book)
    });

    const result = await mongooseBookRepository.getBookByCode(valiExistingId);

    expect(findByIdMock).toHaveBeenCalledWith(valiExistingId)
    expect(result?.author).toEqual(book.author);
    expect(result?.title).toEqual(book.title);
    expect(result?.year).toEqual(book.year);
  });

  it('should return null when getBookByCode is called with an invalid id', async () => {
    const invalidId = 'invalid-id';
    const result = await mongooseBookRepository.getBookByCode(invalidId);

    expect(findByIdMock).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should return null when getBookByCode is called with a valid but non-existing id', async () => {
    const validNonExistingId = new mongoose.Types.ObjectId().toString();
    findByIdMock.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValueOnce(null)
    });

    const result = await mongooseBookRepository.getBookByCode(validNonExistingId);

    expect(findByIdMock).toHaveBeenCalledWith(validNonExistingId);
    expect(result).toBeNull();
  });

  it('should return all books when getAllBooks is called', async () => {
    findMock.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValueOnce(books)
    });

    const result = await mongooseBookRepository.getAllBooks();

    expect(findMock).toHaveBeenCalled();
    expect(result[0].author).toEqual(books[0].author);
    expect(result[0].title).toEqual(books[0].title);
    expect(result[0].year).toEqual(books[0].year);
  });

  it('should return an empty array when getAllBooks is called and there are no books', async () => {
    findMock.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValueOnce([])
    });

    const result = await mongooseBookRepository.getAllBooks();

    expect(findMock).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
