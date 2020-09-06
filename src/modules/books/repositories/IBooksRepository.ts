import Book from '../infra/typeorm/entities/Book';
import ICreateBookDTO from '../dtos/ICreateBookDTO';

export default interface IBooksRepository {
  find(): Promise<Book[]>;
  findById(id: string): Promise<Book | undefined>;
  findByTitle(title: string): Promise<Book | undefined>;
  create(data: ICreateBookDTO): Promise<Book>;
  save(book: Book): Promise<Book>;
  delete(id: string): Promise<void>;
}
