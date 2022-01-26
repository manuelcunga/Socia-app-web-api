/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { ICartDTOS } from '../../dtos/cartDTO'
import { ICartRepositories } from '../../repositories/ICartRepositories'

@injectable()
export class AddProductToCart {
  constructor (
    @inject('CartRepository')
    private cartRepository: ICartRepositories

  ) {}

  async execute ({ user_id, product_id }:ICartDTOS) {
    const checkIfAlreadyExists = await this.cartRepository.findById(product_id)

    if (checkIfAlreadyExists) {
      throw new AppError('Ups, this product already on cart. ')
    }

    await this.cartRepository.create({ product_id, user_id })
  }
}
