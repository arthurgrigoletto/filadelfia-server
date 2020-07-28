import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import UpdateBookService from './UpdateBookService';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeBooksRepository: FakeBooksRepository;
let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateBook: UpdateBookService;

describe('UpdateBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updateBook = new UpdateBookService(
      fakeBooksRepository,
      fakeAuthorsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update a book', async () => {
    const author = await fakeAuthorsRepository.create('teste');

    const book = await fakeBooksRepository.create({
      title: 'teste-title',
      description: 'teste-description',
      authors: [author],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
    });

    const updatedBook = await updateBook.execute({
      book_id: book.id,
      description: 'teste-description',
      authors_id: [],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
      title: 'teste-update',
    });

    expect(updatedBook).toEqual(
      expect.objectContaining({
        description: 'teste-description',
        authors: [],
        category: 'teste-category',
        language: 'teste-language',
        pages: 100,
        year: 2020,
        publisher: 'teste-publisher',
        title: 'teste-update',
      }),
    );
  });

  it('should not be able to update a book with invalid ID', async () => {
    await expect(
      updateBook.execute({
        book_id: 'teste-book-id',
        title: 'teste-title',
        description: 'teste-description',
        authors_id: [],
        category: 'teste-category',
        language: 'teste-language',
        pages: 100,
        year: 2020,
        publisher: 'teste-publisher',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
