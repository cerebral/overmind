export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/effects.ts',
          code: `
import page from 'page'

export const router = {
  route<T extends object>(route: string, action: (params: T) => void) {
    page(route, ({ params }) => action(params))
  },
  start: () => page.start(),
  open: (url: string) => page.show(url)
}
  `,
        },
      ]
    : [
        {
          fileName: 'app/effects.js',
          code: `
import page from 'page'

export const router = {
  route(route, action) {
    page(route, ({ params }) => action(params))
  },
  start: () => page.start(),
  open: (url) => page.show(url)
}
  `,
        },
      ]
