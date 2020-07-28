import Author from '../infra/typeorm/entities/Author';

export default interface ICreateBookDTO {
  title: string;
  authors: Author[];
  description: string;
  category: string;
  publisher: string;
  year: number;
  pages: number;
  language: string;
}
