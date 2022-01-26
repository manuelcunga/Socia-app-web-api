/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { IProductsRepositories } from '../../repositories/IProductsRepositories'

@injectable()
export class DeleteProductsUseCases {
  constructor (
    @inject('ProductsRepository')
    private productRepository: IProductsRepositories
  ) {}

  async execute (id: string) {
    const checkIfExist = await this.productRepository.findById(id)

    if (!checkIfExist) {
      throw new AppError('The user ID provided does not exist.')
    }

    await this.productRepository.delete(id)
  }
}
