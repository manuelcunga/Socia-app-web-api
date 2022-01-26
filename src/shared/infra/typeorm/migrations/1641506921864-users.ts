import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class users1641506921864 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: false,
            isNullable: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
