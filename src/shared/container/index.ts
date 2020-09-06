import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository';

import IAuthorRepository from '@modules/authors/repositories/IAuthorRepository';
import AuthorRepository from '@modules/authors/infra/typeorm/repositories/AuthorRepository';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import CategoryRepository from '@modules/categories/infra/typeorm/repositories/CategoryRepository';

import IPublisherRepository from '@modules/publishers/repositories/IPublisherRepository';
import PublisherRepository from '@modules/publishers/infra/typeorm/repositories/PublisherRepository';

import IStockRepository from '@modules/stock/repositories/IStockRepository';
import StockRepository from '@modules/stock/infra/typeorm/repositories/StockRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
);

container.registerSingleton<IAuthorRepository>(
  'AuthorRepository',
  AuthorRepository,
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IPublisherRepository>(
  'PublisherRepository',
  PublisherRepository,
);

container.registerSingleton<IStockRepository>(
  'StockRepository',
  StockRepository,
);
