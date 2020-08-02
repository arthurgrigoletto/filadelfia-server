import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateAuthorService from './CreateAuthorService';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAuthor: CreateAuthorService;

describe('CreateAuthors', () => {
  beforeEach(() => {
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAuthor = new CreateAuthorService(
      fakeAuthorsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create an author', async () => {
    const author = await createAuthor.execute({ name: 'teste' });

    expect(author).toHaveProperty('id');
  });

  it('should not be able to create a book with same title', async () => {
    await createAuthor.execute({
      name: 'teste-name',
    });

    await expect(
      createAuthor.execute({
        name: 'teste-name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
