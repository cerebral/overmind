export function isObject(obj: any) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}

export function isArray(array: any) {
  return Array.isArray(array)
}

export function isBoolean(bool: any) {
  return typeof bool === 'boolean'
}

export function isString(string: any) {
  return typeof string === 'string'
}

export function isNumber(number: any) {
  return typeof number === 'number'
}

export function isNull(_null: any) {
  return _null === null
}
