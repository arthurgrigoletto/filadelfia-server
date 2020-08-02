import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAuthorRepository from '../repositories/IAuthorRepository';

@injectable()
export default class DeleteAuthorService {
  constructor(
    @inject('AuthorRepository') private authorsRepository: IAuthorRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(author_id: string): Promise<void> {
    const author = await this.authorsRepository.findById(author_id);

    if (!author) {
      throw new AppError('Cannot delete an non-existing author');
    }

    await this.cacheProvider.invalidatePrefix('authors-list');

    return this.authorsRepository.delete(author_id);
  }
}
