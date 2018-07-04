import { Cooker } from 'repo-cooker'

export const cooker = Cooker(process.argv, {
  devtools: {
    host: 'localhost:8787, reconnect: false',
  },
  path: '.',
  packagesGlobs: ['packages/node_modules/*'],
})
