import { ITokenDTO } from '../dtos/TokensDTO'
import { UserTokens } from '../entities/usersTokens'

export interface ITokensRepository{
  create(data: ITokenDTO): Promise<UserTokens>
  findUserByIdAndRefrashToken(user_id: string,
    refresh_token:string): Promise<UserTokens>
    deleteById(id: string): Promise<void>
}
