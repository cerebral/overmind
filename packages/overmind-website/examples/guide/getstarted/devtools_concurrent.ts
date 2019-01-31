import { getPackageWithVersion } from '../../templates'

export default () => [
  {
    fileName: 'package.json',
    code: `
{
  "name": "my-app",
  "scripts": {
    "start": "concurrently \\"parcel index.html\\" \\"${getPackageWithVersion(
      'overmind-devtools'
    )}\\""
  }
}
  `,
  },
]
