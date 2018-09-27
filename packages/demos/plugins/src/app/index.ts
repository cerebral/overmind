import App from 'overmind'
import createConnect, { TConnect } from 'overmind-react'
import resourcePlugin from '../plugins/resourcePlugin'
import { Posts } from '../models/Post'
import { Comments } from '../models/Comment'

const posts = resourcePlugin<Posts>({
  uri: 'http://localhost:3000/posts',
})

const comments = resourcePlugin<Comments>({
  uri: 'http://localhost:3000/comments',
})

const config = {
  plugins: {
    posts,
    comments,
  },
}

declare module 'overmind' {
  interface IState extends TState<typeof config> {}
  interface IEffects extends TEffects<typeof config> {}
}

const app = new App(config, {
  devtools: 'localhost:1234',
})

export type Connect = TConnect<typeof app>

export const connect = createConnect(app)

export default app
