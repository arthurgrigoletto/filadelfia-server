import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Author from '../infra/typeorm/entities/Author';
import IAuthorRepository from '../repositories/IAuthorRepository';

interface IRequest {
  author_id: string;
  name: string;
}

@injectable()
export default class UpdateAuthorService {
  constructor(
    @inject('AuthorRepository') private authorsRepository: IAuthorRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, author_id }: IRequest): Promise<Author> {
    const author = await this.authorsRepository.findById(author_id);

    if (!author) {
      throw new AppError('Cannot update an non-existing author');
    }

    const checkAuthorWithName = await this.authorsRepository.findByName(name);

    if (checkAuthorWithName) {
      throw new AppError('Author with this name already exists');
    }

    author.name = name;

    await this.cacheProvider.invalidatePrefix('authors-list');

    return this.authorsRepository.save(author);
  }
}
