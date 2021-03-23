import { parse, stringify, Payload } from '.'

test('should stringify object and pass index', async () => {
  const obj = {}
  const result = []
  const id = stringify(obj, (payload) => {
    result.push(payload)
  })
  expect(result).toEqual([
    JSON.stringify({
      id,
      path: [],
      type: 1,
    }),
    JSON.stringify({
      id,
      type: 3,
    }),
  ])
})

test('should stringify objects', async () => {
  const obj = {
    foo: 'bar',
    bar: {
      isAwesome: true,
    },
    baz: ['foo', 123, true],
  }
  const result = []
  const id = stringify(obj, (payload) => {
    result.push(payload)
  })
  expect(result).toEqual([
    JSON.stringify({
      id,
      path: [],
      type: 1,
    }),
    JSON.stringify({
      id,
      path: ['foo'],
      type: 2,
      value: 'bar',
    }),
    JSON.stringify({
      id,
      path: ['bar'],
      type: 1,
    }),
    JSON.stringify({
      id,
      path: ['bar', 'isAwesome'],
      type: 2,
      value: true,
    }),
    JSON.stringify({
      id,
      path: ['baz'],
      type: 0,
    }),
    JSON.stringify({
      id,
      path: ['baz', 0],
      type: 2,
      value: 'foo',
    }),
    JSON.stringify({
      id,
      path: ['baz', 1],
      type: 2,
      value: 123,
    }),
    JSON.stringify({
      id,
      path: ['baz', 2],
      type: 2,
      value: true,
    }),
    JSON.stringify({
      id,
      type: 3,
    }),
  ])
})

test('should parse payload', () => {
  const payload: Payload = {
    id: 0,
    path: [],
    type: 1,
  }
  parse(payload)
  const result = parse({ id: 0, type: 3 })
  expect(result).toEqual({})
})

test('should parse more complex payload', async () => {
  const payloads: Payload[] = [
    {
      id: 0,
      path: [],
      type: 1,
    },
    {
      id: 0,
      path: ['foo'],
      type: 2,
      value: 'bar',
    },
    {
      id: 0,
      path: ['bar'],
      type: 1,
    },
    {
      id: 0,
      path: ['bar', 'isAwesome'],
      type: 2,
      value: true,
    },
    {
      id: 0,
      path: ['baz'],
      type: 0,
    },
    {
      id: 0,
      path: ['baz', 0],
      type: 2,
      value: 'mip',
    },
  ]
  payloads.forEach((payload) => parse(payload))
  const result = parse({ id: 0, type: 3 })
  expect(result).toEqual({
    foo: 'bar',
    bar: {
      isAwesome: true,
    },
    baz: ['mip'],
  })
})

test('should be able to stream', async () => {
  const obj = {
    foo: 'bar',
    bar: {
      isAwesome: true,
    },
    baz: ['foo', 123, true],
  }
  let result
  stringify(obj, (payload) => {
    result = parse(JSON.parse(payload))
  })
  expect(result).toEqual(obj)
})
