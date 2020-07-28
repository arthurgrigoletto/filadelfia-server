import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPublisherService from '@modules/books/services/ListPublisherService';
import CreatePublisherService from '@modules/books/services/CreatePublisherService';

export default class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listPublishers = container.resolve(ListPublisherService);

    const publishers = await listPublishers.execute({
      user_id,
    });

    return response.json(classToClass(publishers, { groups: ['publishers'] }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createPublisher = container.resolve(CreatePublisherService);

    const publisher = await createPublisher.execute({
      name,
    });

    return response.json(classToClass(publisher, { groups: ['publishers'] }));
  }
}
