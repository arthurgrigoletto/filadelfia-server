import { FindManyOptions } from 'typeorm';

export default interface IFindAllBooksDTO extends FindManyOptions {
  where?: {
    title?: string;
    category?: string;
  };
}
