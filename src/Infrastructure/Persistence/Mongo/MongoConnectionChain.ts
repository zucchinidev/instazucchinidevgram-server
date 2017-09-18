import { ConnectionChain } from './Interfaces/ConnectionChain'
import { IOptionsConnectionChain } from './Interfaces/IOptoinsConnectionChain'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Core/IoC/Types'

@injectable()
export class MongoConnectionChain implements ConnectionChain {
  constructor (@inject(TYPES.OptionsConnectionChain)
               public optionsConnectionChain: IOptionsConnectionChain) {

  }

  getConnectionChain (): string {
    return `${this.getHost()}:${this.getPort()}/${this.getDbName()}`
  }

  getHost () {
    const { host } = this.optionsConnectionChain
    return host
  }

  getDbName () {
    const { dbName } = this.optionsConnectionChain
    return dbName
  }

  getPort () {
    const { port } = this.optionsConnectionChain
    return port
  }

}
