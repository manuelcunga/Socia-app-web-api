import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('cart')
export class Cart {
  @PrimaryColumn()
  readonly id?: string

  @Column()
  product_id: string

  @Column()
  user_id: string

  constructor () {
    if (!this.id) { this.id = uuidv4() }
  }
}
