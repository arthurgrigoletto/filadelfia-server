import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListAuthorService from './ListAuthorService';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCacheProvider: FakeCacheProvider;
let listAuthor: ListAuthorService;

describe('CreateBooks', () => {
  beforeEach(() => {
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listAuthor = new ListAuthorService(
      fakeAuthorsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all authors', async () => {
    const author = await fakeAuthorsRepository.create('teste');

    const books = await listAuthor.execute({
      user_id: '123123',
    });

    expect(books).toEqual(expect.arrayContaining([author]));
  });
});
