import Author from '../infra/typeorm/entities/Author';
import Category from '../infra/typeorm/entities/Category';
import Publisher from '../infra/typeorm/entities/Publisher';

export default interface ICreateBookDTO {
  title: string;
  authors: Author[];
  description: string;
  categories: Category[];
  publisher: Publisher;
  year: number;
  pages: number;
  language: string;
}
