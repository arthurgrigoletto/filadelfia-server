import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import Publisher from '../infra/typeorm/entities/Publisher';
import IPublisherRepository from '../repositories/IPublisherRepository';

interface IRequest {
  user_id: string;
  publisher_id: string;
}

@injectable()
export default class ShowPublisherService {
  constructor(
    @inject('PublisherRepository')
    private publisherRepository: IPublisherRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    publisher_id,
    user_id,
  }: IRequest): Promise<Publisher> {
    const cacheKey = `publishers-show:${user_id}:${publisher_id}`;

    // let publisher = await this.cacheProvider.recover<Publisher>(cacheKey);
    let publisher;

    if (!publisher) {
      publisher = await this.publisherRepository.findById(publisher_id);

      if (!publisher) {
        throw new AppError('Cannot find publisher with this id');
      }

      await this.cacheProvider.save(cacheKey, publisher);
    }

    return publisher;
  }
}
