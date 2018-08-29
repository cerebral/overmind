import { getPackageWithVersion } from '../../templates'

export const js = [
  {
    fileName: 'package.json',
    code: `
{
  "name": "my-app",
  "scripts": {
    "devtools": "npx ${getPackageWithVersion('overmind-devtools')}"
  }
}
  `,
  },
  {
    code: `
npm run devtools
    `,
  },
]

export const ts = js
