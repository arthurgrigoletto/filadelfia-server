import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAuthorIdToBooksAuthors1595939755285
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'books_authors',
      new TableColumn({
        name: 'author_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'books_authors',
      new TableForeignKey({
        name: 'BooksAuthorsAuthor',
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'authors',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('books_authors', 'BooksAuthorsAuthor');
    await queryRunner.dropColumn('books_authors', 'author_id');
  }
}
