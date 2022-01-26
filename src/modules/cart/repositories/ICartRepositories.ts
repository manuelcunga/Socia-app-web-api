import { ICartDTOS } from '../dtos/cartDTO'
import { Cart } from '../entities/carts'

export interface ICartRepositories{
  create(data: ICartDTOS): Promise<void>
  findById(id: string): Promise<Cart | undefined>
  listAll(): Promise<Cart[]>
  findByUser(user_id: string):Promise<Cart[]>
}
