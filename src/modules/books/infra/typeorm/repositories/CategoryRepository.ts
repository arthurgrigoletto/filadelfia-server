import { getRepository, Repository } from 'typeorm';

import ICategoryRepository from '@modules/books/repositories/ICategoryRepository';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async find(): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      relations: ['books'],
    });

    return categories;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id, {
      relations: ['books'],
    });

    return category;
  }

  public async findByIds(ids: string[]): Promise<Category[]> {
    const categories = await this.ormRepository.findByIds(ids, {
      relations: ['books'],
    });

    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name },
      relations: ['books'],
    });

    return category;
  }

  public async create(name: string): Promise<Category> {
    const category = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }
}

export default CategoriesRepository;
