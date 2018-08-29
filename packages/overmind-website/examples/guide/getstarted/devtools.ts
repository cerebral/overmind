export const js = [
  {
    fileName: 'package.json',
    code: `
{
  "name": "my-app",
  "scripts": {
    "devtools": "npx overmind-devtools@next"
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
