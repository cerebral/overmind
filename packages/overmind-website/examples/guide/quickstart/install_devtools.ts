import { getPackageWithVersion } from '../../templates'

export default (_, view) => [
  {
    code: `
npm install ${getPackageWithVersion('overmind-devtools')} concurrently
`,
  },
  {
    fileName: 'package.json',
    code: `
{
  ...
  "scripts": {
    "start": "concurrently \\"overmind-devtools\\" \\"someBuildTool\\""
  },
  ...
}    
`,
  },
]
