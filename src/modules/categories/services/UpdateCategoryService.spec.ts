import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import UpdateCategoryService from './UpdateCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

let fakeCategoryRepository: FakeCategoryRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateCategory: UpdateCategoryService;

describe('UpdateCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updateCategory = new UpdateCategoryService(
      fakeCategoryRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update an category', async () => {
    const category = await fakeCategoryRepository.create('teste');

    const categoryUpdate = await updateCategory.execute({
      category_id: category.id,
      name: 'teste-category',
    });

    expect(categoryUpdate.name).toBe('teste-category');
  });

  it('should not be able to change to another author name', async () => {
    await fakeCategoryRepository.create('teste');

    const category = await fakeCategoryRepository.create('teste-category');

    await expect(
      updateCategory.execute({
        category_id: category.id,
        name: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the category from non-existing category', async () => {
    await expect(
      updateCategory.execute({
        category_id: 'non-existing-category',
        name: 'Teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
