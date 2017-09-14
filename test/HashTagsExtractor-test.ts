import { test } from 'ava'
import { HashTagsExtractorService } from '../src/HashTags/Application/HashTagsExtractorService'
import { HashTagsExtractorCommand } from '../src/HashTags/Application/HashTagsExtractorCommand'

test('extracting hashtags from test', t => {
  const message = 'a #picture with tags #AweSome #zucchinidev #AVA and #100 ##yes'
  const tags = new HashTagsExtractorService().perform(new HashTagsExtractorCommand(message))
  t.deepEqual(tags, [
    'picture',
    'awesom',
    'zucchinidev',
    'ava',
    '100',
    'yes'
  ])

  const emptyTags = new HashTagsExtractorService().perform(new HashTagsExtractorCommand(''))
  t.deepEqual(emptyTags, [])

  const nullValue = new HashTagsExtractorService().perform(new HashTagsExtractorCommand(null))
  t.deepEqual(nullValue, [])

})
