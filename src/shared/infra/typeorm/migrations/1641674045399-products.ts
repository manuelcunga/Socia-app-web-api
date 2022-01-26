import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class products1641674045399 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true
            },
            {
              name: 'title',
              type: 'varchar'
            },
            {
              name: 'description',
              type: 'varchar'
            },
            {
              name: 'price',
              type: 'float'
            },
            {
              name: 'quantity',
              type: 'int'
            },
            {
              name: 'image',
              type: 'varchar'

            },
            {
              name: 'id_user',
              type: 'uuid'
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'now()'
            }

          ],
          foreignKeys: [
            {
              name: 'FKUserPostProducts',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['id_user'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL'
            }
          ]
        }
      )
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
