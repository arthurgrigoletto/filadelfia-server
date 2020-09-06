import { uuid } from 'uuidv4';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';
import Book from '@modules/books/infra/typeorm/entities/Book';

class FakeUsersRepository implements IBooksRepository {
  private books: Book[] = [];

  public async find(): Promise<Book[]> {
    return this.books;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const findBook = this.books.find(book => book.id === id);

    return findBook;
  }

  public async findByTitle(title: string): Promise<Book | undefined> {
    const findBook = this.books.find(book => book.title === title);

    return findBook;
  }

  public async create(bookData: ICreateBookDTO): Promise<Book> {
    const book = new Book();

    Object.assign(book, { id: uuid() }, bookData);

    this.books.push(book);

    return book;
  }

  public async save(book: Book): Promise<Book> {
    const findIndex = this.books.findIndex(findBook => findBook.id === book.id);

    this.books[findIndex] = book;

    return book;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.books.findIndex(findBook => findBook.id === id);

    this.books.splice(findIndex);
  }
}

export default FakeUsersRepository;
