import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AuthorController from '../controllers/AuthorController';

const bookRouter = Router();
const booksController = new AuthorController();

bookRouter.use(ensureAuthenticated);

bookRouter.get('/', booksController.index);

bookRouter.get(
  '/:author_id',
  celebrate({
    [Segments.PARAMS]: {
      author_id: Joi.string().uuid(),
    },
  }),
  booksController.show,
);

bookRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  booksController.create,
);

bookRouter.put(
  '/:author_id',
  celebrate({
    [Segments.PARAMS]: {
      author_id: Joi.string().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  booksController.update,
);

bookRouter.delete(
  '/:author_id',
  celebrate({
    [Segments.PARAMS]: {
      author_id: Joi.string().uuid(),
    },
  }),
  booksController.delete,
);

export default bookRouter;
