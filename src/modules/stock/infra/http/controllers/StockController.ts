import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindBookStockService from '@modules/stock/services/FindBookStockService';
import UpdateBookStockService from '@modules/stock/services/UpdateBookStockService';

export default class StockController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { book_id } = request.params;

    const findBookStock = container.resolve(FindBookStockService);

    const stock = await findBookStock.execute({ book_id, user_id });

    return response.json(classToClass(stock, { groups: ['stock'] }));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { book_id } = request.params;
    const { quantity } = request.body;

    const updateBookStock = container.resolve(UpdateBookStockService);

    const stock = await updateBookStock.execute({ book_id, quantity });

    return response.json(classToClass(stock, { groups: ['stock'] }));
  }
}
