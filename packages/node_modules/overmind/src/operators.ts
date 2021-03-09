import { OperatorContextFunction } from './internalTypes'
import {
  action,
  createContext,
  createMutationOperator,
  createNextPath,
  createOperator,
  operatorStarted,
  operatorStopped,
} from './operator'
import { IContext, IOperator } from './types'
import * as utils from './utils'

export function pipe<AI, AO = AI>(
  a: OperatorContextFunction<AI, AO>
): IOperator<AI, AO>
export function pipe<A, B, C>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>
): IOperator<A, C>
export function pipe<A, B, C, D>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>
): IOperator<A, D>
export function pipe<A, B, C, D, E>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>
): IOperator<A, E>
export function pipe<A, B, C, D, E, F>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>
): IOperator<A, F>
export function pipe<A, B, C, D, E, F, G>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>
): IOperator<A, G>
export function pipe<A, B, C, D, E, F, G, H>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>,
  g: OperatorContextFunction<G, H>
): IOperator<A, H>
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>,
  g: OperatorContextFunction<G, H>,
  h: OperatorContextFunction<H, I>
): IOperator<A, I>
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>,
  g: OperatorContextFunction<G, H>,
  h: OperatorContextFunction<H, I>,
  i: OperatorContextFunction<I, J>
): IOperator<A, J>
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>,
  g: OperatorContextFunction<G, H>,
  h: OperatorContextFunction<H, I>,
  i: OperatorContextFunction<I, J>,
  j: OperatorContextFunction<J, K>
): IOperator<A, K>
export function pipe(...operators) {
  const instance = (err, context, next, final = next) => {
    if (err) next(err, context)
    else {
      let operatorIndex = 0

      const run = (operatorErr, operatorContext) => {
        const operator = operators[operatorIndex++]
        const operatorToRun = operator
          ? operator[utils.IS_OPERATOR]
            ? operator
            : action(operator)
          : next
        try {
          operatorToRun(operatorErr, operatorContext, run, final)
        } catch (operatorError) {
          operatorToRun(operatorErr, operatorContext, run, final)
        }
      }

      run(null, context)
    }
  }
  instance[utils.IS_OPERATOR] = true
  return instance
}

export function branch<AI, AO = AI>(
  a: OperatorContextFunction<AI, AO>
): IOperator<AI, AI>
export function branch<A, B, C>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>
): IOperator<A, A>
export function branch<A, B, C, D>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>
): IOperator<A, A>
export function branch<A, B, C, D, E>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>
): IOperator<A, A>
export function branch<A, B, C, D, E, F>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>
): IOperator<A, A>
export function branch<A, B, C, D, E, F, G>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>
): IOperator<A, A>
export function branch<A, B, C, D, E, F, G, H>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>,
  g: OperatorContextFunction<G, H>
): IOperator<A, A>
export function branch<A, B, C, D, E, F, G, H, I>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>,
  g: OperatorContextFunction<G, H>,
  h: OperatorContextFunction<H, I>
): IOperator<A, A>
export function branch<A, B, C, D, E, F, G, H, I, J>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>,
  g: OperatorContextFunction<G, H>,
  h: OperatorContextFunction<H, I>,
  i: OperatorContextFunction<I, J>
): IOperator<A, A>
export function branch<A, B, C, D, E, F, G, H, I, J, K>(
  a: OperatorContextFunction<A, B>,
  b: OperatorContextFunction<B, C>,
  c: OperatorContextFunction<C, D>,
  d: OperatorContextFunction<D, E>,
  e: OperatorContextFunction<E, F>,
  f: OperatorContextFunction<F, G>,
  g: OperatorContextFunction<G, H>,
  h: OperatorContextFunction<H, I>,
  i: OperatorContextFunction<I, J>,
  j: OperatorContextFunction<J, K>
): IOperator<A, A>
export function branch(...operators) {
  const instance = (err, context, next, final = next) => {
    if (err) next(err, context)
    else {
      let operatorIndex = 0

      const run = (operatorErr, operatorContext) => {
        const operator = operators[operatorIndex++]
        const operatorToRun = operator
          ? operator[utils.IS_OPERATOR]
            ? operator
            : action(operator)
          : (err, finalContext, finalNext, finalFinal) => {
              next(
                err,
                {
                  ...finalContext,
                  value: context.value,
                },
                finalNext,
                finalFinal
              )
            }
        try {
          operatorToRun(operatorErr, operatorContext, run, final)
        } catch (operatorError) {
          operatorToRun(operatorErr, operatorContext, run, final)
        }
      }

      run(null, context)
    }
  }
  instance[utils.IS_OPERATOR] = true
  return instance
}

/*
    OPERATORS
  */

export function parallel<I, O1, O2>(
  a: OperatorContextFunction<I, O1>,
  b: OperatorContextFunction<I, O2>
): IOperator<
  I,
  [
    O1 extends Promise<infer O1R> ? O1R : O1,
    O2 extends Promise<infer O2R> ? O2R : O2
  ]
>
export function parallel<I, O1, O2, O3>(
  a: OperatorContextFunction<I, O1>,
  b: OperatorContextFunction<I, O2>,
  c: OperatorContextFunction<I, O3>
): IOperator<
  I,
  [
    O1 extends Promise<infer O1R> ? O1R : O1,
    O2 extends Promise<infer O2R> ? O2R : O2,
    O3 extends Promise<infer O3R> ? O3R : O3
  ]
>
export function parallel<I, O1, O2, O3, O4>(
  a: OperatorContextFunction<I, O1>,
  b: OperatorContextFunction<I, O2>,
  c: OperatorContextFunction<I, O3>,
  d: OperatorContextFunction<I, O4>
): IOperator<
  I,
  [
    O1 extends Promise<infer O1R> ? O1R : O1,
    O2 extends Promise<infer O2R> ? O2R : O2,
    O3 extends Promise<infer O3R> ? O3R : O3,
    O4 extends Promise<infer O4R> ? O4R : O4
  ]
>
export function parallel<I, O1, O2, O3, O4, O5>(
  a: OperatorContextFunction<I, O1>,
  b: OperatorContextFunction<I, O2>,
  c: OperatorContextFunction<I, O3>,
  d: OperatorContextFunction<I, O4>,
  e: OperatorContextFunction<I, O5>
): IOperator<
  I,
  [
    O1 extends Promise<infer O1R> ? O1R : O1,
    O2 extends Promise<infer O2R> ? O2R : O2,
    O3 extends Promise<infer O3R> ? O3R : O3,
    O4 extends Promise<infer O4R> ? O4R : O4,
    O5 extends Promise<infer O5R> ? O5R : O5
  ]
>
export function parallel<I, O1, O2, O3, O4, O5, O6>(
  a: OperatorContextFunction<I, O1>,
  b: OperatorContextFunction<I, O2>,
  c: OperatorContextFunction<I, O3>,
  d: OperatorContextFunction<I, O4>,
  e: OperatorContextFunction<I, O5>,
  f: OperatorContextFunction<I, O5>
): IOperator<
  I,
  [
    O1 extends Promise<infer O1R> ? O1R : O1,
    O2 extends Promise<infer O2R> ? O2R : O2,
    O3 extends Promise<infer O3R> ? O3R : O3,
    O4 extends Promise<infer O4R> ? O4R : O4,
    O5 extends Promise<infer O5R> ? O5R : O5,
    O6 extends Promise<infer O6R> ? O6R : O6
  ]
>
export function parallel<T extends OperatorContextFunction<any, any>>(
  ...operators: T[]
): T {
  const instance = (err, context, next) => {
    if (err) next(err, context)
    else {
      let evaluatingCount = operators.length
      let lastContext
      let hasErrored = false
      const results: any[] = []
      const evaluate = (index, err, newContext) => {
        if (hasErrored) {
          return
        }
        if (err) {
          hasErrored = true
          return next(err, lastContext)
        }
        results[index] = newContext.value
        evaluatingCount--

        if (!evaluatingCount) {
          operatorStopped(context, results)
          next(
            null,
            createContext(
              lastContext,
              results,
              lastContext.execution.path &&
                lastContext.execution.path.slice(
                  0,
                  lastContext.execution.path.length - 1
                )
            )
          )
        }
      }
      operatorStarted('parallel', '', context)

      operators.forEach((operator, index) => {
        lastContext = createContext(
          lastContext || context,
          context.value,
          context.execution.path && context.execution.path.concat(String(index))
        )
        const nextWithPath = createNextPath(evaluate.bind(undefined, index))

        const operatorToRun = operator[utils.IS_OPERATOR]
          ? operator
          : action(operator)
        // @ts-ignore
        operatorToRun(null, lastContext, nextWithPath)
      })
    }
  }
  instance[utils.IS_OPERATOR] = true

  return instance as any
}

export function noop<T>(): IOperator<T, T> {
  return createOperator('noop', '', (err, context, value, next) => {
    if (err) next(err, value)
    else next(null, value)
  })
}

export function filter<T>(
  operation: OperatorContextFunction<T, boolean>
): IOperator<T, T> {
  return createOperator(
    'filter',
    utils.getFunctionName(operation),
    (err, context, value, next, final) => {
      if (err) next(err, value)
      else if (operation(context, value)) next(null, value)
      else final(null, value)
    }
  )
}

export function catchError<T>(
  operation: OperatorContextFunction<Error, T>
): IOperator<T, T> {
  return createMutationOperator(
    'catchError',
    utils.getFunctionName(operation),
    (err, context, value, next) => {
      if (err) next(null, operation(context, err))
      else
        next(null, value, {
          isSkipped: true,
        })
    }
  )
}

export function tryCatch<T, K>(paths: {
  try: OperatorContextFunction<T, K>
  catch: OperatorContextFunction<Error, K>
}): IOperator<T, K> {
  const instance = (err, context, next) => {
    if (err) next(err, context)
    else {
      const evaluateCatch = (err, catchContext) => {
        operatorStopped(context, context.value)
        next(err, createContext(catchContext, context.value))
      }
      const evaluateTry = (err, tryContext) => {
        if (err) {
          const newContext = createContext(
            tryContext,
            err,
            context.execution.path && context.execution.path.concat('catch')
          )
          const nextWithPath = createNextPath(evaluateCatch)
          const operatorToRun = paths.try[utils.IS_OPERATOR]
            ? paths.catch
            : action(paths.catch)

          // @ts-ignore
          operatorToRun(null, newContext, nextWithPath)
        } else {
          operatorStopped(context, context.value)
          next(null, createContext(tryContext, context.value))
        }
      }

      operatorStarted('tryCatch', '', context)

      const newContext = createContext(
        context,
        context.value,
        context.execution.path && context.execution.path.concat('try')
      )
      const nextWithPath = createNextPath(evaluateTry)

      const operatorToRun = paths.try[utils.IS_OPERATOR]
        ? paths.try
        : action(paths.try)
      // @ts-ignore
      operatorToRun(null, newContext, nextWithPath)
    }
  }
  instance[utils.IS_OPERATOR] = true

  return instance as any
}

export function fork<T extends { [key: string]: any }, M extends keyof T, K>(
  key: M,
  paths: {
    [U in T[M]]: OperatorContextFunction<
      T extends { [key in M]: U } ? T : never,
      K
    >
  }
): IOperator<T, K> {
  return createOperator('fork', String(key), (err, context, value, next) => {
    if (err) next(err, value)
    else {
      next(null, value, {
        path: {
          name: String(key),
          operator: (paths as any)[value[key]],
        },
      })
    }
  })
}

export function when<T, K>(
  operation: OperatorContextFunction<T, boolean>,
  paths: {
    true: OperatorContextFunction<T, K>
    false: OperatorContextFunction<T, K>
  }
): IOperator<T, K> {
  return createOperator(
    'when',
    utils.getFunctionName(operation),
    (err, context, value, next) => {
      if (err) next(err, value)
      else if (operation(context, value))
        next(null, value, {
          path: {
            name: 'true',
            operator: paths.true,
          },
        })
      else
        next(null, value, {
          path: {
            name: 'false',
            operator: paths.false,
          },
        })
    }
  )
}

export function wait<T>(ms: number): IOperator<T, T> {
  return createOperator('wait', String(ms), (err, context, value, next) => {
    if (err) next(err, value)
    else setTimeout(() => next(null, value), ms)
  })
}

export function debounce<T>(ms: number): IOperator<T, T> {
  let timeout
  let previousFinal

  return createOperator(
    'debounce',
    String(ms),
    (err, context, value, next, final) => {
      if (err) next(err, value)
      else {
        if (timeout) {
          clearTimeout(timeout)
          previousFinal(null, value)
        }
        previousFinal = final
        timeout = setTimeout(() => {
          timeout = null
          next(null, value)
        }, ms)
      }
    }
  )
}

export function throttle<T>(ms: number): IOperator<T, T> {
  let timeout
  let previousFinal
  let currentNext

  return createOperator(
    'throttle',
    String(ms),
    (err, context, value, next, final) => {
      if (err) next(err, value)
      else {
        if (timeout) {
          previousFinal(null, value)
          currentNext = next
        } else {
          timeout = setTimeout(() => {
            timeout = null
            currentNext(null, value)
          }, ms)
        }
        previousFinal = final
        currentNext = next
      }
    }
  )
}

export function waitUntil<T, C extends IContext<{}>>(
  operation: (state: C['state']) => boolean
): IOperator<T, T> {
  return createOperator(
    'waitUntil',
    operation.name,
    (err, context, value, next) => {
      if (err) next(err, value)
      else {
        const tree = context.execution.getTrackStateTree()
        const test = () => {
          if (operation(tree.state)) {
            tree.dispose()
            next(null, value)
          }
        }
        tree.trackScope(test, test)
      }
    }
  )
}
