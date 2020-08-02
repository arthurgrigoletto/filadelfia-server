import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Publisher from '../infra/typeorm/entities/Publisher';
import IPublisherRepository from '../repositories/IPublisherRepository';

interface IRequest {
  publisher_id: string;
  name: string;
}

@injectable()
export default class UpdatePublisherService {
  constructor(
    @inject('PublisherRepository')
    private publisherRepository: IPublisherRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, publisher_id }: IRequest): Promise<Publisher> {
    const publisher = await this.publisherRepository.findById(publisher_id);

    if (!publisher) {
      throw new AppError('Cannot update an non-existing publisher');
    }

    const checkPublisherWithName = await this.publisherRepository.findByName(
      name,
    );

    if (checkPublisherWithName) {
      throw new AppError('Publisher with this name already exists');
    }

    publisher.name = name;

    await this.cacheProvider.invalidatePrefix('categories-list');

    return this.publisherRepository.save(publisher);
  }
}
