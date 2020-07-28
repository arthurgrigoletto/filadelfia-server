import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListBookService {
  constructor(
    @inject('BooksRepository') private booksRepository: IBooksRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Book[]> {
    const cacheKey = `books-list:${user_id}`;

    let books;
    // let books = await this.cacheProvider.recover<Book[]>(cacheKey);

    if (!books) {
      books = await this.booksRepository.find();

      await this.cacheProvider.save(cacheKey, books);
    }

    return books;
  }
}
