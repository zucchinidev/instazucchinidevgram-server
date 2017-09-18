import { test } from 'ava'
import { v4 } from 'uuid'
import { container } from '../src/Core/IoC/IoC'
import { TYPES } from '../src/Core/IoC/Types'
import { SaveImageService } from '../src/Images/Application/SaveImageService'
import { IOptionsConnectionChain } from '../src/Infrastructure/Persistence/Mongo/Interfaces/IOptoinsConnectionChain'
import { ConfigureOptionsConnectionChain } from '../src/Infrastructure/Persistence/Mongo/ConfigureOptionsConnectionChain'
import { MongoConnection } from '../src/Infrastructure/Persistence/Mongo/MongoConnection'
import { IImage } from '../src/Images/Domain/Interfaces/IImage'

const optionsConnectionChain = ConfigureOptionsConnectionChain.configure()
container
  .bind<IOptionsConnectionChain>(TYPES.OptionsConnectionChain)
  .toConstantValue(optionsConnectionChain)

const mongoConnection = container.get<MongoConnection>(TYPES.MongoConnection)

test.before('setup database', async t => {
  await mongoConnection.getConnection()
  const isConnected = mongoConnection.isDataBaseConnected()
  t.true(isConnected, 'should be connected')
})

test.after('disconnect database', async t => {
  await mongoConnection.disconnect()
  const isConnected = mongoConnection.isDataBaseConnected()
  t.false(isConnected, 'should be disconnected')
})

test.after.always('remove database', async t => {
  const connection = await mongoConnection.getConnection()
  await connection.dropDatabase()
  const dbs = await connection.admin().listDatabases()
  const found = dbs.databases.find((d: {name: string}) => d.name === optionsConnectionChain.dbName)
  t.falsy(found, 'not found')
})

test('should create an image', async t => {

  const saveImageService = container.get<SaveImageService>(TYPES.SaveImageService)
  t.is(typeof saveImageService.save, 'function', 'save is a function')
  const fixture: IImage = {
    tags: [
      'picture',
      'awesome',
      'zucchinidev',
      'ava',
      '100',
      'yes'
    ],
    url: `https://fakeimage.test/${v4()}.jpg`,
    likes: 0,
    liked: false,
    userId: v4(),
    createdAt: null
  }
  const createdImage = await saveImageService.save(fixture)
  t.is(createdImage.url, fixture.url)
  t.is(createdImage.likes, fixture.likes)
  t.is(createdImage.liked, fixture.liked)
  t.is(createdImage.userId, fixture.userId)
  t.is(typeof createdImage._id, 'string')
  t.truthy(createdImage.createdAt)
})
