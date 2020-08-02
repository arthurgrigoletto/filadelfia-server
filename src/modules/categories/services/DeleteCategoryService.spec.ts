import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import DeleteCategoryService from './DeleteCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

let fakeCategoriesRepository: FakeCategoryRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteCategory: DeleteCategoryService;

describe('DeleteCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoryRepository();
    fakeCacheProvider = new FakeCacheProvider();

    deleteCategory = new DeleteCategoryService(
      fakeCategoriesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to delete an category', async () => {
    const category = await fakeCategoriesRepository.create('teste-category');

    await deleteCategory.execute(category.id);

    const findCategory = await fakeCategoriesRepository.findById(category.id);

    expect(findCategory).toBeUndefined();
  });

  it('should not be able to delete a non-existing category', async () => {
    await expect(
      deleteCategory.execute('non-existing-category'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
