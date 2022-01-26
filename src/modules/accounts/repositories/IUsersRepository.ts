import { IUsersDTO } from '../dtos/UsersDTO'
import { Users } from '../entities/users'

export interface IUsersRepository{
  create(data:IUsersDTO): Promise<void>
  findByEmail(email: string): Promise<Users>
  findByUser(id: string): Promise<Users>
}
