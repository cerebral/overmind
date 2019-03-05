export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import page from 'page'
import queryString from 'query-string'

interface IParams {
  [param: string]: string
}

export const router = {
  route<T extends IParams>(route: string, action: (params: T) => void) {
    page(route, ({ params, querystring }) => {
      const payload = Object.assign({}, params, queryString.parse(querystring))

      action(payload)
    })
  },
  start: () => page.start(),
  open: (url: string) => page.show(url)
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/effects.js',
          code: `
import page from 'page'
import queryString from 'query-string'

export const router = {
  route(route, action) {
    page(route, ({ params, querystring }) => {
      const payload = Object.assign({}, params, queryString.parse(querystring))

      action(payload)
    })
  },
  start: () => page.start(),
  open: (url) => page.show(url)
}
  `,
        },
      ]
