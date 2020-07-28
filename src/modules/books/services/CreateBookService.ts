import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';
import IAuthorRepository from '../repositories/IAuthorRepository';

interface IRequest {
  title: string;
  description: string;
  authors_id: string[];
  category: string;
  publisher: string;
  year: number;
  pages: number;
  language: string;
}

@injectable()
export default class CreateBookService {
  constructor(
    @inject('BooksRepository') private booksRepository: IBooksRepository,

    @inject('AuthorRepository') private authorsRepository: IAuthorRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    authors_id,
    category,
    description,
    language,
    pages,
    publisher,
    title,
    year,
  }: IRequest): Promise<Book> {
    const checkBookExists = await this.booksRepository.findByTitle(title);

    if (checkBookExists) {
      throw new AppError('Title already used to another book');
    }

    const authors = await this.authorsRepository.findByIds(authors_id);

    const book = await this.booksRepository.create({
      authors,
      category,
      description,
      language,
      pages,
      publisher,
      title,
      year,
    });

    await this.cacheProvider.invalidatePrefix('books-list');

    return book;
  }
}
