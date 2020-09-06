import Stock from '../infra/typeorm/entities/Stock';

export default interface IPublisherRepository {
  findBookStock(book_id: string): Promise<Stock | undefined>;
  create(book_id: string, quantity?: number): Promise<Stock>;
  save(publisher: Stock): Promise<Stock>;
}
