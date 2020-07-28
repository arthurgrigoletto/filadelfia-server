import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import StatusCodes from '@shared/errors/StatusCodes';
import IBooksRepository from '../repositories/IBooksRepository';

interface IRequest {
  book_id: string;
}

@injectable()
export default class ListBookService {
  constructor(
    @inject('BooksRepository') private booksRepository: IBooksRepository,
  ) {}

  public async execute({ book_id }: IRequest): Promise<void> {
    const book = await this.booksRepository.findById(book_id);

    if (!book) {
      throw new AppError('Book not found', StatusCodes.BAD_REQUEST);
    }

    await this.booksRepository.delete(book.id);
  }
}
