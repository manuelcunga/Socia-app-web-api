import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AddProductToCart } from './AddProductToCartUseCases'

export class AddProductToCartController {
  async handle (request:Request, response: Response):Promise<Response> {
    const { product_id } = request.body
    const { id } = request.user

    const cartUseCases = container.resolve(AddProductToCart)

    await cartUseCases.execute({ product_id, user_id: id })

    return response.json({ message: 'Product add successfull' })
  }
}
