import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  user_id: string;
  category_id: string;
}

@injectable()
export default class ShowCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ category_id, user_id }: IRequest): Promise<Category> {
    const cacheKey = `categories-show:${user_id}:${category_id}`;

    // let category = await this.cacheProvider.recover<Category>(cacheKey);
    let category;

    if (!category) {
      category = await this.categoryRepository.findById(category_id);

      if (!category) {
        throw new AppError('Cannot find category with this id');
      }

      await this.cacheProvider.save(cacheKey, category);
    }

    return category;
  }
}
