import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import AuthorController from '../controllers/AuthorController';
import AuthorAvatarController from '../controllers/AuthorAvatarController';

const authorRouter = Router();
const upload = multer(uploadConfig.multer);
const authorsController = new AuthorController();
const authorsAvatarController = new AuthorAvatarController();

authorRouter.use(ensureAuthenticated);

authorRouter.get('/', authorsController.index);

authorRouter.get(
  '/:author_id',
  celebrate({
    [Segments.PARAMS]: {
      author_id: Joi.string().uuid(),
    },
  }),
  authorsController.show,
);

authorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  authorsController.create,
);

authorRouter.patch(
  '/:author_id/avatar',
  celebrate({
    [Segments.PARAMS]: {
      author_id: Joi.string().required(),
    },
  }),
  upload.single('avatar'),
  authorsAvatarController.update,
);

authorRouter.put(
  '/:author_id',
  celebrate({
    [Segments.PARAMS]: {
      author_id: Joi.string().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  authorsController.update,
);

authorRouter.delete(
  '/:author_id',
  celebrate({
    [Segments.PARAMS]: {
      author_id: Joi.string().uuid(),
    },
  }),
  authorsController.delete,
);

export default authorRouter;
