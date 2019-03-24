export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import page from 'page'

interface IParams {
  [param: string]: string  
}

export const router = {
  initialize(routes: { [url: string]: (params: IParams) => void }) {
    Object.keys(routes).forEach(url => {
      page(url, ({ params }) => routes[url](params))
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

export const router = {
  initialize(routes) {
    Object.keys(routes).forEach(url => {
      page(url, ({ params }) => routes[url](params))
    })
    page.start()
  },
  open: (url) => page.show(url)
}
  `,
        },
      ]
