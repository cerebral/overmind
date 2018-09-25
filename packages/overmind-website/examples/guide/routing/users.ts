const javascript = {
  react: [
    {
      fileName: 'components/App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'
import Users from './Users'

const App = ({ app }) => (
  <div class="container">
    <nav>
      <a href="/">Home</a>
      <a href="/users">Users</a>
    </nav>
    {app.state.currentPage === 'home' ? <h1>Hello world!</h1> : null}
    {app.state.currentPage === 'users' ? <Users /> : null}
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

const Users = ({ app }) => (
  <div class="content">
    {app.state.isLoadingUsers ? (
      <h4>Loading users...</h4>
    ) : (
      <ul>
        {app.state.users.map(user => (
          <li key={user.id}>
            <a href={"/users/" + user.id}>{user.name}</a>
          </li>
        ))}
      </ul>
    )}
    {app.state.modalUser ? <UserModal /> : null}
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

const UserModal = ({ app }) => {
  const modalUser = app.state.modalUser
  const currentUserModalTabIndex = app.state.currentUserModalTabIndex

  return (
    <a href="/users" class="backdrop">
      <div class="modal">
        {app.state.isLoadingUserDetails ? (
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

const typescript = {}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
