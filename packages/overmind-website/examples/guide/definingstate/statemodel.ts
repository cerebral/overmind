export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/models.ts',
          code: `
import { StateModel } from 'overmind'

export class User extends StateModel {
  public id: string
  private firstName: string
  private lastName: string
  constructor(firstName: string, lastName: string) {
    super()
    this.firstName = firstName
    this.lastName = lastName
  }
  changeName(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }
  get name() {
    return this.firstName + ' ' + this.lastName
  }
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/models.js',
          code: `
import { StateModel } from 'overmind'

export class User extends StateModel {
  constructor(firstName, lastName) {
    super()
    this.firstName = firstName
    this.lastName = lastName
  }
  changeName(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  get name() {
    return this.firstName + ' ' + this.lastName
  }
}
  `,
        },
      ]
