import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCartByUSerUseCases } from './listcartByUserUseCases'

export class ListCartByUserController {
  async handle (request:Request, response: Response): Promise<Response> {
    const { id } = request.user

    const listcartByUSerUseCases = container.resolve(ListCartByUSerUseCases)

    const carts = await listcartByUSerUseCases.execute(id)
    return response.json(carts)
  }
}
