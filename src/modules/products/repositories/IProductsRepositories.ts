import { IProductsDTO } from '../dtos/productsDTO'
import { Products } from '../entities/products'

export interface IProductsRepositories{
  create(data:IProductsDTO): Promise<void>
  findByTitle(title: string): Promise<Products>
  listAllProducts(): Promise<Products[]>
  findById(id: string): Promise<Products>
  delete(id: string): Promise<void>
  // save(products: string): Promise<Products>
}
