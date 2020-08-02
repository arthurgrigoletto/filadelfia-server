import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PublisherController from '../controllers/PublisherController';

const publisherRouter = Router();
const publisherController = new PublisherController();

publisherRouter.use(ensureAuthenticated);

publisherRouter.get('/', publisherController.index);

publisherRouter.get(
  '/:publisher_id',
  celebrate({
    [Segments.PARAMS]: {
      publisher_id: Joi.string().uuid(),
    },
  }),
  publisherController.show,
);

publisherRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  publisherController.create,
);

publisherRouter.patch(
  '/:publisher_id',
  celebrate({
    [Segments.PARAMS]: {
      publisher_id: Joi.string().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  publisherController.update,
);

publisherRouter.delete(
  '/:publisher_id',
  celebrate({
    [Segments.PARAMS]: {
      publisher_id: Joi.string().uuid(),
    },
  }),
  publisherController.delete,
);

export default publisherRouter;
