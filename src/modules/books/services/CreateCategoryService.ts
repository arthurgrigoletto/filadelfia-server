import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<Category> {
    const findCategory = await this.categoriesRepository.findByName(name);

    if (findCategory) {
      throw new AppError('Category name already exists');
    }

    const category = await this.categoriesRepository.create(name);

    await this.cacheProvider.invalidatePrefix('categories-list');

    return category;
  }
}
