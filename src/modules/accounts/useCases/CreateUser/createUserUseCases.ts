/* eslint-disable no-useless-constructor */
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { IUsersDTO } from '../../dtos/UsersDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
export class CreateUserUseCases {
  constructor (
    @inject('UsersRepository')
    private usersRepositories: IUsersRepository
  ) {}

  async execute ({ name, email, password }:IUsersDTO) : Promise<void> {
    const userAlreadyExist = await this.usersRepositories.findByEmail(email)

    if (userAlreadyExist) {
      throw new AppError('User already exists.')
    }

    const passwordHas = await hash(password, 8)

    await this.usersRepositories.create({ name, email, password: passwordHas })
  }
}
