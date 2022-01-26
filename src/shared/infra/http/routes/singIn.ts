import { Router } from 'express'
import { RefrashTokenController } from '../../../../modules/accounts/useCases/refreshToken/refreshTokenController'
import { AuthenticationsController } from '../../../../modules/accounts/useCases/suthentications/authenticationsController'
const session = Router()

const authenticationController = new AuthenticationsController()
const refrashTokenController = new RefrashTokenController()

session.post('/', authenticationController.handle)
session.post('/refrash-token', refrashTokenController.handle)

export { session }
