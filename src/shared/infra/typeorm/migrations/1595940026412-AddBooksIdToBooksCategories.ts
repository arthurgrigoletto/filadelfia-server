import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddBooksIdToBooksCategories1595940026412
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'books_categories',
      new TableColumn({
        name: 'book_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'books_categories',
      new TableForeignKey({
        name: 'BooksCategoriesBook',
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('books_categories', 'BooksCategoriesBook');
    await queryRunner.dropColumn('books_categories', 'book_id');
  }
}
