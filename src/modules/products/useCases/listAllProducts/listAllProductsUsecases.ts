/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { Products } from '../../entities/products'
import { IProductsRepositories } from '../../repositories/IProductsRepositories'

@injectable()
export class ListAllProductsUseCases {
  constructor (
    @inject('ProductsRepository')
    private productsRepository: IProductsRepositories
  ) {}

  async execute (): Promise<Products []> {
    const allProducts = await this.productsRepository.listAllProducts()
    return allProducts
  }
}
