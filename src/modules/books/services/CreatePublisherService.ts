import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Publisher from '../infra/typeorm/entities/Publisher';
import IPublisherRepository from '../repositories/IPublisherRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateBookService {
  constructor(
    @inject('PublisherRepository')
    private publisherRepository: IPublisherRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<Publisher> {
    const findPublisher = await this.publisherRepository.findByName(name);

    if (findPublisher) {
      throw new AppError('Publishers name already exists');
    }

    const publisher = await this.publisherRepository.create(name);

    await this.cacheProvider.invalidatePrefix('publishers-list');

    return publisher;
  }
}
