/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { IProductsDTO } from '../../dtos/productsDTO'
import { IProductsRepositories } from '../../repositories/IProductsRepositories'

@injectable()
export class UpdateProductsUseCases {
  constructor (
    @inject('ProductsRepository')
    private productsRepository: IProductsRepositories
  ) {}

  async execute ({
    id,
    title,
    description,
    price,
    quantity,
    image,
    id_user
  }:IProductsDTO):Promise<void> {
    const products = await this.productsRepository.findById(id)

    if (!products) {
      throw new AppError('Products not found', 404)
    }

    products.title = title
    products.description = description
    products.price = price
    products.quantity = quantity
    products.image = image

    return this.productsRepository.create(products)
  }
}
