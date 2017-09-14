import { HashTagsExtractorCommand } from './HashTagsExtractorCommand'

export class HashTagsExtractorService {

  perform (hashTagsExtractorCommand: HashTagsExtractorCommand): Array<string> {
    return [hashTagsExtractorCommand.getMessage()]
  }
}
