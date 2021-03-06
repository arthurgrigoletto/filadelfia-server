import { uuid } from 'uuidv4';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Category from '@modules/categories/infra/typeorm/entities/Category';

class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async find(): Promise<Category[]> {
    return this.categories;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const findCategories = this.categories.find(author => author.id === id);

    return findCategories;
  }

  public async findByIds(ids: string[]): Promise<Category[]> {
    const findCategories = this.categories.filter(author =>
      ids.includes(author.id),
    );

    return findCategories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const findCategories = this.categories.find(author => author.name === name);

    return findCategories;
  }

  public async create(name: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid() }, { name });

    this.categories.push(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategories => findCategories.id === category.id,
    );

    this.categories[findIndex] = category;

    return category;
  }

  public async delete(category_id: string): Promise<void> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id === category_id,
    );

    this.categories.splice(findIndex, 1);
  }
}

export default FakeCategoryRepository;
