import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAuthorRepository from '@modules/authors/repositories/fakes/FakeAuthorRepository';
import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';
import FakeStockRepository from '@modules/stock/repositories/fakes/FakeStockRepository';
import FakePublisherRepository from '@modules/publishers/repositories/fakes/FakePublisherRepository';

import CreateBookService from './CreateBookService';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';

let fakeBooksRepository: FakeBooksRepository;
let fakeAuthorsRepository: FakeAuthorRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let fakeStockRepository: FakeStockRepository;
let fakePublisherRepository: FakePublisherRepository;
let fakeCacheProvider: FakeCacheProvider;
let createBook: CreateBookService;

describe('CreateBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    fakeAuthorsRepository = new FakeAuthorRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeCategoryRepository = new FakeCategoryRepository();
    fakeStockRepository = new FakeStockRepository();
    fakePublisherRepository = new FakePublisherRepository();

    createBook = new CreateBookService(
      fakeBooksRepository,
      fakeAuthorsRepository,
      fakeStockRepository,
      fakePublisherRepository,
      fakeCategoryRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a book', async () => {
    const author = await fakeAuthorsRepository.create('teste-author');
    const publisher = await fakePublisherRepository.create('teste-publiser');
    const category = await fakeCategoryRepository.create('teste-category');

    const book = await createBook.execute({
      title: 'teste-title',
      description: 'teste-description',
      author_ids: [author.id],
      category_ids: [category.id],
      publisher_id: publisher.id,
      language: 'teste-language',
      pages: 100,
      year: 2020,
    });

    expect(book).toHaveProperty('id');
  });

  it('should not be able to create a book with same title', async () => {
    const author = await fakeAuthorsRepository.create('teste-author');
    const publisher = await fakePublisherRepository.create('teste-publiser');
    const category = await fakeCategoryRepository.create('teste-category');

    await createBook.execute({
      title: 'teste-title',
      description: 'teste-description',
      author_ids: [author.id],
      category_ids: [category.id],
      publisher_id: publisher.id,
      language: 'teste-language',
      pages: 100,
      year: 2020,
    });

    await expect(
      createBook.execute({
        title: 'teste-title',
        description: 'teste-description',
        author_ids: [author.id],
        category_ids: [category.id],
        publisher_id: publisher.id,
        language: 'teste-language',
        pages: 100,
        year: 2020,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
