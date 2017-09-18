import * as express from 'express'
import { Router } from 'express'

import { PictureController } from '../Controllers/PictureController'

export class PictureRouter {
  constructor (private router: Router = express.Router()) {
  }

  configure (): Router {
    this.router.post('/api/pictures', PictureController.uploadPicture())
    return this.router
  }
}
