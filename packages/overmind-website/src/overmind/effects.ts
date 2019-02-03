import * as page from 'page'
import { RouteContext, Query } from './types'
import * as queryString from 'query-string'

export const storage = {
  get(key: string) {
    const value = localStorage.getItem(key)
    let returnValue = null
    try {
      returnValue = value ? JSON.parse(value) : null
    } catch (e) {}

    return returnValue
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
}

export const router = (() => {
  let currentPath
  let currentQuery: Query = {
    view: storage.get('theme'),
    typescript: storage.get('typescript'),
  }
  let currentHash = location.hash

  return {
    getPath() {
      return currentPath
    },
    route(url: string, action: (payload: RouteContext) => void) {
      page(url, ({ params, pathname, path, querystring }) => {
        // We want to preserve the query
        if (!querystring) {
          if (location.hash === currentHash) {
            currentHash = ''
          } else {
            currentHash = location.hash
          }

          page.redirect(
            `${pathname}?view=${currentQuery.view}&typescript=${
              currentQuery.typescript
            }${currentHash}`
          )
          return
        }

        const query = queryString.parse(querystring)

        currentPath = pathname.split('?')[0]
        currentQuery = {
          view: query.view,
          typescript: query.typescript,
        }

        action({
          params,
          path: pathname,
          query,
        })
      })
    },
    redirect: page.redirect,
    redirectWithQuery: (path: string, query: Query) => {
      currentPath = path
      currentQuery = query

      page.redirect(
        `${path}?view=${query.view}&typescript=${query.typescript}${
          location.hash
        }`
      )
    },
    start: () => page.start({}),
  }
})()

export const request = (url: string) =>
  fetch(url).then((response) => response.json())

export const css = {
  changePrimary(theme: string) {
    const colors = {
      react: '#61dafb',
      angular: '#dd0330',
      vue: '#41b883',
    }
    document.documentElement.style.setProperty('--color-primary', colors[theme])
  },
}
