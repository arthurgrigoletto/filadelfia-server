import { getRepository, Repository } from 'typeorm';

import IPublisherRepository from '@modules/publishers/repositories/IPublisherRepository';

import Publisher from '../entities/Publisher';

class CategoriesRepository implements IPublisherRepository {
  private ormRepository: Repository<Publisher>;

  constructor() {
    this.ormRepository = getRepository(Publisher);
  }

  public async find(): Promise<Publisher[]> {
    const categories = await this.ormRepository.find({
      relations: ['books'],
    });

    return categories;
  }

  public async findById(id: string): Promise<Publisher | undefined> {
    const category = await this.ormRepository.findOne(id, {
      relations: ['books'],
    });

    return category;
  }

  public async findByIds(ids: string[]): Promise<Publisher[]> {
    const categories = await this.ormRepository.findByIds(ids, {
      relations: ['books'],
    });

    return categories;
  }

  public async findByName(name: string): Promise<Publisher | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name },
      relations: ['books'],
    });

    return category;
  }

  public async create(name: string): Promise<Publisher> {
    const category = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Publisher): Promise<Publisher> {
    return this.ormRepository.save(category);
  }

  public async delete(publisher_id: string): Promise<void> {
    await this.ormRepository.delete({ id: publisher_id });
  }
}

export default CategoriesRepository;
