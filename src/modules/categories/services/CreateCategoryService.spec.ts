import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateCategoryService from './CreateCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

let fakeCategoriesRepository: FakeCategoryRepository;
let fakeCacheProvider: FakeCacheProvider;
let createCategory: CreateCategoryService;

describe('CreateCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoryRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createCategory = new CreateCategoryService(
      fakeCategoriesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a book', async () => {
    const author = await fakeCategoriesRepository.create('teste');

    expect(author).toHaveProperty('id');
  });

  it('should not be able to create a book with same title', async () => {
    await createCategory.execute({
      name: 'teste-name',
    });

    await expect(
      createCategory.execute({
        name: 'teste-name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
