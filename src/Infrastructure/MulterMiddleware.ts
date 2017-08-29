import { Request, Response, RequestHandler } from 'express'
import * as multer from 'multer'

export class MulterMiddleware {
  private multerRequestHandler: RequestHandler

  constructor (options: multer.Options, fileFieldName: string) {
    this.multerRequestHandler = multer(options).single(fileFieldName)
  }

  upload (req: Request, res: Response) {
    this.multerRequestHandler(req, res, function (err: Error) {
      if (err) {
        return res.status(500).send('Error uploading file')
      }
      res.send('File uploaded')
    })
  }
}
