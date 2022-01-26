import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllProductsUseCases } from './listAllProductsUsecases'

export class ListAllProductsController {
  async handle (request: Request, response:Response): Promise<Response> {
    const productsUseCases = container.resolve(ListAllProductsUseCases)

    const result = await productsUseCases.execute()
    return response.json(result)
  }
}
