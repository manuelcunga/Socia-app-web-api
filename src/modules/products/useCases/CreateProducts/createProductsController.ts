import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProductsUsecases } from './createProductsUseCases'

export class CreateProductController {
  async handle (request: Request, response: Response) {
    const { title, description, price, quantity } = request.body
    const { id } = request.user

    const { destination: image } = request.file

    const productUsecases = container.resolve(CreateProductsUsecases)

    await productUsecases.execute({
      title,
      description,
      price,
      quantity,
      image,
      id_user: id
    })

    return response.json({ message: 'Products Created succesfull' })
  }
}
