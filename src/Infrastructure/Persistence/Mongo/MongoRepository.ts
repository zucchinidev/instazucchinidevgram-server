import {
  Db, DeleteWriteOpResultObject, InsertOneWriteOpResult, MongoError, ObjectID, UpdateWriteOpResult
} from 'mongodb'
import { injectable } from 'inversify'
import { MongoConnection } from './MongoConnection'

@injectable()
export class MongoRepository<Model> {
  public db: Db

  constructor (private collection: string) {
    new MongoConnection().getConnection().then((connection: Db) => this.db = connection)
  }

  public find (filter: Object): Promise<Model[]> {
    return new Promise<Model[]>((resolve, reject) => {
      this.db.collection(this.collection).find(filter).toArray((error: MongoError, find: Array<Model>) => {
        if (error) {
          return reject(error)
        }
        return resolve(find)
      })
    })
  }

  public findOneById (objectId: string): Promise<Model> {
    return new Promise<Model>((resolve, reject) => {
      this.db.collection(this.collection).find({_id: new ObjectID(objectId)}).toArray((error: MongoError, find: Array<Model>) => {
        if (error) {
          return reject(error)
        }
        return resolve(find[0])
      })
    })
  }

  public insertOne (model: Model): Promise<Object> {
    return new Promise<Object>((resolve, reject) => {
      this.db.collection(this.collection).insertOne(model, (error: MongoError, insert: InsertOneWriteOpResult) => {
        if (error) {
          return reject(error)
        }
        return resolve(insert.ops[0])
      })
    })
  }

  public updateOne (objectId: string, model: Model): Promise<Model> {
    return new Promise<Model>((resolve, reject) => {
      this.db.collection(this.collection).updateOne({_id: new ObjectID(objectId)}, model, (error, update: UpdateWriteOpResult) => {
        if (error) {
          return reject(error)
        }
        return resolve(model)
      })
    })
  }

  public deleteOne (objectId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.collection(this.collection).deleteOne({_id: new ObjectID(objectId)}, (error, remove: DeleteWriteOpResultObject) => {
        if (error) {
          return reject(error)
        }
        return resolve()
      })
    })

  }
}
