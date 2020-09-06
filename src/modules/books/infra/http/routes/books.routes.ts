import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BooksController from '../controllers/BooksController';

const bookRouter = Router();
const booksController = new BooksController();

bookRouter.use(ensureAuthenticated);

bookRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string(),
      author: Joi.string(),
      publisher: Joi.string(),
      category: Joi.string(),
    },
  }),
  booksController.index,
);

bookRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      author_ids: Joi.array().items(Joi.string().uuid()).required(),
      category_ids: Joi.array().items(Joi.string().uuid()).required(),
      language: Joi.string().required(),
      publisher_id: Joi.string().uuid().required(),
      year: Joi.number().required(),
      pages: Joi.number().required(),
    },
  }),
  booksController.create,
);

bookRouter.put(
  '/:book_id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      authors: Joi.array().items(Joi.string().uuid()).required(),
      category: Joi.string().required(),
      language: Joi.string().required(),
      publisher: Joi.string().required(),
      year: Joi.number().required(),
      pages: Joi.number().required(),
    },
  }),
  booksController.update,
);

bookRouter.delete(
  '/:book_id',
  celebrate({
    [Segments.PARAMS]: {
      book_id: Joi.string().required(),
    },
  }),
  booksController.delete,
);

export default bookRouter;
