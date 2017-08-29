import * as multerS3 from 'multer-s3'
import { Request } from 'express'
import * as aws from 'aws-sdk'
const ext = require('file-extension')

export class MulterS3Adapter {
  public static createStorage (s3: aws.S3, bucketName: string, acl: string) {
    return multerS3({
      s3,
      bucket: bucketName,
      acl,
      metadata: (req: Request, file: Express.Multer.File, callback: Function) => {
        callback(null, { fieldName: file.fieldname } as any)
      },
      key: (req: Request, file: Express.Multer.File, callback) => {
        callback(null, +Date.now() + '.' + ext(file.originalname))
      }
    })
  }
}
