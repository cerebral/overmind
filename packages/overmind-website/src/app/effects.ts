import * as page from 'page'
import { RouteContext } from './types'

export const router = {
  route(url: string, action: (payload: RouteContext) => void) {
    page(url, ({ params, path }) => action({ params, path }))
  },
  redirect: page.redirect,
  start: () => page.start({}),
}

export const request = (url: string) =>
  fetch(url).then((response) => response.json())

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
