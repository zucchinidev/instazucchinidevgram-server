import * as express from 'express'
import { Request, Response, RequestHandler } from 'express'
import * as multer from 'multer'

const ext = require('file-extension')
const port = 3000

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, callback: Function) {
    callback(null, './uploads')
  },
  filename: function (req: Request, file: Express.Multer.File, callback: Function) {
    callback(null, +Date.now() + '.' + ext(file.originalname))
  }
})

const upload: RequestHandler = multer({ storage: storage }).single('picture')

const app = express()

app.post('/api/pictures', function (req: Request, res: Response) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).send('Error uploading file')
    }
    res.send('File uploaded')
  })
})

app.listen(port, function (err: Error) {
  if (err) {
    console.log('Error')
    process.exit(1)
  }

  console.log(`Server listen port ${port}`)
})
