import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  find(): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  findByIds(ids: string[]): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
  create(name: string): Promise<Category>;
  save(category: Category): Promise<Category>;
  delete(category_id: string): Promise<void>;
}
