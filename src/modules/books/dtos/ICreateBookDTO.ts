import Author from '@modules/authors/infra/typeorm/entities/Author';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import Publisher from '@modules/publishers/infra/typeorm/entities/Publisher';

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
