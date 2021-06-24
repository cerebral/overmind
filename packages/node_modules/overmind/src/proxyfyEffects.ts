export const doNotProxy = Symbol('doNotProxy')

function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

let hasWarnedConstructor = false
let currentEffectId = 0
const ORIGIN_TARGET = Symbol('ORIGIN_TARGET')
export function proxifyEffects<Effects>(
  effects: Effects,
  cb: (effect) => void,
  path: string = ''
): Effects {
  if (!isObject(effects) && !(typeof effects === 'function')) {
    return effects
  }

  return new Proxy(effects as any, {
    apply(target, thisArg, agumentsList) {
      const effectId = currentEffectId++
      const name = path.split('.')
      const method = name.pop()
      // eslint-disable-next-line
      return cb({
        func: target.bind(thisArg ? thisArg[ORIGIN_TARGET] : undefined),
        effectId,
        name: name.join('.'),
        method,
        args: agumentsList,
      })
    },
    construct(Target, args) {
      if (!hasWarnedConstructor) {
        console.warn(
          `EFFECTS - It is highly recommended to create a custom effect, exposing a method that deals with the instantiation of "${path}". It improves readability and debugability of your app`
        )
        hasWarnedConstructor = true
      }

      return new Target(...args)
    },
    get(target, prop) {
      if (prop === ORIGIN_TARGET) {
        return target
      }

      return proxifyEffects(
        target[prop],
        cb,
        path ? path + '.' + prop.toString() : prop.toString()
      )
    },
  })
}
