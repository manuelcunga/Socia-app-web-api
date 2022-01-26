import {
  Column, CreateDateColumn, Entity, JoinColumn,
  ManyToOne, PrimaryColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Users } from './users'

@Entity('users_tokens')
export class UserTokens {
  @PrimaryColumn()
  readonly id?: string

  @Column()
  refresh_token: string

  @Column()
  user_id: string

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user:Users

  @Column()
  expires_dates: Date

  @CreateDateColumn()
  createAt: Date

  constructor () {
    if (!this.id) { this.id = uuidv4() }
  }
}
