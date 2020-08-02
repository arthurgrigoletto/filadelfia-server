import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoryController from '../controllers/CategoryController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.use(ensureAuthenticated);

categoryRouter.get('/', categoryController.index);

categoryRouter.get(
  '/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().uuid(),
    },
  }),
  categoryController.show,
);

categoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoryController.create,
);

categoryRouter.patch(
  '/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoryController.update,
);

categoryRouter.delete(
  '/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().uuid(),
    },
  }),
  categoryController.delete,
);

export default categoryRouter;
