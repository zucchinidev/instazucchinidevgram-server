import { IOptionsConnectionChain } from './Interfaces/IOptoinsConnectionChain'
import { v4 } from 'uuid'

export class ConfigureOptionsConnectionChain {
  static configure (): IOptionsConnectionChain {
    const optionsConnectionChain: IOptionsConnectionChain = {
      host: 'mongodb://localhost',
      dbName: 'instazucchinidevgram',
      port: 27017
    }

    if (process.env.NODE_ENV === 'development') {
      return optionsConnectionChain
    }

    if (process.env.NODE_ENV === 'production') {
      return optionsConnectionChain
    }

    if (process.env.NODE_ENV === 'test') {
      const dbName = `instazucchinidevgram_${v4()}`
      return {
        dbName,
        host: 'mongodb://localhost',
        port: 27017
      } as IOptionsConnectionChain
    }
    throw new Error('Unsupported environment')
  }
}
