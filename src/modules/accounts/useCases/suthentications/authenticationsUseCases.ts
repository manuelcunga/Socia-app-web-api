/* eslint-disable no-useless-constructor */
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import auth from '../../../../config/auth'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { ITokensRepository } from '../../repositories/ITokensRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest{
  email: string
  password: string
}

interface IResponse{
  user:{
    name: string
    email: string
  },
  token: string,
  refresh_token: string
}

@injectable()
export class AuthenticationsUseCases {
  constructor (
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('userTokenRepository')
    private userTokenRepository: ITokensRepository
  ) {}

  async execute ({ email, password }:IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }
    const {
      secreate_token, expire_in_Token,
      secreate_refresh_token, expire_in_refrestoken,
      expire_date_refresh_token
    } = auth

    const token = sign({}, secreate_token, {
      subject: user.id,
      expiresIn: expire_in_Token
    })

    const refresh_token = sign({ email }, secreate_refresh_token, {
      subject: user.id,
      expiresIn: expire_in_refrestoken

    })

    await this.userTokenRepository.create({
      user_id: user.id,
      expires_dates: expire_date_refresh_token,
      refresh_token
    })

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    }
    return tokenReturn
  }
}
