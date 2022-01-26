import crypto from 'crypto'
import multer from 'multer'
import { resolve } from 'path'
import { AppError } from '../shared/infra/http/error/AppError'

export default {

  upload (folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          if (!file) {
            throw new AppError('There is no file to upload.')
          } else {
            const fileHas = crypto.randomBytes(16).toString('hex')
            const fileName = `${fileHas} - ${file.originalname}`
            return callback(null, fileName)
          }
        }
      })
    }
  }
}
