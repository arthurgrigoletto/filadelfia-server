import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import bookRouter from '@modules/books/infra/http/routes/books.routes';
import authorRouter from '@modules/authors/infra/http/routes/author.routes';
import categoryRouter from '@modules/categories/infra/http/routes/category.routes';
import publisherRouter from '@modules/publishers/infra/http/routes/publisher.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/books', bookRouter);
routes.use('/authors', authorRouter);
routes.use('/categories', categoryRouter);
routes.use('/publishers', publisherRouter);

export default routes;
