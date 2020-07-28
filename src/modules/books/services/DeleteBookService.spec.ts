import AppError from '@shared/errors/AppError';
import DeleteBookService from './DeleteBookService';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import FakeAuthorRepository from '../repositories/fakes/FakeAuthorRepository';

let fakeBooksRepository: FakeBooksRepository;
let fakeAuthorRepository: FakeAuthorRepository;
let deleteBook: DeleteBookService;

describe('DeleteBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    fakeAuthorRepository = new FakeAuthorRepository();

    deleteBook = new DeleteBookService(fakeBooksRepository);
  });

  it('should be able to delete a book', async () => {
    const user = await fakeAuthorRepository.create('teste');

    const book = await fakeBooksRepository.create({
      title: 'teste-title',
      description: 'teste-description',
      authors: [user],
      category: 'teste-category',
      language: 'teste-language',
      pages: 100,
      year: 2020,
      publisher: 'teste-publisher',
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
