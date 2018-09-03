import { getPackageWithVersion } from '../../templates'

export const react = [
  {
    code: `
npm install ${getPackageWithVersion('overmind-react')}
  `,
  },
]

export const reactTs = react

export const vue = [
  {
    code: `
npm install ${getPackageWithVersion('overmind-vue')}
  `,
  },
]

export const vueTs = vue

export const angularTs = [
  {
    code: `
npm install ${getPackageWithVersion('overmind-angular')}
  `,
  },
]
