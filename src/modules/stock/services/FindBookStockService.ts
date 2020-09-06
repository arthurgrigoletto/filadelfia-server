import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import Stock from '../infra/typeorm/entities/Stock';
import IStockRepository from '../repositories/IStockRepository';

interface IRequest {
  user_id: string;
  book_id: string;
}

@injectable()
export default class FindBookStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ book_id, user_id }: IRequest): Promise<Stock> {
    const cacheKey = `stock-show:${user_id}:${book_id}`;

    // let stock = await this.cacheProvider.recover<Stock>(cacheKey);
    let stock;

    if (!stock) {
      stock = await this.stockRepository.findBookStock(book_id);

      if (!stock) {
        throw new AppError('Cannot find stock for this book');
      }

      await this.cacheProvider.save(cacheKey, stock);
    }

    return stock;
  }
}
