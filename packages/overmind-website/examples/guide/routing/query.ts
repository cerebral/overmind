export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import page from 'page'
import queryString from 'query-string'

type IParams = {
  [param: string]: string  
} | void

export const router = {
  initialize<Params extends IParams>(routes: {
    [url: string]: (params: Params) => void | Promise<void>
  }): void {
    Object.keys(routes).forEach(url => {
      page(url, ({ params, querystring }) => {
        const payload = Object.assign({}, params, queryString.parse(querystring))

        routes[url](payload)
      })
    })
    page.start()
  },
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
  initialize(routes) {
    Object.keys(routes).forEach(url => {
      page(url, ({ params, querystring }) => {
        const payload = Object.assign({}, params, queryString.parse(querystring))

        routes[url](payload)
      })
    })
    page.start()
  },
  open: (url) => page.show(url)
}
  `,
        },
      ]
