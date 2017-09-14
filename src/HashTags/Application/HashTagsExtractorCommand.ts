export class HashTagsExtractorCommand {
  constructor (private message: string) {
  }

  getMessage (): string {
    return this.message
  }
}
