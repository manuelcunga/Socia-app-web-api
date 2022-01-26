import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticationsUseCases } from './authenticationsUseCases'

export class AuthenticationsController {
  async handle (request:Request, response: Response) {
    const { email, password } = request.body

    const authenticateUseCases = container.resolve(AuthenticationsUseCases)
    const token = await authenticateUseCases.execute({ email, password })

    return response.json(token)
  }
}
