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

  getHost (): string {
    return this.optionsConnectionChain.host
  }

  getDbName (): string {
    return this.optionsConnectionChain.dbName
  }

  getPort (): number {
    return this.optionsConnectionChain.port
  }
}
