import test from 'ava'

test('this should pass', t => {
  t.pass()
})

test('it should support async/await', async (t) => {
  const p = Promise.resolve<string>('foo')
  const secret = await p
  t.is(secret, 'foo')
})
