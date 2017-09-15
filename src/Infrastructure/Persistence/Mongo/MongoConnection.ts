import { Db, MongoClient, MongoError } from 'mongodb'

const url: string = 'mongodb://localhost:27017'

export class MongoConnection {
  private isConnected: boolean = false
  private db: Db

  constructor (private dbName: string = 'instazucchinidevgram') {

  }

  getConnection () {
    if (this.isConnected) {
      return Promise.resolve(this.db)
    }
    return this.connect()
      .then(() => this.db)
      .catch((err: MongoError) => console.log(err))
  }

  getConnectionChain () {
    return `${url}/${this.dbName}`
  }

  private connect () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.getConnectionChain(), (error: MongoError, db: Db) => {
        if (error) {
          return reject(error)
        }
        this.db = db
        this.isConnected = true
        return resolve(db)
      })
    })
  }
}
