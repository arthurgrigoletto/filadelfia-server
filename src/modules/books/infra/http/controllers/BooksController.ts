import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import DeleteBookService from '@modules/books/services/DeleteBookService';
import ListBookService from '@modules/books/services/ListBookService';
import CreateBookService from '@modules/books/services/CreateBookService';
import UpdateBookService from '@modules/books/services/UpdateBookService';

export default class BooksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listBooks = container.resolve(ListBookService);

    const books = await listBooks.execute({
      user_id,
    });

    return response.json(classToClass(books, { groups: ['books'] }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      author_ids,
      category_ids,
      language,
      publisher_id,
      year,
      pages,
    } = request.body;

    const createBook = container.resolve(CreateBookService);

    const book = await createBook.execute({
      author_ids,
      category_ids,
      description,
      language,
      pages,
      publisher_id,
      title,
      year,
    });

    return response.json(classToClass(book, { groups: ['books'] }));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      authors,
      category,
      language,
      publisher,
      year,
      pages,
    } = request.body;
    const { book_id } = request.params;

    const updateBook = container.resolve(UpdateBookService);

    const book = await updateBook.execute({
      book_id,
      title,
      authors_id: authors,
      description,
      category,
      language,
      pages,
      publisher,
      year,
    });

    return response.json(classToClass(book));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { book_id } = request.params;

    const deleteBook = container.resolve(DeleteBookService);

    await deleteBook.execute({ book_id });

    return response.json({ message: 'Deleted successfully' });
  }
}
