// const { HOST, USER_NAME, DB_NAME, PASSWORD, PORT } = process.env

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'Docker',
  password: 'docker',
  database: 'socia',
  entities: [
    './src/modules/**/entities/*.ts'],
  migrations: [
    './src/shared/infra/typeorm/migrations/*.ts'
  ],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations/'
  }
}
