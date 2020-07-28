import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateBookService from './CreateBookService';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeBooksRepository: FakeBooksRepository;
let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCacheProvider: FakeCacheProvider;
let createBook: CreateBookService;

describe('CreateBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createBook = new CreateBookService(
      fakeBooksRepository,
      fakeAuthorsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a book', async () => {
    const author = await fakeAuthorsRepository.create('teste');

    const book = await createBook.execute({
      title: 'teste-title',
      description: 'teste-description',
      authors_id: [author.id],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
    });

    expect(book).toHaveProperty('id');
  });

  it('should not be able to create a book with same title', async () => {
    const author = await fakeAuthorsRepository.create('teste');

    await createBook.execute({
      title: 'teste-title',
      description: 'teste-description',
      authors_id: [author.id],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
    });

    await expect(
      createBook.execute({
        title: 'teste-title',
        description: 'teste-description',
        authors_id: [author.id],
        category: 'teste-category',
        language: 'teste-language',
        pages: 100,
        year: 2020,
        publisher: 'teste-publisher',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
