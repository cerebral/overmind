export const js = [
  {
    fileName: 'app/actions.js',
    code: `
import * as operations from './operations'    

export const actionA = action =>
  action().map(operations.sayHelloWorld)

export const actionB = action =>
  action().map(operations.sayHelloWorldAsync)

export const actionC = action =>
  action().map(operations.inputToUpperCase)
  `,
  },
  {
    fileName: 'demo.js',
    code: `
import app from './app'

app.actions.actionA() // "hello world"
app.actions.actionB() // Promise<"Hello world">
app.actions.actionC("hello world") // "HELLO WORLD"
  `,
  },
]

export const ts = [
  {
    fileName: 'app/actions.ts',
    code: `
import { Action } from 'overmind'
import * as operations from './operations'

export const actionA: Action = action =>
  action().map(operations.sayHelloWorld)
  
export const actionB: Action = action =>
  action().map(operations.sayHelloWorldAsync)
  
export const actionC: Action<string> = action =>
  action().map(operations.inputToUpperCase)
  `,
  },
  {
    fileName: 'demo.ts',
    code: `
import app from './app'

app.actions.actionA() // "hello world"
app.actions.actionB() // Promise<"Hello world">
app.actions.actionC("hello world") // "HELLO WORLD"
  `,
  },
]
