/*
  Type 0 = array
  Type 1 = object
  Type 2 = value
  Type 3 = done
*/
function traversePaths(
  id,
  value,
  cb,
  replacer?,
  parent: any = window,
  currentPath = [],
  index = 0
) {
  const replacedValue = replacer
    ? replacer.call(parent, currentPath, value)
    : value

  if (
    typeof replacedValue === 'function' ||
    typeof replacedValue === 'symbol' ||
    replacedValue === undefined
  ) {
  } else if (Array.isArray(replacedValue)) {
    cb(`{"id":${id},"path":${JSON.stringify(currentPath)},"type":0}`, index++)
    const length = replacedValue.length
    for (let x = 0; x < length; x++) {
      index = traversePaths(
        id,
        replacedValue[x],
        cb,
        replacer,
        replacedValue,
        currentPath.concat(x),
        index
      )
    }
  } else if (replacedValue !== null && typeof replacedValue === 'object') {
    cb(`{"id":${id},"path":${JSON.stringify(currentPath)},"type":1}`, index++)
    for (const key in replacedValue) {
      index = traversePaths(
        id,
        replacedValue[key],
        cb,
        replacer,
        replacedValue,
        currentPath.concat(key),
        index
      )
    }
  } else {
    cb(
      `{"id":${id},"path":${JSON.stringify(
        currentPath
      )},"type":2,"value":${JSON.stringify(replacedValue)}}`,
      index++
    )
  }

  return index
}
let seq = 0
export function stringify(value, cb, replacer?) {
  const id = seq++
  const index = traversePaths(id, value, cb, replacer)
  cb(`{"id":${id},"type":3}`, index)
  return id
}

export type Payload =
  | {
      id: number
      type: 0
      path: (string | number)[]
    }
  | {
      id: number
      type: 1
      path: (string | number)[]
    }
  | {
      id: number
      type: 2
      path: (string | number)[]
      value: any
    }
  | {
      id: number
      type: 3
    }

class Parser {
  value: any
  constructor(payload: Payload) {
    if (payload.type === 0) {
      this.value = []
    } else if (payload.type === 1) {
      this.value = {}
    } else if (payload.type === 2) {
      this.value = payload.value
    }
  }

  evaluate(payload: Payload) {
    if (payload.type === 0) {
      const path = payload.path
      const nestedCount = path.length - 1
      let target = this.value
      let x = 0
      for (x; x < nestedCount; x++) {
        target = target[path[x]]
      }
      target[path[x]] = []
    } else if (payload.type === 1) {
      const path = payload.path
      const nestedCount = path.length - 1
      let target = this.value
      let x = 0
      for (x; x < nestedCount; x++) {
        target = target[path[x]]
      }
      target[path[x]] = {}
    } else if (payload.type === 2) {
      const path = payload.path
      const nestedCount = path.length - 1
      let target = this.value
      let x = 0
      for (x; x < nestedCount; x++) {
        target = target[path[x]]
      }
      target[path[x]] = payload.value
    }
  }
}

const parsers: { [id: string]: Parser } = {}

export function parse(payload: Payload) {
  const parser = parsers[payload.id]

  if (!parser) {
    parsers[payload.id] = new Parser(payload)
    return
  }

  if (payload.type === 3) {
    delete parsers[payload.id]
    return parser.value
  }

  parser.evaluate(payload)
}
