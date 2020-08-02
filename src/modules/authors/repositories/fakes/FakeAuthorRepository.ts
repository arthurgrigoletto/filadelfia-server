import { uuid } from 'uuidv4';

import IAuthorRepository from '@modules/books/repositories/IAuthorRepository';
import Author from '@modules/books/infra/typeorm/entities/Author';

class FakeUsersRepository implements IAuthorRepository {
  private authors: Author[] = [];

  public async find(): Promise<Author[]> {
    return this.authors;
  }

  public async findById(id: string): Promise<Author | undefined> {
    const findAuthor = this.authors.find(author => author.id === id);

    return findAuthor;
  }

  public async findByIds(ids: string[]): Promise<Author[]> {
    const findAuthors = this.authors.filter(author => ids.includes(author.id));

    return findAuthors;
  }

  public async findByName(name: string): Promise<Author | undefined> {
    const findAuthor = this.authors.find(author => author.name === name);

    return findAuthor;
  }

  public async create(name: string): Promise<Author> {
    const author = new Author();

    Object.assign(author, { id: uuid() }, { name });

    this.authors.push(author);

    return author;
  }

  public async save(author: Author): Promise<Author> {
    const findIndex = this.authors.findIndex(
      findAuthor => findAuthor.id === author.id,
    );

    this.authors[findIndex] = author;

    return author;
  }

  public async delete(author_id: string): Promise<void> {
    const findIndex = this.authors.findIndex(
      findAuthor => findAuthor.id === author_id,
    );

    this.authors.splice(findIndex, 1);
  }
}

export default FakeUsersRepository;
