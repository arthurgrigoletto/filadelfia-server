import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';

import uploadConfig from '@config/upload';
import Book from '@modules/books/infra/typeorm/entities/Book';

@Entity('authors')
class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  avatar: string;

  @ManyToMany(() => Book, book => book.authors)
  books: Book[];

  @Expose({ groups: ['authors'] })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ groups: ['authors'] })
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getCoverUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default Author;
