import { NextFunction, Request, Response } from 'express'
import { UsersRepositories } from '../../../../modules/accounts/repositories/implementations/UserRepositories'

export async function ensureAdmin (
  request:Request, response:Response, next:NextFunction
) {
  const adminLogado = request.user.id

  const userRepositories = new UsersRepositories()
  const users = await userRepositories.findByUser(adminLogado)

  if (!users.isAdmin) {
    throw new Error('User is not admin!')
  }

  return next()
}
