import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAuthorRepository from '@modules/authors/repositories/IAuthorRepository';
import IPublisherRepository from '@modules/publishers/repositories/IPublisherRepository';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';

interface IRequest {
  book_id: string;
  title: string;
  description: string;
  author_ids: string[];
  category_ids: string[];
  publisher_id: string;
  year: number;
  pages: number;
  language: string;
}

@injectable()
export default class CreateBookService {
  constructor(
    @inject('BooksRepository') private booksRepository: IBooksRepository,

    @inject('AuthorRepository') private authorsRepository: IAuthorRepository,

    @inject('PublisherRepository')
    private publisherRepository: IPublisherRepository,

    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    book_id,
    author_ids,
    category_ids,
    description,
    language,
    pages,
    publisher_id,
    title,
    year,
  }: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(book_id);

    if (!book) {
      throw new AppError('Book not found');
    }

    const authors = await this.authorsRepository.findByIds(author_ids);
    const categories = await this.categoriesRepository.findByIds(category_ids);
    const publisher = await this.publisherRepository.findById(publisher_id);

    if (!publisher) {
      throw new AppError('Publisher not Found');
    }

    book.authors = authors;
    book.categories = categories;
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
