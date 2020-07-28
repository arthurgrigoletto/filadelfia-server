import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';
import IAuthorRepository from '../repositories/IAuthorRepository';

interface IRequest {
  book_id: string;
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
    book_id,
    authors_id,
    category,
    description,
    language,
    pages,
    publisher,
    title,
    year,
  }: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(book_id);

    if (!book) {
      throw new AppError('Book not found');
    }

    const authors = await this.authorsRepository.findByIds(authors_id);

    book.authors = authors;
    book.category = category;
    book.description = description;
    book.language = language;
    book.pages = pages;
    book.publisher = publisher;
    book.title = title;
    book.year = year;

    await this.cacheProvider.invalidatePrefix('books-list');

    return this.booksRepository.save(book);
  }
}
