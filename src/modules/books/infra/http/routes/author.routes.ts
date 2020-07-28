import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AuthorController from '../controllers/AuthorController';

const bookRouter = Router();
const booksController = new AuthorController();

bookRouter.use(ensureAuthenticated);

bookRouter.get('/', booksController.index);

bookRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  booksController.create,
);

export default bookRouter;
