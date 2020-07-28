import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddPublisherIdToBooks1595961559446
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'books',
      new TableColumn({
        name: 'publisher_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        name: 'BooksPublisher',
        columnNames: ['publisher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'publishers',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('books', 'BooksPublisher');
    await queryRunner.dropColumn('books', 'publisher_id');
  }
}
