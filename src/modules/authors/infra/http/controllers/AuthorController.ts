import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAuthorService from '@modules/authors/services/ListAuthorService';
import CreateAuthorService from '@modules/authors/services/CreateAuthorService';
import UpdateAuthorService from '@modules/authors/services/UpdateAuthorService';
import DeleteAuthorService from '@modules/authors/services/DeleteAuthorService';
import ShowAuthorService from '@modules/authors/services/ShowAuthorService';

export default class AuthorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listAuthors = container.resolve(ListAuthorService);

    const authors = await listAuthors.execute({
      user_id,
    });

    return response.json(classToClass(authors, { groups: ['authors'] }));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { author_id } = request.params;

    const showAuthor = container.resolve(ShowAuthorService);

    const author = await showAuthor.execute({ user_id, author_id });

    return response.json(classToClass(author, { groups: ['authors'] }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createAuthor = container.resolve(CreateAuthorService);

    const author = await createAuthor.execute(name);

    return response.json(classToClass(author, { groups: ['authors'] }));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { author_id } = request.params;
    const { name } = request.body;

    const updateAuthor = container.resolve(UpdateAuthorService);

    const updatedAuthor = await updateAuthor.execute({ author_id, name });

    return response.json(classToClass(updatedAuthor, { groups: ['authors'] }));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { author_id } = request.params;

    const deleteAuthor = container.resolve(DeleteAuthorService);

    await deleteAuthor.execute(author_id);

    return response.json({ status: 'success', msg: 'Deleted with success' });
  }
}
