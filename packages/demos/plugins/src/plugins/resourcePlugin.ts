import { plugin, derive, Operation, Mutate, Action, ToCallable } from 'overmind'

type Options = {
  uri: string
}

enum Status {
  Void = 'void',
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected',
}

export type State<T> = {
  void: boolean
  pending: boolean
  resolved: false | { data: T }
  rejected: false | { error: any }
}

type InternalStateObj<T> =
  | { status: Status.Void }
  | { status: Status.Pending }
  | { status: Status.Resolved; data: T }
  | { status: Status.Rejected; error: any }

type LocalState<T> = State<T> & {
  _internal: InternalStateObj<T>
}

type Effects<T> = {
  fetch: () => Promise<T>
}

type ActionsDeclaration<T> = {
  fetch: Action
  reset: Action
}

export type Actions<T> = ToCallable<ActionsDeclaration<T>>

export default function resourcePlugin<T>(options: Options) {
  return plugin((path) => {
    const local = (obj: any) => path.reduce((acc, k) => acc[k], obj)
    const localState = (state: any) => local(state) as LocalState<T>
    const localEffects = (effects: any) => local(effects) as Effects<T>

    const effects: Effects<T> = {
      fetch: () => fetch(options.uri).then((response) => response.json()),
    }

    const isPending: Operation.When = ({ state }, v) => {
      return localState(state).pending !== false
    }

    const request: Operation.Map<void, Promise<T>> = (effects) => {
      return localEffects(effects).fetch()
    }

    const setPending: Mutate = (state) =>
      (localState(state)._internal = { status: Status.Pending })
    const setVoid: Mutate = (state) =>
      (localState(state)._internal = { status: Status.Void })
    const setResolved: Mutate = (state, data) => {
      localState(state)._internal = { status: Status.Resolved, data }
    }
    const setRejected: Mutate = (state, error) =>
      (localState(state)._internal = { status: Status.Rejected, error })

    const fetchAction: Action = (action) =>
      action.when(isPending, {
        true: (a) => a.run(() => {}), // null,
        false: (a) =>
          a
            .mutate(setPending)
            .map(request)
            .when(isPending, {
              true: (a1) => a1.mutate(setResolved),
              false: (a) => a.run(() => {}), // null,
            }),
      })

    const reset: Action = (action) => action.mutate(setVoid)

    const state: LocalState<T> = {
      _internal: { status: Status.Void },
      void: derive(
        (state) => localState(state)._internal.status === Status.Void
      ),
      pending: derive(
        (state) => localState(state)._internal.status === Status.Pending
      ),
      resolved: derive((s) => {
        const state = localState(s)
        if (state._internal.status === Status.Resolved) {
          return { data: state._internal.data as any }
        }
        return false
      }),
      rejected: derive((s) => {
        const state = localState(s)
        if (state._internal.status === Status.Rejected) {
          return { error: state._internal.error }
        }
        return false
      }),
    }

    const actions: ActionsDeclaration<T> = {
      fetch: fetchAction,
      reset,
    }

    return {
      state: state as State<T>,
      actions,
      effects,
    }
  })
}
