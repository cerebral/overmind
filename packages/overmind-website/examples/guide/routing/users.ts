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
  vue: [
    {
      fileName: 'components/app-component.vue',
      code: `
<template>
  <div class="container">
    <nav>
      <a href="/">Home</a>
      <a href="/users">Users</a>
    </nav>
    <h1 v-if="overmind.state.currentPage === 'home'">Hello world!</h1>
    <users-list v-if="overmind.state.currentPage === 'users'"></users-list>
  </div>
</template>
<script>
import { connect } from '../app'

export default connect({})
</script>
    `,
    },
    {
      fileName: 'components/users-list.vue',
      code: `
<template>
  <div class="content">
    <h4 v-if="overmind.state.isLoadingUsers">Loading users...</h4>
    <ul v-else>
      <li v-for="user in overmind.state.users" :key="user.id">
        <a href={"/users/" + user.id}>{{user.name}}</a>
      </li>
    </ul>
    <user-modal v-if="overmind.state.userModal"></user-modal>
  </div>
</template>
<script>
import { connect } from '../app'

export default connect({})
</script>
    `,
    },
    {
      fileName: 'components/user-modal.vue',
      code: `
<template>
  <a href="/users" class="backdrop">
    <div class="modal">
      <h4 v-if="overmind.state.isLoadingUserDetails">Loading user details...</h4>
      <div v-else>
        <h4>{{overmind.state.modalUser.name}}</h4>
        <h6>{{overmind.state.modalUser.details.email}}</h6>
        <nav>
          <a v-bind:href="'/users/' + overmind.state.modalUser.id + '?tab=0'">bio</a>
          <a v-bind:href="'/users/' + overmind.state.modalUser.id + '?tab=1'">address</a>
        </nav>
        <div
          v-if="overmind.state.currentUserModalTabIndex === 0"
          class="tab-content"
        >
          {{modalUser.details.bio}}
        </div>
        <div
          v-if="overmind.state.currentUserModalTabIndex === 1"
          class="tab-content"
        >
          {{modalUser.details.address}}
        </div>
      </div>
    </div>
  </a>
</template>
<script>
import { connect } from '../app'

export default connect({})
</script>
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
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/app-component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../app'

@Component({
  selector: 'app-component',
  template: \`
  <div class="container">
    <nav>
      <a href="/">Home</a>
      <a href="/users">Users</a>
    </nav>
    <h1 *ngIf="overmind.state.currentPage === 'home'">Hello world!</h1>
    <users-list *ngIf="overmind.state.currentPage === 'users'"></users-list>
  </div>
  \`
})
@connect()
export class AppComponent {}
    `,
    },
    {
      fileName: 'components/users-list.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../app'

@Component({
  selector: 'users-list',
  template: \`
  <div class="content">
    <h4 *ngIf="overmind.state.isLoadingUsers">Loading users...</h4>
    <ul *ngIf="!overmind.state.isLoadingUsers">
      <li *ngFor="let user of overmind.state.users;trackby: trackById">
        <a href={"/users/" + user.id}>{{user.name}}</a>
      </li>
    </ul>
    <user-modal *ngIf="overmind.state.userModal"></user-modal>
  </div>
  \`
})
@connect()
export class UsersList {
  trackById(index, user) {
    return user.id
  }
}
    `,
    },
    {
      fileName: 'components/user-modal.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../app'

@Component({
  selector: 'user-modal',
  template: \`
  <a href="/users" class="backdrop">
    <div class="modal">
      <h4 *ngIf="overmind.state.isLoadingUserDetails">Loading user details...</h4>
      <div *ngIf="!overmind.state.isLoadingUserDetails">
        <h4>{{overmind.state.modalUser.name}}</h4>
        <h6>{{overmind.state.modalUser.details.email}}</h6>
        <nav>
          <a [href]="'/users/' + overmind.state.modalUser.id + '?tab=0'">bio</a>
          <a [href]="'/users/' + overmind.state.modalUser.id + '?tab=1'">address</a>
        </nav>
        <div
          *ngIf="overmind.state.currentUserModalTabIndex === 0"
          class="tab-content"
        >
          {{modalUser.details.bio}}
        </div>
        <div
          *ngIf="overmind.state.currentUserModalTabIndex === 1"
          class="tab-content"
        >
          {{modalUser.details.address}}
        </div>
      </div>
    </div>
  </a>
  \`
})
@connect()
export class UserModal {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
