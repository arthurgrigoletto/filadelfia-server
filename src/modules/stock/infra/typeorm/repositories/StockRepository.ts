import { getRepository, Repository } from 'typeorm';

import IStockRepository from '@modules/stock/repositories/IStockRepository';

import Stock from '../entities/Stock';

class StockRepository implements IStockRepository {
  private ormRepository: Repository<Stock>;

  constructor() {
    this.ormRepository = getRepository(Stock);
  }

  public async findBookStock(book_id: string): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne({
      where: { book_id },
    });

    return stock;
  }

  public async create(book_id: string, quantity?: number): Promise<Stock> {
    const category = this.ormRepository.create({
      book_id,
      quantity,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(stock: Stock): Promise<Stock> {
    return this.ormRepository.save(stock);
  }
}

export default StockRepository;
