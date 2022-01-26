import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ProfileUseCases } from './profileUseCases'

export class ProfileController {
  async handle (request:Request, response:Response) {
    const profileUsecases = container.resolve(ProfileUseCases)
    const { id } = request.user

    const result = await profileUsecases.execute(id)
    return response.json(result)
  }
}
