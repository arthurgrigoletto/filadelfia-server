import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAuthorService from '@modules/books/services/ListAuthorService';
import CreateAuthorService from '@modules/books/services/CreateAuthorService';

export default class AuthorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listAuthors = container.resolve(ListAuthorService);

    const authors = await listAuthors.execute({
      user_id,
    });

    return response.json(classToClass(authors, { groups: ['authors'] }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createAuthor = container.resolve(CreateAuthorService);

    const author = await createAuthor.execute({
      name,
    });

    return response.json(classToClass(author, { groups: ['authors'] }));
  }
}
