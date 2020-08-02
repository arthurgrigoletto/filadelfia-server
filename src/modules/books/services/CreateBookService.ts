import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAuthorRepository from '@modules/authors/repositories/IAuthorRepository';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import IPublisherRepository from '@modules/publishers/repositories/IPublisherRepository';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../infra/typeorm/entities/Book';

interface IRequest {
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
    author_ids,
    category_ids,
    description,
    language,
    pages,
    publisher_id,
    title,
    year,
  }: IRequest): Promise<Book> {
    const checkBookExists = await this.booksRepository.findByTitle(title);

    if (checkBookExists) {
      throw new AppError('Title already used to another book');
    }

    const authors = await this.authorsRepository.findByIds(author_ids);
    const categories = await this.categoriesRepository.findByIds(category_ids);
    const publisher = await this.publisherRepository.findById(publisher_id);

    if (!authors.length) {
      throw new AppError('Found no Author with id');
    }

    if (!categories.length) {
      throw new AppError('Found no Category with id');
    }

    if (!publisher) {
      throw new AppError('Found no Publisher with id');
    }

    const book = await this.booksRepository.create({
      authors,
      categories,
      description,
      language,
      pages,
      publisher,
      title,
      year,
    });

    await this.cacheProvider.invalidatePrefix('books-list');
    await this.cacheProvider.invalidatePrefix('authors-list');
    await this.cacheProvider.invalidatePrefix('categories-list');

    return book;
  }
}
