import { uuid } from 'uuidv4';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';
import Book from '@modules/books/infra/typeorm/entities/Book';
import IFindAllBooksDTO from '@modules/books/dtos/IFindAllBooksDTO';

import keys from '@shared/infra/http/helpers/KeysTypeHelper';

class FakeUsersRepository implements IBooksRepository {
  private books: Book[] = [];

  public async find(options: IFindAllBooksDTO): Promise<Book[]> {
    const { where } = options;

    const books = this.books.filter(book => {
      if (!where) {
        return true;
      }

      return keys(where).every(queryKey => where[queryKey] === book[queryKey]);
    });

    return books;
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
