import { getRepository, Repository } from 'typeorm';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';

import Book from '../entities/Book';

class BooksRepository implements IBooksRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async find(): Promise<Book[]> {
    const books = await this.ormRepository.find({
      relations: ['authors', 'categories', 'publisher'],
    });

    return books;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne(id, {
      relations: ['authors', 'categories', 'publisher'],
    });

    return book;
  }

  public async findByTitle(title: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne({
      where: { title },
      relations: ['authors', 'categories', 'publisher'],
    });

    return book;
  }

  public async create({
    authors,
    categories,
    description,
    language,
    pages,
    publisher,
    title,
    year,
  }: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create({
      authors,
      categories,
      language,
      description,
      pages,
      title,
      year,
      publisher,
    });

    await this.ormRepository.save(book);

    return book;
  }

  public async save(book: Book): Promise<Book> {
    return this.ormRepository.save(book);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default BooksRepository;
