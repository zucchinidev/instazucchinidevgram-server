import { RequestHandler, Request, Response } from 'express'
import { MulterS3Adapter } from '../Persistence/MulterS3Adapter'
import { S3FactoryClient } from '../Persistence/S3FactoryClient'
import { config } from '../../config'
import { MulterMiddleware } from '../Middlewares/MulterMiddleware'

export class PictureController {
  static uploadPicture (): RequestHandler {
    return (req: Request, res: Response) => {
      const storage = MulterS3Adapter.createStorage(
        S3FactoryClient.create(config.s3ClientConfiguration),
        config.bucketName,
        config.acl
      )

      const fileFieldName = 'picture'
      const middleware = new MulterMiddleware({ storage }, fileFieldName)
      middleware.upload(req, res)
    }
  }
}
