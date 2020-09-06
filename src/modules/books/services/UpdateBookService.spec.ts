import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAuthorRepository from '@modules/authors/repositories/fakes/FakeAuthorRepository';
import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';
import FakePublisherRepository from '@modules/publishers/repositories/fakes/FakePublisherRepository';

import UpdateBookService from './UpdateBookService';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';

let fakeBooksRepository: FakeBooksRepository;
let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let fakePublisherRepository: FakePublisherRepository;
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
      fakePublisherRepository,
      fakeCategoryRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update a book', async () => {
    const author = await fakeAuthorsRepository.create('teste-author');
    const publisher = await fakePublisherRepository.create('teste-publiser');
    const category = await fakeCategoryRepository.create('teste-category');

    const book = await fakeBooksRepository.create({
      title: 'teste-title',
      description: 'teste-description',
      authors: [author],
      categories: [category],
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher,
    });

    const updatedBook = await updateBook.execute({
      book_id: book.id,
      description: 'teste-description',
      author_ids: [],
      category_ids: [],
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher_id: publisher.id,
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
        author_ids: [],
        category_ids: ['teste-category'],
        language: 'teste-language',
        pages: 100,
        year: 2020,
        publisher_id: 'teste-publisher',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
