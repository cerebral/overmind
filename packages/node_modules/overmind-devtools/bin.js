#!/usr/bin/env node

const { spawn } = require('child_process')
const electron = require('electron')
const path = require('path')

const serverPath = path.join(__dirname, 'src/main.js')

const args = [serverPath]
  .concat([].concat(process.argv).splice(2))
  .concat('--not-packaged=true')

const env = Object.create(process.env)
env.NODE_ENV = 'production'

const proc = spawn(electron, args, { stdio: 'inherit', env })
proc.on('close', (code) => {
  process.exit(code)
})
