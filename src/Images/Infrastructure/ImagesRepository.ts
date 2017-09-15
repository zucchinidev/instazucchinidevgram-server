import { MongoRepository } from '../../Infrastructure/Persistence/Mongo/MongoRepository'
import { IImage } from '../Domain/Interfaces/IImage'

const collection = 'images'

export class ImagesRepository extends MongoRepository<IImage> {
  constructor () {
    super(collection)
  }
}
