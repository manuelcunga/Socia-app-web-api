import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RefrashTokenUseCases } from './refreshTokenUseCases'

export class RefrashTokenController {
  async handle (request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    const refrashToken = container.resolve(RefrashTokenUseCases)

    const refrash_Toke = await refrashToken.execute(token)

    return response.json(refrash_Toke)
  }
}
