import { getPackageWithVersion } from '../../templates'

export default (_, view) => [
  {
    code: `
npm install ${getPackageWithVersion('overmind')} ${getPackageWithVersion(
      'overmind-devtools'
    )}
`,
  },
]
