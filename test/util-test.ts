import test from 'ava'

const fn = async (): Promise<string> => Promise.resolve('foo')

test(async (t) => {
  t.is(await fn(), 'foo')
})
