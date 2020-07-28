import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PublisherController from '../controllers/PublisherController';

const publisherRouter = Router();
const publisherController = new PublisherController();

publisherRouter.use(ensureAuthenticated);

publisherRouter.get('/', publisherController.index);

publisherRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  publisherController.create,
);

export default publisherRouter;
