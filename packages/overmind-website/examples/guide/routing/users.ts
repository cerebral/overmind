const javascript = {
  react: [
    {
      fileName: 'components/App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'
import Users from './Users'

const App = ({ overmind }) => (
  <div class="container">
    <nav>
      <a href="/">Home</a>
      <a href="/users">Users</a>
    </nav>
    {overmind.state.currentPage === 'home' ? <h1>Hello world!</h1> : null}
    {overmind.state.currentPage === 'users' ? <Users /> : null}
  </div>
)

export default connect(App)
    `,
    },
    {
      fileName: 'components/Users.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'
import UserModal from './UserModal'

const Users = ({ overmind }) => (
  <div class="content">
    {overmind.state.isLoadingUsers ? (
      <h4>Loading users...</h4>
    ) : (
      <ul>
        {overmind.state.users.map(user => (
          <li key={user.id}>
            <a href={"/users/" + user.id}>{user.name}</a>
          </li>
        ))}
      </ul>
    )}
    {overmind.state.modalUser ? <UserModal /> : null}
  </div>
)

export default connect(Users)
    `,
    },
    {
      fileName: 'components/UserModal.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'

const UserModal = ({ overmind }) => {
  const modalUser = overmind.state.modalUser
  const currentUserModalTabIndex = overmind.state.currentUserModalTabIndex

  return (
    <a href="/users" class="backdrop">
      <div class="modal">
        {overmind.state.isLoadingUserDetails ? (
          <h4>Loading user details...</h4>
        ) : (
          <>
            <h4>{modalUser.name}</h4>
            <h6>{modalUser.details.email}</h6>
            <nav>
              <a href={"/users/" + modalUser.id + "?tab=0"}>bio</a>
              <a href={"/users/" + modalUser.id + "?tab=1"}>address</a>
            </nav>
            {currentUserModalTabIndex === 0 ? (
              <div class="tab-content">{modalUser.details.bio}</div>
            ) : null}
            {currentUserModalTabIndex === 1 ? (
              <div class="tab-content">{modalUser.details.address}</div>
            ) : null}
          </>
        )}
      </div>
    </a>
  )
}

export default connect(UserModal)
    `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/App.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'
import Users from './Users'

const App: React.SFC<Connect> = ({ overmind }) => (
  <div class="container">
    <nav>
      <a href="/">Home</a>
      <a href="/users">Users</a>
    </nav>
    {overmind.state.currentPage === 'home' ? <h1>Hello world!</h1> : null}
    {overmind.state.currentPage === 'users' ? <Users /> : null}
  </div>
)

export default connect(App)
    `,
    },
    {
      fileName: 'components/Users.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'
import UserModal from './UserModal'

const Users: React.SFC<Connect> = ({ overmind }) => (
  <div class="content">
    {overmind.state.isLoadingUsers ? (
      <h4>Loading users...</h4>
    ) : (
      <ul>
        {overmind.state.users.map(user => (
          <li key={user.id}>
            <a href={"/users/" + user.id}>{user.name}</a>
          </li>
        ))}
      </ul>
    )}
    {overmind.state.modalUser ? <UserModal /> : null}
  </div>
)

export default connect(Users)
    `,
    },
    {
      fileName: 'components/UserModal.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const UserModal: React.SFC<Connect> = ({ overmind }) => {
  const modalUser = overmind.state.modalUser
  const currentUserModalTabIndex = overmind.state.currentUserModalTabIndex

  return (
    <a href="/users" class="backdrop">
      <div class="modal">
        {overmind.state.isLoadingUserDetails ? (
          <h4>Loading user details...</h4>
        ) : (
          <>
            <h4>{modalUser.name}</h4>
            <h6>{modalUser.details.email}</h6>
            <nav>
              <a href={"/users/" + modalUser.id + "?tab=0"}>bio</a>
              <a href={"/users/" + modalUser.id + "?tab=1"}>address</a>
            </nav>
            {currentUserModalTabIndex === 0 ? (
              <div class="tab-content">{modalUser.details.bio}</div>
            ) : null}
            {currentUserModalTabIndex === 1 ? (
              <div class="tab-content">{modalUser.details.address}</div>
            ) : null}
          </>
        )}
      </div>
    </a>
  )
}

export default connect(UserModal)
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
