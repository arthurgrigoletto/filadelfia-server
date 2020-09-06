import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import Book from '@modules/books/infra/typeorm/entities/Book';

@Entity('stock')
export default class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  book_id: string;

  @OneToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Expose({ groups: ['stock'] })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ groups: ['stock'] })
  @UpdateDateColumn()
  updated_at: Date;
}
