import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Author from '../infra/typeorm/entities/Author';
import IAuthorRepository from '../repositories/IAuthorRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListAuthorService {
  constructor(
    @inject('AuthorRepository') private authorRepository: IAuthorRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Author[]> {
    const cacheKey = `authors-list:${user_id}`;

    // let authors = await this.cacheProvider.recover<Author[]>(cacheKey);
    let authors;

    if (!authors) {
      authors = await this.authorRepository.find();

      await this.cacheProvider.save(cacheKey, authors);
    }

    return authors;
  }
}
