import AppError from '@shared/errors/AppError';
import FakeAuthorRepository from '@modules/authors/repositories/fakes/FakeAuthorRepository';
import FakePublisherRepository from '@modules/publishers/repositories/fakes/FakePublisherRepository';
import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';
import DeleteBookService from './DeleteBookService';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';

let fakeBooksRepository: FakeBooksRepository;
let fakeAuthorRepository: FakeAuthorRepository;
let fakePublisherRepository: FakePublisherRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let deleteBook: DeleteBookService;

describe('DeleteBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    fakeAuthorRepository = new FakeAuthorRepository();
    fakePublisherRepository = new FakePublisherRepository();
    fakeCategoryRepository = new FakeCategoryRepository();

    deleteBook = new DeleteBookService(fakeBooksRepository);
  });

  it('should be able to delete a book', async () => {
    const author = await fakeAuthorRepository.create('teste-author');
    const publisher = await fakePublisherRepository.create('teste-publisher');
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

    await deleteBook.execute({ book_id: book.id });

    await expect(fakeBooksRepository.findById(book.id)).resolves.toBe(
      undefined,
    );
  });

  it('should not be able to delete a book with invalid ID', async () => {
    await expect(
      deleteBook.execute({ book_id: 'teste-delete' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
