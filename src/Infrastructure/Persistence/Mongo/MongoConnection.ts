import { Db, MongoClient, MongoError } from 'mongodb'
import { ConnectionChain } from './Interfaces/ConnectionChain'
import { inject, injectable, named } from 'inversify'
import { TYPES } from '../../../Core/IoC/Types'
import { TAGS } from '../../../Core/IoC/Tags'

const url: string = 'mongodb://localhost:27017/instazucchinidevgram'

@injectable()
export class MongoConnection {
  private isConnected: boolean = false
  private db: Db

  constructor (@inject(TYPES.MongoConnectionChain) private connection: ConnectionChain) {

  }

  getConnection (): Promise<Db> {
    if (this.isConnected) {
      return Promise.resolve<Db>(this.db)
    }
    return this.connect()
  }

  isDataBaseConnected (): boolean {
    return this.isConnected
  }

  disconnect () {
    if (!this.isDataBaseConnected()) {
      return Promise.reject(new Error('not connected'))
    }

    this.isConnected = false
    return Promise.resolve(this.db)
      .then((conn: Db) => {
        conn.close((error: MongoError, result) => {
          if (error) {
            return console.log('Database does not disconnected')
          }
          console.log('Database disconnected')
        })
      })
  }

  private connect (): Promise<Db> {
    return new Promise<Db>((resolve, reject) => {
      MongoClient.connect(this.getConnectionChain(), (error: MongoError, db: Db) => {
        if (error) {
          return reject(error)
        }
        this.db = db
        this.isConnected = true
        resolve(this.db)
      })
    })
  }

  private getConnectionChain (): string {
    return this.connection.getConnectionChain()
  }
}
