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
  const validViewQuery = ['react', 'vue', 'angular']
  const validTypescriptQuery = ['true', 'false']
  let currentPath
  let currentQuery: Query = {
    view: String(storage.get('theme')),
    typescript: String(storage.get('typescript')),
  }
  let currentHash = location.hash

  function isValidQuery(query: Query) {
    return (
      validViewQuery.includes(query.view) &&
      validTypescriptQuery.includes(query.typescript)
    )
  }
  if (!isValidQuery(currentQuery)) {
    currentQuery.view = 'react'
    currentQuery.typescript = 'false'
  }

  return {
    getPath() {
      return currentPath
    },
    route(url: string, action: (payload: RouteContext<{} | void>) => void) {
      page(url, ({ params, pathname, querystring }) => {
        // We want to preserve the query
        const query = queryString.parse(querystring)

        if (!querystring || !isValidQuery(query)) {
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
