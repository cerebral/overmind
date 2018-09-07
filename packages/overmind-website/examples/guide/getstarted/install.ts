import { getPackageWithVersion } from '../../templates'

export default (_, view) =>
  ({
    react: [
      {
        code: `
npm install ${getPackageWithVersion('overmind-react')}
    `,
      },
    ],
    vue: [
      {
        code: `
npm install ${getPackageWithVersion('overmind-vue')}
    `,
      },
    ],
    angular: [
      {
        code: `
npm install ${getPackageWithVersion('overmind-angular')}
    `,
      },
    ],
  }[view])
