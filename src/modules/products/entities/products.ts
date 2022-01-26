import {
  Column, CreateDateColumn,
  Entity, JoinColumn, ManyToOne, PrimaryColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Users } from '../../accounts/entities/users'

@Entity('products')
export class Products {
  @PrimaryColumn()
  readonly id?: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  quantity: number

  @Column()
  image: string

  @Column()
  id_user: string

  @JoinColumn({ name: 'id_user' })
  @ManyToOne(() => Users)
  userPost: Users

  @CreateDateColumn()
  createdAt: Date

  constructor () {
    if (!this.id) { this.id = uuidv4() }
  }
}
