import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListCategoryService from '@modules/categories/services/ListCategoryService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import ShowCategoryService from '@modules/categories/services/ShowCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listCategories = container.resolve(ListCategoryService);

    const authors = await listCategories.execute({
      user_id,
    });

    return response.json(classToClass(authors, { groups: ['categories'] }));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { category_id } = request.params;

    const showCategory = container.resolve(ShowCategoryService);

    const category = await showCategory.execute({ user_id, category_id });

    return response.json(classToClass(category, { groups: ['categories'] }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name,
    });

    return response.json(classToClass(category, { groups: ['categories'] }));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const { name } = request.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    const updatedCategory = await updateCategory.execute({ category_id, name });

    return response.json(
      classToClass(updatedCategory, { groups: ['categories'] }),
    );
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute(category_id);

    return response.json({ status: 'success', msg: 'Deleted with success' });
  }
}
