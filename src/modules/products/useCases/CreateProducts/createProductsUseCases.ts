/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/http/error/AppError'
import { IProductsDTO } from '../../dtos/productsDTO'
import { IProductsRepositories } from '../../repositories/IProductsRepositories'

@injectable()
export class CreateProductsUsecases {
  constructor (
    @inject('ProductsRepository')
    private productsRepository: IProductsRepositories
  ) {}

  async execute ({
    title,
    description,
    price,
    quantity,
    image,
    id_user
  }:IProductsDTO):Promise<void> {
    const checkIfAlreadyExist = await this.productsRepository.findByTitle(title)

    if (checkIfAlreadyExist) {
      throw new AppError('Products already exists!')
    }

    // if (checkIfAlreadyExist.image) {
    //   await deleFile(`.temp/products/${checkIfAlreadyExist.image}`)
    // }
    await this.productsRepository.create({
      title,
      description,
      price,
      quantity,
      image,
      id_user
    })
  }
}
