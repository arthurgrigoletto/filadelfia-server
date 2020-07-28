import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Expose } from 'class-transformer';

import Book from './Book';

@Entity('categories')
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Book, book => book.categories)
  books: Book[];

  @Expose({ groups: ['categories'] })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ groups: ['categories'] })
  @UpdateDateColumn()
  updated_at: Date;
}
