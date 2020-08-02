import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';
import ShowAuthorService from './ShowAuthorService';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCacheProvider: FakeCacheProvider;
let showAuthor: ShowAuthorService;

describe('ShowAuthor', () => {
  beforeEach(() => {
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();

    showAuthor = new ShowAuthorService(
      fakeAuthorsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to show an author', async () => {
    const fakeAuthor = await fakeAuthorsRepository.create('teste');

    const author = await showAuthor.execute({
      user_id: '123123',
      author_id: fakeAuthor.id,
    });

    expect(author.name).toBe('teste');
  });

  it('should not be able to show an non-existing author', async () => {
    await expect(
      showAuthor.execute({ author_id: 'non-exist-author', user_id: '123123' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
