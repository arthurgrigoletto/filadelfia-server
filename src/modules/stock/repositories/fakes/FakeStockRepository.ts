import { uuid } from 'uuidv4';

import IStockRepository from '@modules/stock/repositories/IStockRepository';
import Stock from '@modules/stock/infra/typeorm/entities/Stock';

class FakeStockRepository implements IStockRepository {
  private stock: Stock[] = [];

  public async findBookStock(book_id: string): Promise<Stock | undefined> {
    const stock = this.stock.find(s => s.book_id === book_id);

    return stock;
  }

  public async create(book_id: string): Promise<Stock> {
    const stock = new Stock();

    Object.assign(stock, { id: uuid() }, { book_id });

    this.stock.push(stock);

    return stock;
  }

  public async save(stock: Stock): Promise<Stock> {
    const findIndex = this.stock.findIndex(
      findStock => findStock.book_id === stock.book_id,
    );

    this.stock[findIndex] = stock;

    return stock;
  }
}

export default FakeStockRepository;
