import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('users')
export class Users {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  avatar?: string

  @Column()
  isAdmin: boolean

  @CreateDateColumn()
  createdAt: Date

  constructor () {
    if (!this.id) { this.id = uuidv4() }
  }
}
