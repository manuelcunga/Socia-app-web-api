import { getRepository, Repository } from 'typeorm';
import { ITokenDTO } from '../../../../modules/accounts/dtos/TokensDTO';
import { UserTokens } from '../../entities/usersTokens';
import { ITokensRepository } from '../ITokensRepository';

export class TokenRepositories implements ITokensRepository {
  private respository: Repository<UserTokens>;

  constructor () {
    this.respository = getRepository(UserTokens)
  }

  async create ({
    user_id,
    expires_dates,
    refresh_token
  }: ITokenDTO): Promise<UserTokens> {
    const userToken = this.respository.create({
      user_id,
      expires_dates,
      refresh_token
    })

    await this.respository.save(userToken)

    return userToken
  }

  async findUserByIdAndRefrashToken (
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userTokens = await this.respository.findOne({
      user_id,
      refresh_token
    })

    return userTokens
  }

  async deleteById (id: string): Promise<void> {
    await this.respository.delete(id)
  }
}
