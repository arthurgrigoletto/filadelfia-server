import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import Stock from '../infra/typeorm/entities/Stock';
import IStockRepository from '../repositories/IStockRepository';

interface IRequest {
  quantity: number;
  book_id: string;
}

@injectable()
export default class UpdateBookStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ book_id, quantity }: IRequest): Promise<Stock> {
    const stock = await this.stockRepository.findBookStock(book_id);

    if (!stock) {
      throw new AppError('Cannot find stock for this book');
    }

    if (quantity < 0) {
      throw new AppError('You cannot set this quantity');
    }

    stock.quantity = quantity;

    await this.cacheProvider.invalidatePrefix('stock-show');

    return this.stockRepository.save(stock);
  }
}
