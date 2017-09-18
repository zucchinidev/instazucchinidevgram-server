import { IOptionsConnectionChain } from './IOptoinsConnectionChain'

export interface ConnectionChain {
  optionsConnectionChain: IOptionsConnectionChain,

  getConnectionChain (): string
}
