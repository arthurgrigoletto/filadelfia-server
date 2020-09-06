import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StockController from '../controllers/StockController';

const stockRouter = Router();
const stockController = new StockController();

stockRouter.use(ensureAuthenticated);

stockRouter.get(
  '/:book_id',
  celebrate({ [Segments.PARAMS]: { book_id: Joi.string().uuid().required() } }),
  stockController.show,
);

stockRouter.put(
  '/:book_id',
  celebrate({
    [Segments.BODY]: { quantity: Joi.number().required() },
    [Segments.PARAMS]: { book_id: Joi.string().uuid().required() },
  }),
  stockController.update,
);

export default stockRouter;
