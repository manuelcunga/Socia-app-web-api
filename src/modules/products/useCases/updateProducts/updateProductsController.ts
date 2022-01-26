import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProductsUseCases } from './updateProductsUseCases'

export class UpdateProductControllers {
  async handle (request: Request, response: Response) {
    const { title, description, price, quantity } = request.body
    const { id } = request.user
    const products_id = request.params.id

    const { destination: image } = request.file

    const productUsecases = container.resolve(UpdateProductsUseCases)

    await productUsecases.execute({
      id: products_id,
      title,
      description,
      price,
      quantity,
      image,
      id_user: id
    })

    return response.json({ message: 'Update Products succesfull' })
  }
}
