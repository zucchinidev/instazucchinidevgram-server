import * as express from 'express'
import { Express } from 'express'
import { AppRouter } from './routes/AppRouter'

const port = 3000

export class App {
  public express: Express

  constructor () {
    this.express = express()
    this.configureRoutes()
  }

  configureRoutes () {
    this.express.use(new AppRouter().configure())
  }

  listen () {
    this.express.listen(port, function (err: Error) {
      if (err) {
        console.log('Error')
        process.exit(1)
      }

      console.log(`Server listen port ${port}`)
    })
  }
}
