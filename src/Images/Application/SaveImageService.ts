import { named, inject, injectable } from 'inversify'
import { IMongoRepository } from '../../Infrastructure/Persistence/Mongo/Interfaces/IMongoRepository'
import { TYPES } from '../../Core/IoC/Types'
import { TAGS } from '../../Core/IoC/Tags'
import { IImage } from '../Domain/Interfaces/IImage'
import { HashTagsExtractorService } from '../../HashTags/Application/HashTagsExtractorService'
import { HashTagsExtractorCommand } from '../../HashTags/Application/HashTagsExtractorCommand'

@injectable()
export class SaveImageService {
  constructor (@inject(TYPES.MongoRepository) @named(TAGS.ImageRepository) private imageRepository: IMongoRepository<IImage>) {
  }

  save (image: IImage): Promise<IImage> {
    image.createdAt = new Date().getTime()
    image.tags = new HashTagsExtractorService().perform(
      new HashTagsExtractorCommand(image.description)
    )
    return this.imageRepository.insertOne(image)
  }
}
