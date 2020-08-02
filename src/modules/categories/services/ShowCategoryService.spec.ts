import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';
import ShowCategoryService from './ShowCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

let fakeCategoriesRepository: FakeCategoryRepository;
let fakeCacheProvider: FakeCacheProvider;
let showCategory: ShowCategoryService;

describe('ShowCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoryRepository();
    fakeCacheProvider = new FakeCacheProvider();

    showCategory = new ShowCategoryService(
      fakeCategoriesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to show an category', async () => {
    const fakeCategory = await fakeCategoriesRepository.create('teste');

    const category = await showCategory.execute({
      user_id: '123123',
      category_id: fakeCategory.id,
    });

    expect(category.name).toBe('teste');
  });

  it('should not be able to show an non-existing category', async () => {
    await expect(
      showCategory.execute({
        category_id: 'non-exist-category',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
