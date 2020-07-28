import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListCategoryService from './ListCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

let fakeCategoryRepository: FakeCategoryRepository;
let fakeCacheProvider: FakeCacheProvider;
let listCategory: ListCategoryService;

describe('CreateBooks', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listCategory = new ListCategoryService(
      fakeCategoryRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all authors', async () => {
    const author = await fakeCategoryRepository.create('teste');

    const books = await listCategory.execute({
      user_id: '123123',
    });

    expect(books).toEqual(expect.arrayContaining([author]));
  });
});
