import Author from '../infra/typeorm/entities/Author';

export default interface IAuthorsRepository {
  find(): Promise<Author[]>;
  findById(id: string): Promise<Author | undefined>;
  findByIds(ids: string[]): Promise<Author[]>;
  findByName(name: string): Promise<Author | undefined>;
  create(name: string): Promise<Author>;
  save(author: Author): Promise<Author>;
}
