import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Author from '../infra/typeorm/entities/Author';
import IAuthorRepository from '../repositories/IAuthorRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateAuthorService {
  constructor(
    @inject('AuthorRepository') private authorsRepository: IAuthorRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<Author> {
    const findAuthor = await this.authorsRepository.findByName(name);

    if (findAuthor) {
      throw new AppError('Author name already exists');
    }

    const author = await this.authorsRepository.create(name);

    await this.cacheProvider.invalidatePrefix('authors-list');

    return author;
  }
}
