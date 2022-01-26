import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../../../../config/upload'
import { CreateUserController } from '../../../../modules/accounts/useCases/CreateUser/createUserController'
import { ProfileController } from '../../../../modules/accounts/useCases/profile/profileController'
import { UpdateUserAvatController } from '../../../../modules/accounts/useCases/upadateAvatar/updateAvatarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const userRouter = Router()
const createUserController = new CreateUserController()
const profileController = new ProfileController()
const updateUserAvatar = new UpdateUserAvatController()
const userAvatar = multer(multerConfig.upload('./temp/avatar'))

userRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
      password: Joi.string().trim().required()
    }
  }),
  createUserController.handle
)

userRouter.get('/profile', ensureAuthenticated, profileController.handle)

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  userAvatar.single('avatar'),
  updateUserAvatar.handle
)

export { userRouter }
