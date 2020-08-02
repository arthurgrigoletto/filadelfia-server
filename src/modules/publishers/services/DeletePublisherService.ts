import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IPublisherRepository from '../repositories/IPublisherRepository';

@injectable()
export default class DeletePublisherService {
  constructor(
    @inject('PublisherRepository')
    private publisherRepository: IPublisherRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(publisher_id: string): Promise<void> {
    const publisher = await this.publisherRepository.findById(publisher_id);

    if (!publisher) {
      throw new AppError('Cannot delete an non-existing publisher');
    }

    await this.cacheProvider.invalidatePrefix('publishers-list');

    return this.publisherRepository.delete(publisher_id);
  }
}
