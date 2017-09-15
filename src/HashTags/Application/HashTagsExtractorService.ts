import { HashTagsExtractorCommand } from './HashTagsExtractorCommand'

export class HashTagsExtractorService {
  constructor (private hashTagRegExp: RegExp) {
    this.hashTagRegExp = /#(\w+)/g
  }

  perform (hashTagsExtractorCommand: HashTagsExtractorCommand): Array<string> {
    const message = hashTagsExtractorCommand.getMessage()

    if (message == null) {
      return []
    }

    const matches = message.match(this.hashTagRegExp)
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
