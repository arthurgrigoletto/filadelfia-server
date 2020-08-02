import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import Author from '../infra/typeorm/entities/Author';
import IAuthorRepository from '../repositories/IAuthorRepository';

interface IRequest {
  user_id: string;
  author_id: string;
}

@injectable()
export default class ShowAuthorService {
  constructor(
    @inject('AuthorRepository') private authorRepository: IAuthorRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ author_id, user_id }: IRequest): Promise<Author> {
    const cacheKey = `authors-show:${user_id}:${author_id}`;

    // let author = await this.cacheProvider.recover<Author>(cacheKey);
    let author;

    if (!author) {
      author = await this.authorRepository.findById(author_id);

      if (!author) {
        throw new AppError('Cannot find author with this id');
      }

      await this.cacheProvider.save(cacheKey, author);
    }

    return author;
  }
}
