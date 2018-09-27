import * as React from 'react'
import { connect, Connect } from '../../app'
import {
  State as ResourceState,
  Actions as ResourceActions,
} from '../../plugins/resourcePlugin'

type Props<T> = Connect & {
  buttonText?: string
  resource: ResourceState<T>
  actions: ResourceActions<T>
  children: (data: T) => JSX.Element
}

class Resource<T> extends React.PureComponent<Props<T>> {
  render() {
    const { resource, actions, children, buttonText = 'fetch' } = this.props
    return (
      <div>
        {resource.void && <button onClick={actions.fetch}>{buttonText}</button>}
        {resource.pending && <p>Fetching posts...</p>}
        {resource.resolved && (
          <div>
            <div>{children(resource.resolved.data)}</div>
            <button onClick={actions.reset}>Reset</button>
          </div>
        )}
      </div>
    )
  }
}

export default connect(Resource)
