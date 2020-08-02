import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import UpdateAuthorService from './UpdateAuthorService';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateAuthor: UpdateAuthorService;

describe('UpdateAuthors', () => {
  beforeEach(() => {
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updateAuthor = new UpdateAuthorService(
      fakeAuthorsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update an author', async () => {
    const author = await fakeAuthorsRepository.create('teste');

    const authorUpdate = await updateAuthor.execute({
      author_id: author.id,
      name: 'teste-author',
    });

    expect(authorUpdate.name).toBe('teste-author');
  });

  it('should not be able to change to another author name', async () => {
    await fakeAuthorsRepository.create('teste');

    const author = await fakeAuthorsRepository.create('teste-author');

    await expect(
      updateAuthor.execute({
        author_id: author.id,
        name: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the author from non-existing author', async () => {
    await expect(
      updateAuthor.execute({
        author_id: 'non-existing-author',
        name: 'Teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
