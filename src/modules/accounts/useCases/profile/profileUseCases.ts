/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IResponse{
  profile:{
   name: string,
   avatar: string,
   email: string
  }
}

@injectable()
export class ProfileUseCases {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute (id: string): Promise<IResponse> {
    const profile = await this.usersRepository.findByUser(id)

    if (!profile) {
      throw new AppError('User not found', 404)
    }

    const userProfile: IResponse = {
      profile: {
        name: profile.name,
        avatar: String(profile.avatar),
        email: profile.email
      }
    }

    return userProfile
  }
}
