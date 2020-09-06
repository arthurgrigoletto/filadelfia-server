import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IAuthorRepository from '../repositories/IAuthorRepository';

@injectable()
export default class DeleteAuthorService {
  constructor(
    @inject('AuthorRepository') private authorsRepository: IAuthorRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('StorageProvider') private storageRepository: IStorageProvider,
  ) {}

  public async execute(author_id: string): Promise<void> {
    const author = await this.authorsRepository.findById(author_id);

    if (!author) {
      throw new AppError('Cannot delete an non-existing author');
    }

    if (author.avatar) {
      await this.storageRepository.deleteFile(author.avatar);
    }

    await this.cacheProvider.invalidatePrefix('authors-list');

    return this.authorsRepository.delete(author_id);
  }
}
