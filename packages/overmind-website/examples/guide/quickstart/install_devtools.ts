import { getPackageWithVersion } from '../../templates'

export default (_, view) => [
  {
    code: `
npm install concurrently
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
