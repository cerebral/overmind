import { IMutation } from 'proxy-state-tree'

export function rehydrateState(target: any, source: any, classes: any = {}) {
  if (!target || !source) {
    throw new Error(
      `You have to pass a "target" and "source" object to rehydrate`
    )
  }

  Object.keys(source).forEach((key) => {
    const value = source[key]
    const classInstance = classes[key]

    if (typeof classInstance === 'function' && Array.isArray(target[key])) {
      target[key] = (source[key] as any[]).map((value) => classInstance(value))
    } else if (
      typeof classInstance === 'function' &&
      typeof target[key] === 'object' &&
      target[key] !== null &&
      target[key].constructor.name === 'Object'
    ) {
      target[key] = Object.keys(source[key] as any).reduce((aggr, subKey) => {
        aggr[subKey] = classInstance((source[key] as any)[subKey])

        return aggr
      }, {})
    } else if (typeof classInstance === 'function') {
      target[key] = classInstance(source[key])
    } else if (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      value !== null
    ) {
      if (!target[key]) target[key] = {}
      rehydrateState(target[key], source[key], classes[key])
    } else {
      target[key] = source[key]
    }
  })
}

export const SERIALIZE = Symbol('SERIALIZE')

export interface Serialize {
  [SERIALIZE]: boolean
}

export type Serializable =
  | Serialize
  | {
      toJSON: () => {
        [SERIALIZE]: boolean
      }
    }

type SerializableValue =
  | Serializable
  | Array<Serializable>
  | { [key: string]: Serializable }
  | null

type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}[keyof T]

type ExcludeNever<T extends {}> = {
  [P in keyof T]: T[P] extends never ? never : P
}[keyof T]

type ExtracType<T extends {}, K> = {
  [P in FilteredKeys<T, K | {}>]: T[P] extends SerializableValue
    ? (data: any) => Serializable
    : T[P] extends {}
    ? ExtracType<T[P], K> extends { [key: string]: never }
      ? never
      : ExtractDeepType<T[P], K>
    : never
}

type ExtractDeepType<T extends {}, K, U = ExtracType<T, K>> = {
  [P in ExcludeNever<U>]: U[P]
}

type StateNode = {
  [key: string]: any
}

export const rehydrate = <T extends StateNode>(
  state: T,
  source: IMutation[] | StateNode,
  classes: ExtractDeepType<T, SerializableValue> = {} as any
) => {
  if (Array.isArray(source)) {
    const mutations = source as IMutation[]
    mutations.forEach((mutation) => {
      const pathArray = mutation.path.split(mutation.delimiter)
      const key = pathArray.pop() as string
      const target = pathArray.reduce((aggr, key) => aggr[key], state as any)
      const classInstance = pathArray.reduce(
        (aggr, key) => aggr && aggr[key],
        classes as any
      )

      if (mutation.method === 'set') {
        if (
          typeof classInstance === 'function' &&
          Array.isArray(mutation.args[0])
        ) {
          target[key] = mutation.args[0].map((arg) => classInstance(arg))
        } else if (typeof classInstance === 'function') {
          target[key] = classInstance(mutation.args[0])
        } else {
          target[key] = mutation.args[0]
        }
      } else if (mutation.method === 'unset') {
        delete target[key]
      } else {
        target[key][mutation.method].apply(
          target[key],
          typeof classInstance === 'function'
            ? mutation.args.map((arg) => {
                return typeof arg === 'object' && arg !== null
                  ? classInstance(arg)
                  : arg
              })
            : mutation.args
        )
      }
    })
  } else {
    rehydrateState(state, source, classes)
  }
}
