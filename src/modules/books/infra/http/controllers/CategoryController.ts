import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListCategoryService from '@modules/books/services/ListCategoryService';
import CreateCategoryService from '@modules/books/services/CreateCategoryService';

export default class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listCategories = container.resolve(ListCategoryService);

    const authors = await listCategories.execute({
      user_id,
    });

    return response.json(classToClass(authors, { groups: ['categories'] }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const author = await createCategory.execute({
      name,
    });

    return response.json(classToClass(author, { groups: ['categories'] }));
  }
}
