import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAuthorRepository from '@modules/authors/repositories/fakes/FakeAuthorRepository';
import FakePublisherRepository from '@modules/publishers/repositories/fakes/FakePublisherRepository';
import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';

import ListBookService from './ListBookService';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';

let fakeBooksRepository: FakeBooksRepository;
let fakeAuthorsRepository: FakeAuthorRepository;
let fakePublisherRepository: FakePublisherRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let fakeCacheProvider: FakeCacheProvider;
let listBooks: ListBookService;

describe('CreateBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakePublisherRepository = new FakePublisherRepository();
    fakeCategoryRepository = new FakeCategoryRepository();

    listBooks = new ListBookService(fakeBooksRepository, fakeCacheProvider);
  });

  it('should be able to list all books', async () => {
    const author = await fakeAuthorsRepository.create('teste-author');
    const publisher = await fakePublisherRepository.create('teste-publisher');
    const category = await fakeCategoryRepository.create('teste-category');

    const book1 = await fakeBooksRepository.create({
      title: 'teste-title',
      description: 'teste-description',
      authors: [author],
      categories: [category],
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher,
    });

    const book2 = await fakeBooksRepository.create({
      title: 'teste-title2',
      description: 'teste-description',
      authors: [author],
      categories: [category],
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher,
    });

    const books = await listBooks.execute({
      user_id: '123123',
    });

    expect(books).toEqual(expect.arrayContaining([book1, book2]));
  });

  it('should be able to filter list of books', async () => {
    const author = await fakeAuthorsRepository.create('teste-author');
    const publisher = await fakePublisherRepository.create('teste-publisher');
    const category = await fakeCategoryRepository.create('teste-category');

    await fakeBooksRepository.create({
      title: 'teste-title',
      description: 'teste-description',
      authors: [author],
      categories: [category],
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher,
    });

    const book2 = await fakeBooksRepository.create({
      title: 'teste-title2',
      description: 'teste-description',
      authors: [author],
      categories: [category],
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher,
    });

    const books = await listBooks.execute({
      user_id: '123123',
    });

    expect(books).toEqual(expect.arrayContaining([book2]));
  });
});
