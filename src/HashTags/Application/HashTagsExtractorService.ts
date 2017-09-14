import { HashTagsExtractorCommand } from './HashTagsExtractorCommand'

export class HashTagsExtractorService {

  perform (hashTagsExtractorCommand: HashTagsExtractorCommand): Array<string> {
    const message = hashTagsExtractorCommand.getMessage()

    if (message == null) {
      return []
    }

    const hashTagRegExp = /#(\w+)/g
    const matches = message.match(hashTagRegExp)
    if (matches === null) {
      return []
    }
    return matches.map(this.normalizeHashTags)
  }

  private normalizeHashTags (match: string): string {
    match = match.toLowerCase()
    return match.replace(/#/g, '')
  }
}
