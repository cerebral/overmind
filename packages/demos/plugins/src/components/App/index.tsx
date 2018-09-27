import { hot } from 'react-hot-loader'
import * as React from 'react'
import { Wrapper, InnerWrapper } from './elements'
import { connect, Connect } from '../../app'
import Resource from '../Resource'
import { Posts } from '../../models/Post'

const App: React.SFC<Connect> = ({ app }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Resource
          buttonText="fetch posts"
          resource={app.state.posts}
          actions={app.actions.posts}
        >
          {(data: Posts) => {
            return <p>Found {data.length} posts !</p>
          }}
        </Resource>
        <Resource
          buttonText="fetch comments"
          resource={app.state.comments}
          actions={app.actions.comments}
        >
          {(data: Posts) => {
            return <p>Found {data.length} comments !</p>
          }}
        </Resource>
      </InnerWrapper>
    </Wrapper>
  )
}

export default hot(module)(connect(App))
