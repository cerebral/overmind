import { getPackageWithVersion } from '../../templates'

export default () => [
  {
    fileName: 'package.json',
    code: `
{
  "name": "my-app",
  "scripts": {
    "devtools": "${getPackageWithVersion('overmind-devtools')}"
  }
}
  `,
  },
]
