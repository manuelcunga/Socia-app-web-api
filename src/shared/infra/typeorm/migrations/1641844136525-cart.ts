import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class cart1641844136525 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'product_id',
            type: 'uuid'
          },
          {
            name: 'user_id',
            type: 'uuid'
          },

          {
            name: 'createdAt',
            type: 'date',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKUserPostProducts',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },
          {
            name: 'FKProduct',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          }
        ]

      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart')
  }
}
