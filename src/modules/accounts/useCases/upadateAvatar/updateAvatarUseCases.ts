/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../../modules/accounts/repositories/IUsersRepository'
import { deleFile } from '../../../../utils/file'

interface IRequest{
  user_id: string
  avatar_file: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute ({ user_id, avatar_file }:IRequest): Promise<void> {
    const user = await this.userRepository.findByUser(user_id)

    if (user.avatar) {
      await deleFile(`./temp/avatar${user.avatar}`)
    }

    user.avatar = avatar_file

    this.userRepository.create(user)
  }
}
