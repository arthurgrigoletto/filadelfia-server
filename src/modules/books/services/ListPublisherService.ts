import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Category from '../infra/typeorm/entities/Category';
import IPublisherRepository from '../repositories/IPublisherRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListCategoryService {
  constructor(
    @inject('PublisherRepository')
    private publisherRepository: IPublisherRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Category[]> {
    const cacheKey = `publishers-list:${user_id}`;

    // let publishers = await this.cacheProvider.recover<Category[]>(cacheKey);
    let publishers;

    if (!publishers) {
      publishers = await this.publisherRepository.find();

      await this.cacheProvider.save(cacheKey, publishers);
    }

    return publishers;
  }
}
