import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCases } from './createUserUseCases'

export class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserUseCases = container.resolve(CreateUserUseCases)

    await createUserUseCases.execute({ name, email, password })
    return response.json({ success: 'User Created Successfull.' })
  }
}
