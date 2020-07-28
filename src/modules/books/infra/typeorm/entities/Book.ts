import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
import Author from './Author';

@Entity('books')
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  publisher: string;

  @Column()
  description: string;

  @Column()
  pages: number;

  @Column()
  year: number;

  @Column()
  language: string;

  @Column()
  cover: string;

  @ManyToMany(() => Author)
  @JoinTable()
  authors: Author[];

  @CreateDateColumn()
  created_at: Date;

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
