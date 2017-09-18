import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './Types'
import { TAGS } from './Tags'
import { ImageRepository } from '../../Images/Infrastructure/ImageRepository'
import { SaveImageService } from '../../Images/Application/SaveImageService'
import { MongoConnectionChain } from '../../Infrastructure/Persistence/Mongo/MongoConnectionChain'
import { MongoConnection } from '../../Infrastructure/Persistence/Mongo/MongoConnection'

const container = new Container()
// container.bind<ImageRepository>(TYPES.MongoRepository).to(ImageRepository).whenTargetNamed(TAGS.ImageRepository)
container
  .bind<ImageRepository>(TYPES.MongoRepository)
  .to(ImageRepository)

container
  .bind<SaveImageService>(TYPES.SaveImageService)
  .to(SaveImageService)

container
  .bind<string>(TYPES.collectionName)
  .toConstantValue('images')
  .whenTargetNamed(TAGS.images)

container
  .bind<MongoConnectionChain>(TYPES.MongoConnectionChain)
  .to(MongoConnectionChain)

container
  .bind<MongoConnection>(TYPES.MongoConnection)
  .to(MongoConnection)

export {
  container
}
