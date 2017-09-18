import * as express from 'express'
import { Application } from 'express'
import { AppRouter } from './Routes/AppRouter'
import { container } from '../Core/IoC/IoC'
import { TYPES } from '../Core/IoC/Types'
import { IOptionsConnectionChain } from './Persistence/Mongo/Interfaces/IOptoinsConnectionChain'
import { ConfigureOptionsConnectionChain } from './Persistence/Mongo/ConfigureOptionsConnectionChain'

const port = 3000

export class App {
  public express: Application

  constructor () {
    this.express = express()
    this.configureRoutes()
    this.express.set('container', container)
    this.configureDbConnection()
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

  private configureDbConnection () {
    container
      .bind<IOptionsConnectionChain>(TYPES.OptionsConnectionChain)
      .toConstantValue(ConfigureOptionsConnectionChain.configure())
  }
}
