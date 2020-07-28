import { getRepository, Repository } from 'typeorm';

import IAuthorRepository from '@modules/books/repositories/IAuthorRepository';

import Author from '../entities/Author';

class AuthorsRepository implements IAuthorRepository {
  private ormRepository: Repository<Author>;

  constructor() {
    this.ormRepository = getRepository(Author);
  }

  public async find(): Promise<Author[]> {
    const authors = await this.ormRepository.find({
      relations: ['books'],
    });

    return authors;
  }

  public async findById(id: string): Promise<Author | undefined> {
    const author = await this.ormRepository.findOne(id, {
      relations: ['books'],
    });

    return author;
  }

  public async findByIds(ids: string[]): Promise<Author[]> {
    const authors = await this.ormRepository.findByIds(ids, {
      relations: ['books'],
    });

    return authors;
  }

  public async findByName(name: string): Promise<Author | undefined> {
    const author = await this.ormRepository.findOne({
      where: { name },
      relations: ['books'],
    });

    return author;
  }

  public async create(name: string): Promise<Author> {
    const author = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(author);

    return author;
  }

  public async save(author: Author): Promise<Author> {
    return this.ormRepository.save(author);
  }
}

export default AuthorsRepository;
