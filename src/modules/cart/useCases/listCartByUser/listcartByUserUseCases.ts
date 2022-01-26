/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { Cart } from '../../../../modules/cart/entities/carts'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { ICartRepositories } from '../../repositories/ICartRepositories'

@injectable()
export class ListCartByUSerUseCases {
  constructor (
    @inject('CartRepository')
    private cartRepository: ICartRepositories
  ) {}

  async execute (user_id:string): Promise<Cart[]> {
    const findCartByUSer = await this.cartRepository.findByUser(user_id)

    if (!findCartByUSer) {
      throw new AppError('there is no product on your cart', 404)
    }
    return findCartByUSer
  }
}
