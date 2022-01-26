import { getRepository, Repository } from 'typeorm'
import { ICartDTOS } from '../../dtos/cartDTO'
import { Cart } from '../../entities/carts'
import { ICartRepositories } from '../ICartRepositories'

export class CartRepositories implements ICartRepositories {
  private repository: Repository<Cart>

  constructor () {
    this.repository = getRepository(Cart)
  }

  async create ({ id, product_id, user_id }: ICartDTOS): Promise<void> {
    const cart = this.repository.create({ id, product_id, user_id })
    await this.repository.save(cart)
  }

  async findById (id: string): Promise<Cart | undefined> {
    const result = await this.repository.findOne(id)
    return result
  }

  async listAll (): Promise<Cart[]> {
    const carts = await this.repository.find()
    return carts
  }

  async findByUser (user_id: string): Promise<Cart[]> {
    const carts = await this.repository.find({
      user_id
    })

    return carts
  }
}
