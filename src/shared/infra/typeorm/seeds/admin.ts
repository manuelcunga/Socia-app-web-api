import { hash } from 'bcryptjs'
import { getConnection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import createConection from '../index'

async function createAdminDefault () {
  const conection = await createConection()

  const connection = getConnection()
  const id = uuidv4()
  const password = await hash('manuel#@2020', 8)

  await connection.query(
    `INSERT INTO USERS(id,name,email,password,avatar,"isAdmin",
    "createdAt")
      values('${id}', 'Manuel Cunga','manuel@gmail.com', 
    '${password}','null', 'true','now()')`
  )

  await conection.close
}

createAdminDefault().then(() => console.log('criado com sucesso'))
