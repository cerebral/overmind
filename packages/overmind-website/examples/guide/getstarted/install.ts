import { getPackageWithVersion } from '../../templates'

export const react = [
  {
    code: `
npm install ${getPackageWithVersion('react-overmind')}
  `,
  },
]

export const reactTs = react

export const vue = [
  {
    code: `
npm install ${getPackageWithVersion('vue-overmind')}
  `,
  },
]

export const vueTs = vue
