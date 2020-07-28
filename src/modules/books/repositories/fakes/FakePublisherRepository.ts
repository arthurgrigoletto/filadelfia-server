import { uuid } from 'uuidv4';

import IPublisherRepository from '@modules/books/repositories/IPublisherRepository';
import Publisher from '@modules/books/infra/typeorm/entities/Publisher';

class FakeUsersRepository implements IPublisherRepository {
  private publishers: Publisher[] = [];

  public async find(): Promise<Publisher[]> {
    return this.publishers;
  }

  public async findById(id: string): Promise<Publisher | undefined> {
    const findPublishers = this.publishers.find(
      publisher => publisher.id === id,
    );

    return findPublishers;
  }

  public async findByIds(ids: string[]): Promise<Publisher[]> {
    const findPublishers = this.publishers.filter(publisher =>
      ids.includes(publisher.id),
    );

    return findPublishers;
  }

  public async findByName(name: string): Promise<Publisher | undefined> {
    const findPublisher = this.publishers.find(
      publisher => publisher.name === name,
    );

    return findPublisher;
  }

  public async create(name: string): Promise<Publisher> {
    const publisher = new Publisher();

    Object.assign(publisher, { id: uuid() }, { name });

    this.publishers.push(publisher);

    return publisher;
  }

  public async save(publisher: Publisher): Promise<Publisher> {
    const findIndex = this.publishers.findIndex(
      findPublishers => findPublishers.id === publisher.id,
    );

    this.publishers[findIndex] = publisher;

    return publisher;
  }
}

export default FakeUsersRepository;
