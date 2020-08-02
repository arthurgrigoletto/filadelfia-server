import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
export default class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(author_id: string): Promise<void> {
    const author = await this.categoriesRepository.findById(author_id);

    if (!author) {
      throw new AppError('Cannot delete an non-existing author');
    }

    await this.cacheProvider.invalidatePrefix('authors-list');

    return this.categoriesRepository.delete(author_id);
  }
}
