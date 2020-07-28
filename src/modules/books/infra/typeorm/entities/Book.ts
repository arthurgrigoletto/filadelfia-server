import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';

import uploadConfig from '@config/upload';
import Author from './Author';
import Category from './Category';
import Publisher from './Publisher';

@Entity('books')
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Expose({ groups: ['books'] })
  @Column()
  description: string;

  @Expose({ groups: ['books'] })
  @Column()
  pages: number;

  @Expose({ groups: ['books'] })
  @Column()
  year: number;

  @Expose({ groups: ['books'] })
  @Column()
  language: string;

  @Exclude()
  @Column()
  cover: string;

  @ManyToMany(() => Author, author => author.books, { cascade: true })
  @JoinTable({
    name: 'books_authors',
    joinColumn: { name: 'book_id' },
    inverseJoinColumn: { name: 'author_id' },
  })
  authors: Author[];

  @ManyToMany(() => Category, category => category.books, { cascade: true })
  @JoinTable({
    name: 'books_categories',
    joinColumn: { name: 'book_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Author[];

  @ManyToOne(() => Publisher, publisher => publisher.books)
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @Exclude()
  @Column()
  publisher_id: string;

  @Expose({ groups: ['books'] })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ groups: ['books'] })
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'cover_url' })
  getCoverUrl(): string | null {
    if (!this.cover) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.cover}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.cover}`;
      default:
        return null;
    }
  }
}

export default Book;
