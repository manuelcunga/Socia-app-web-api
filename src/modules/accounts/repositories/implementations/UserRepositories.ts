import { getRepository, Repository } from 'typeorm'
import { IUsersDTO } from '../../dtos/UsersDTO'
import { Users } from '../../entities/users'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepositories implements IUsersRepository {
  private repository: Repository<Users>

  constructor () {
    this.repository = getRepository(Users)
  }

  async create ({
    name,
    email,
    password,
    avatar
  }: IUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      avatar
    })

    await this.repository.save(user)
  }

  async findByEmail (email: string): Promise<Users> {
    const result = await this.repository.findOne({ email })
    return result
  }

  async findByUser (id: string): Promise<Users> {
    const user = await this.repository.findOne(id)
    return user
  }
}
