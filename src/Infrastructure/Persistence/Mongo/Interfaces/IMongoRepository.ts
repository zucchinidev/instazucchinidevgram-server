export interface IMongoRepository<Model> {
  find (filter: Object): Promise<Model[]>,
  findOneById (objectId: string): Promise<Model>,
  insertOne (model: Model): Promise<Model>,
  updateOne (objectId: string, model: Model): Promise<Model>,
  deleteOne (objectId: string): Promise<void>
}
