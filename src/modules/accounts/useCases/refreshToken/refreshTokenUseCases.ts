/* eslint-disable no-useless-constructor */
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import auth from '../../../../config/auth'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { ITokensRepository } from '../../repositories/ITokensRepository'

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefrashTokenUseCases {
  constructor (
    @inject('userTokenRepository')
    private refrashtokenRrepository: ITokensRepository
  ) {}

  async execute (token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(
      token,
      auth.secreate_refresh_token
    ) as IPayload
    const user_id = sub

    const userToken =
      await this.refrashtokenRrepository.findUserByIdAndRefrashToken(
        user_id,
        token
      )

    if (!userToken) {
      throw new AppError('Refresh token does not exists!')
    }

    await this.refrashtokenRrepository.deleteById(String(userToken.id))

    const {
      secreate_refresh_token,
      expire_in_refrestoken,
      expire_date_refresh_token
    } = auth

    const refresh_token = sign({ email }, secreate_refresh_token, {
      subject: sub,
      expiresIn: expire_in_refrestoken
    })

    await this.refrashtokenRrepository.create({
      user_id,
      expires_dates: expire_date_refresh_token,
      refresh_token
    })

    const newToken = sign({ email }, secreate_refresh_token, {
      subject: user_id,
      expiresIn: expire_in_refrestoken
    })

    return {
      refresh_token,
      token: newToken
    }
  }
}
