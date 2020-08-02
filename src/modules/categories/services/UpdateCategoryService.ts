import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Author from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  category_id: string;
  name: string;
}

@injectable()
export default class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, category_id }: IRequest): Promise<Author> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Cannot update an non-existing category');
    }

    const checkCategoryWithName = await this.categoriesRepository.findByName(
      name,
    );

    if (checkCategoryWithName) {
      throw new AppError('Category with this name already exists');
    }

    category.name = name;

    await this.cacheProvider.invalidatePrefix('categories-list');

    return this.categoriesRepository.save(category);
  }
}
