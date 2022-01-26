import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarUseCase } from './updateAvatarUseCases'

export class UpdateUserAvatController {
  async handle (request:Request, response:Response) : Promise<Response> {
    const { id } = request.user

    const avatar_file = String(request.file?.filename)
    const updateAvatarUsecases = container.resolve(UpdateUserAvatarUseCase)

    await updateAvatarUsecases.execute({ user_id: id, avatar_file })
    return response.status(201).json({ message: 'Upload succesfull' })
  }
}
