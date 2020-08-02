import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Category[]> {
    const cacheKey = `categories-list:${user_id}`;

    // let categories = await this.cacheProvider.recover<Category[]>(cacheKey);
    let categories;

    if (!categories) {
      categories = await this.categoryRepository.find();

      await this.cacheProvider.save(cacheKey, categories);
    }

    return categories;
  }
}
