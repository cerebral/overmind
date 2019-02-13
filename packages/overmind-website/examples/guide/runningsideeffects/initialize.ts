export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import * as firebase from 'firebase'
import { Post } from './state'

export const api = (() => {
  let app

  return {
    initialize() {
      app = firebase.initializeApp(...)      
    },
    async getPosts(): Promise<Post[]> {
      const snapshot = await app.database().ref('/posts').once('value')

      return snapshot.val()
    }
  }
})()
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/effects.js',
          code: `
import * as firebase from 'firebase'


export const api = (() => {
  let app

  return {
    initialize() {
      app = firebase.initializeApp(...)      
    },
    async getPosts() {
      const snapshot = await app.database().ref('/posts').once('value')

      return snapshot.val()
    }
  }
})()
  `,
        },
      ]
