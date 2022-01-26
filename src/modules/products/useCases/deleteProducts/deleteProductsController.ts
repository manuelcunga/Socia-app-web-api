import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteProductsUseCases } from './deleteProductsUseCases'

export class DeleteProductController {
  async handle (request:Request, response:Response): Promise<Response> {
    const { id } = request.params

    const deleteProductUseCases = container.resolve(DeleteProductsUseCases)
    await deleteProductUseCases.execute(id)

    return response.json({ message: 'Deleted product successfull.' })
  }
}
