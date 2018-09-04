import { getPackageWithVersion } from '../../templates'

export default () => [
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
