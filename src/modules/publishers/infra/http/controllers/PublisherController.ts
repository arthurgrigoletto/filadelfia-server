import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPublisherService from '@modules/publishers/services/ListPublisherService';
import CreatePublisherService from '@modules/publishers/services/CreatePublisherService';
import UpdatePublisherService from '@modules/publishers/services/UpdatePublisherService';
import DeletePublisherService from '@modules/publishers/services/DeletePublisherService';
import ShowPublisherService from '@modules/publishers/services/ShowPublisherService';

export default class PublisherController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listPublishers = container.resolve(ListPublisherService);

    const publishers = await listPublishers.execute({
      user_id,
    });

    return response.json(classToClass(publishers, { groups: ['publishers'] }));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { publisher_id } = request.params;

    const showPublisher = container.resolve(ShowPublisherService);

    const publisher = await showPublisher.execute({ user_id, publisher_id });

    return response.json(classToClass(publisher, { groups: ['publishers'] }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createPublisher = container.resolve(CreatePublisherService);

    const publisher = await createPublisher.execute({
      name,
    });

    return response.json(classToClass(publisher, { groups: ['publishers'] }));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { publisher_id } = request.params;
    const { name } = request.body;

    const updatePublisher = container.resolve(UpdatePublisherService);

    const updatedPublisher = await updatePublisher.execute({
      publisher_id,
      name,
    });

    return response.json(
      classToClass(updatedPublisher, { groups: ['publishers'] }),
    );
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { publisher_id } = request.params;

    const deletePublisher = container.resolve(DeletePublisherService);

    await deletePublisher.execute(publisher_id);

    return response.json({ status: 'success', msg: 'Deleted with success' });
  }
}
