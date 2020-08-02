import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Expose } from 'class-transformer';

import Book from '@modules/books/infra/typeorm/entities/Book';

@Entity('publishers')
export default class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Book, book => book.publisher)
  books: Book[];

  @Expose({ groups: ['publishers'] })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ groups: ['publishers'] })
  @UpdateDateColumn()
  updated_at: Date;
}
