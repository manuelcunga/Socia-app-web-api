import { Router } from 'express'
import { cart } from './carts'
import { products } from './products'
import { session } from './singIn'
import { userRouter } from './users.router'

const router = Router()

router.get('/', (request, response) => {
  response.json({ success: 'Bem vindo ano Luckdube Streaming' })
})

router.use('/users', userRouter)
router.use('/login', session)
router.use('/product', products)
router.use('/cart', cart)

export { router }

