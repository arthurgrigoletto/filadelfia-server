import Publisher from '../infra/typeorm/entities/Publisher';

export default interface IPublisherRepository {
  find(): Promise<Publisher[]>;
  findById(id: string): Promise<Publisher | undefined>;
  findByIds(ids: string[]): Promise<Publisher[]>;
  findByName(name: string): Promise<Publisher | undefined>;
  create(name: string): Promise<Publisher>;
  save(publisher: Publisher): Promise<Publisher>;
}
