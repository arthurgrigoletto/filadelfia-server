import Book from '../infra/typeorm/entities/Book';
import ICreateBookDTO from '../dtos/ICreateBookDTO';
import IFindAllBooksDTO from '../dtos/IFindAllBooksDTO';

export default interface IBooksRepository {
  find(options?: IFindAllBooksDTO): Promise<Book[]>;
  findById(id: string): Promise<Book | undefined>;
  findByTitle(title: string): Promise<Book | undefined>;
  create(data: ICreateBookDTO): Promise<Book>;
  save(book: Book): Promise<Book>;
  delete(id: string): Promise<void>;
}
