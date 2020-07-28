import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListBookService from './ListBookService';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeBooksRepository: FakeBooksRepository;
let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCacheProvider: FakeCacheProvider;
let listBooks: ListBookService;

describe('CreateBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listBooks = new ListBookService(fakeBooksRepository, fakeCacheProvider);
  });

  it('should be able to list all books', async () => {
    const author = await fakeAuthorsRepository.create('teste');

    const book1 = await fakeBooksRepository.create({
      title: 'teste-title',
      description: 'teste-description',
      authors: [author],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
    });

    const book2 = await fakeBooksRepository.create({
      title: 'teste-title2',
      description: 'teste-description',
      authors: [author],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
    });

    const books = await listBooks.execute({
      user_id: '123123',
    });

    expect(books).toEqual(expect.arrayContaining([book1, book2]));
  });

  it('should be able to filter list of books', async () => {
    const author = await fakeAuthorsRepository.create('teste');

    await fakeBooksRepository.create({
      title: 'teste-title',
      description: 'teste-description',
      authors: [author],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
    });

    const book2 = await fakeBooksRepository.create({
      title: 'teste-title2',
      description: 'teste-description',
      authors: [author],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
    });

    const books = await listBooks.execute({
      user_id: '123123',
    });

    expect(books).toEqual(expect.arrayContaining([book2]));
  });
});
