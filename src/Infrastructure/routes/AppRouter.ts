import * as express from 'express'
import { Router } from 'express'
import { PictureRouter } from './PictureRouter'

export class AppRouter {
  constructor (private router: Router = express.Router()) {
  }

  configure (): Router {
    this.router.use(new PictureRouter().configure())
    return this.router
  }
}
