import {
  Db, DeleteWriteOpResultObject, InsertOneWriteOpResult, MongoError, ObjectID, UpdateWriteOpResult
} from 'mongodb'
import { injectable } from 'inversify'
import { MongoConnection } from './MongoConnection'
import { IMongoRepository } from './Interfaces/IMongoRepository'

@injectable()
export class MongoRepository<Model> implements IMongoRepository<Model> {
  public db: Db

  constructor (protected collection: string, protected mongoConnection: MongoConnection) {
  }

  public find (filter: Object): Promise<Model[]> {
    return new Promise<Model[]>(async (resolve, reject) => {
      await this.getConnection()
      this.db.collection(this.collection).find(filter).toArray((error: MongoError, find: Array<Model>) => {
        if (error) {
          return reject(error)
        }
        return resolve(find)
      })
    })
  }

  public findOneById (objectId: string): Promise<Model> {
    return new Promise<Model>(async (resolve, reject) => {
      await this.getConnection()
      this.db.collection(this.collection).find({ _id: new ObjectID(objectId) }).toArray((error: MongoError, find: Array<Model>) => {
        if (error) {
          return reject(error)
        }
        return resolve(find[0])
      })
    })
  }

  public insertOne (model: Model): Promise<Model> {
    return new Promise<Model>(async (resolve, reject) => {
      await this.getConnection()
      this.db.collection(this.collection).insertOne(model, (error: MongoError, insert: InsertOneWriteOpResult) => {
        if (error) {
          return reject(error)
        }
        const result = insert.ops[0]
        return resolve({
          ...result,
          _id: result._id.toHexString()
        })
      })
    })
  }

  public updateOne (objectId: string, model: Model): Promise<Model> {
    return new Promise<Model>(async (resolve, reject) => {
      await this.getConnection()
      this.db.collection(this.collection).updateOne({ _id: new ObjectID(objectId) }, model, (error, update: UpdateWriteOpResult) => {
        if (error) {
          return reject(error)
        }
        return resolve(model)
      })
    })
  }

  public deleteOne (objectId: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      await this.getConnection()
      this.db.collection(this.collection).deleteOne({ _id: new ObjectID(objectId) }, (error, remove: DeleteWriteOpResultObject) => {
        if (error) {
          return reject(error)
        }
        return resolve()
      })
    })

  }

  protected async getConnection (): Promise<Db> {
    this.db = await this.mongoConnection.getConnection()
    return this.db
  }
}
