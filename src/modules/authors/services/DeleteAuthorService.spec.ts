import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import DeleteAuthorService from './DeleteAuthorService';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeStorageProvider: FakeStorageProvider;
let deleteAuthor: DeleteAuthorService;

describe('DeleteAuthor', () => {
  beforeEach(() => {
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();

    deleteAuthor = new DeleteAuthorService(
      fakeAuthorsRepository,
      fakeCacheProvider,
      fakeStorageProvider,
    );
  });

  it('should be able to delete an author', async () => {
    const author = await fakeAuthorsRepository.create('teste-author');

    await deleteAuthor.execute(author.id);

    const findAuthor = await fakeAuthorsRepository.findById(author.id);

    expect(findAuthor).toBeUndefined();
  });

  it('should not be able to delete a non-existing author', async () => {
    await expect(
      deleteAuthor.execute('non-existing-author'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
