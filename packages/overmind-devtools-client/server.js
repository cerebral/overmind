const DevtoolBackend = require('./DevtoolBackend')
const fs = require('fs')
const path = require('path')

const storage = {
  data: {},
  get(key) {
    return this.data[key]
  },
  set(key, value) {
    this.data[key] = value
    return value
  },
  clear() {
    this.data = {}
  },
}

// Get port from environment or use default
const PORT = process.env.OV_DEV_PORT || 3031
global.OV_DEV_PORT = PORT
process.env.OV_DEV_PORT = String(PORT)

// Update HTML with current port in development
const updateHtmlWithPort = () => {
  try {
    const htmlPath = path.resolve(__dirname, 'dist', 'index.html')
    if (fs.existsSync(htmlPath)) {
      let html = fs.readFileSync(htmlPath, 'utf8')
      html = html.replace(
        /window\.__OVERMIND_DEVTOOLS_BACKEND_PORT__\s*=\s*"[^"]*"/g,
        `window.__OVERMIND_DEVTOOLS_BACKEND_PORT__ = "${PORT}"`
      )
      fs.writeFileSync(htmlPath, html)
    }
  } catch (err) {
    console.warn('Could not update HTML with port:', err.message)
  }
}

if (process.env.NODE_ENV !== 'production') {
  updateHtmlWithPort()
}

// Start WebSocket server
const backend = DevtoolBackend.create({
  storage,
  onRelaunch: () => console.log('Relaunch requested'),
  openChromeDevtools: () => console.log('Open Chrome devtools requested'),
  serverPort: PORT,
})

backend
  .connect(PORT)
  .then(() => {
    console.log(`✓ Overmind DevTools WebSocket server running on port ${PORT}`)
  })
  .catch((err) => {
    console.error('Failed to start DevTools WebSocket server:', err.message)
    console.error(`Is another instance already running on port ${PORT}?`)
    process.exit(1)
  })

// Handle graceful shutdown
process.on('SIGINT', () => {
  if (backend) {
    console.log('Closing Overmind DevTools WebSocket server...')
    backend.close()
  }
  process.exit()
})
