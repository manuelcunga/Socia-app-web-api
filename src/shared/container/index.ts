import { container } from 'tsyringe'
import { TokenRepositories } from '../../modules/accounts/repositories/implementations/TokensRepositories'
import { UsersRepositories } from '../../modules/accounts/repositories/implementations/UserRepositories'
import { ITokensRepository } from '../../modules/accounts/repositories/ITokensRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ICartRepositories } from '../../modules/cart/repositories/ICartRepositories'
import { CartRepositories } from '../../modules/cart/repositories/implementations/CartRepositories'
import { ProductsRepositories } from '../../modules/products/repositories/implementations/productsRepositories'
import { IProductsRepositories } from '../../modules/products/repositories/IProductsRepositories'

container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepositories
)

container.registerSingleton<IProductsRepositories>(
  'ProductsRepository', ProductsRepositories

)

container.registerSingleton<ICartRepositories>(
  'CartRepository', CartRepositories
)

container.registerSingleton<ITokensRepository>(
  'userTokenRepository', TokenRepositories
)
