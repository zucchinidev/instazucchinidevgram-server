import { MongoRepository } from '../../Infrastructure/Persistence/Mongo/MongoRepository'
import { IImage } from '../Domain/Interfaces/IImage'
import { inject, injectable, named } from 'inversify'
import { TYPES } from '../../Core/IoC/Types'
import { MongoConnection } from '../../Infrastructure/Persistence/Mongo/MongoConnection'
import { TAGS } from '../../Core/IoC/Tags'

@injectable()
export class ImageRepository extends MongoRepository<IImage> {
  constructor (@inject(TYPES.collectionName) @named(TAGS.images) collection: string,
               @inject(TYPES.MongoConnection) mongoConnection: MongoConnection
  ) {
    super(collection, mongoConnection)
  }
}
