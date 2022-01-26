import { getRepository, Repository } from 'typeorm'
import { IProductsDTO } from '../../dtos/productsDTO'
import { Products } from '../../entities/products'
import { IProductsRepositories } from '../IProductsRepositories'

export class ProductsRepositories implements IProductsRepositories {
  private repository: Repository<Products>

  constructor () {
    this.repository = getRepository(Products)
  }

  async create ({
    title,
    description,
    price,
    quantity,
    image,
    id_user
  }: IProductsDTO): Promise<void> {
    const products = this.repository.create({
      title,
      description,
      price,
      quantity,
      image,
      id_user
    })

    await this.repository.save(products)
  }

  async findByTitle (title: string): Promise<Products> {
    const result = await this.repository.findOne({ title })
    return result
  }

  async listAllProducts (): Promise<Products[]> {
    const listProducts = await this.repository.find()
    return listProducts
  }

  async findById (id: string): Promise<Products> {
    const result = await this.repository.findOne(id)
    return result
  }

  async delete (id: string): Promise<void> {
    await this.repository.delete(id)
  }
  // async save (products: string): Promise<Products> {
  //   return this.repository.save(products)
  // }
}
