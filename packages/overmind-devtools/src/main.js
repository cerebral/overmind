const electron = require('electron')
const app = electron.app
const appVersion = app.getVersion()
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const DevtoolBackend = require('overmind-devtools-client/DevtoolBackend')
const storage = require('electron-json-storage')

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.resolve('icons', 'icon.png'),
    height: 768,
    width: 768,
    minHeight: 500,
    minWidth: 500,
  })

  electron.protocol.handle('filestub', (request) => {
    const url = request.url.substring(10)
    const file = path.normalize(`${path.join(__dirname, '..')}/${url}`)

    return electron.net.fetch('file://' + file)
  })

  const devtoolBackend = DevtoolBackend.create({
    onRelaunch() {
      app.relaunch()
      app.quit()
    },
    openChromeDevtools() {
      mainWindow.openDevTools()
    },
    storage: {
      get(key) {
        return new Promise((resolve) => {
          storage.get(key, null, (_, data) => {
            if (data) {
              resolve(data.value)
            }
          })
        })
      },
      set(key, value) {
        return new Promise((resolve) => {
          storage.set(
            key,
            {
              value,
            },
            resolve
          )
        })
      },
    },
  })

  function onPortSubmit(newPort) {
    const { ipcRenderer } = require('electron')

    ipcRenderer.send('newPort', newPort)
  }

  function onRestart() {
    const { ipcRenderer } = require('electron')

    ipcRenderer.send('restart')
  }

  function openDevtools(port) {
    mainWindow.loadURL(
      'data:text/html;charset=UTF-8,' +
        encodeURIComponent(
          devtoolBackend.getMarkup('bundle.js', port, onPortSubmit, onRestart)
        ),
      {
        baseURLForDataURL: `filestub://devtoolsDist/`,
      }
    )

    if (process.env.NODE_ENV !== 'production') {
      mainWindow.webContents.openDevTools()
    }
  }

  function startDevtoolBackend() {
    return new Promise((resolve, reject) => {
      storage.get('port', (_, storedPort) => {
        const port =
          typeof storedPort === 'object' && storedPort?.value
            ? Number(storedPort.value)
            : typeof storedPort === 'string' || typeof storedPort === 'number'
              ? Number(storedPort)
              : 3031

        if (devtoolBackend.close) {
          devtoolBackend.close()
        }

        devtoolBackend
          .connect(port)
          .then(() => resolve(port))
          .catch((err) => {
            mainWindow.loadURL(
              'data:text/html;charset=UTF-8,' +
                encodeURIComponent(
                  devtoolBackend.getChangePortMarkup(
                    port,
                    onPortSubmit,
                    onRestart
                  )
                ),
              {
                baseURLForDataURL: `file://${path.resolve()}/devtoolsDist/`,
              }
            )
            reject(err)
          })
      })
    })
  }

  mainWindow.on('closed', () => app.quit())
  app.on('activate', () => mainWindow.show())

  electron.ipcMain.on('newPort', (_, port) => {
    storage.set('port', port, () => {
      startDevtoolBackend()
        .then(openDevtools)
        .catch(() => {})
    })
  })

  electron.ipcMain.on('restart', () => {
    app.relaunch()
    app.quit()
  })

  // Application menu
  electron.Menu.setApplicationMenu(
    electron.Menu.buildFromTemplate([
      {
        label: 'Application',
        submenu: [
          { label: 'Overmind Devtools v' + appVersion },
          { type: 'separator' },
          {
            label: 'Open Chrome Devtools',
            click() {
              mainWindow.openDevTools()
            },
          },
          {
            label: 'Hide',
            click() {
              mainWindow.hide()
            },
            accelerator: 'CmdOrCtrl+H',
          },
          {
            label: 'Learn More',
            click() {
              require('electron').shell.openExternal('https://overmindjs.org')
            },
          },
          {
            label: 'License',
            click() {
              require('electron').shell.openExternal(
                'https://github.com/cerebral/overmind/blob/master/LICENSE'
              )
            },
          },
          { type: 'separator' },
          { role: 'quit' },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectall' },
        ],
      },
    ])
  )

  startDevtoolBackend().then(openDevtools)

  /*
    BUG FIX: https://github.com/electron/electron/issues/13008#issuecomment-575909942
  */

  const redirectURL =
    'data:application/x-javascript;base64,UHJvZHVjdFJlZ2lzdHJ5SW1wbC5SZWdpc3RyeT1jbGFzc3tjb25zdHJ1Y3Rvcigpe31uYW1lRm9yVXJsKHIpe3JldHVybiBudWxsfWVudHJ5Rm9yVXJsKHIpe3JldHVybiBudWxsfXR5cGVGb3JVcmwocil7cmV0dXJuIG51bGx9fSxQcm9kdWN0UmVnaXN0cnlJbXBsLl9oYXNoRm9yRG9tYWluPWZ1bmN0aW9uKHIpe3JldHVybiIifSxQcm9kdWN0UmVnaXN0cnlJbXBsLnJlZ2lzdGVyPWZ1bmN0aW9uKHIsdCl7UHJvZHVjdFJlZ2lzdHJ5SW1wbC5fcHJvZHVjdHNCeURvbWFpbkhhc2g9bmV3IE1hcH0sUHJvZHVjdFJlZ2lzdHJ5SW1wbC5fcHJvZHVjdHNCeURvbWFpbkhhc2g9bmV3IE1hcCxQcm9kdWN0UmVnaXN0cnlJbXBsLnJlZ2lzdGVyKFtdLFtdKSxQcm9kdWN0UmVnaXN0cnlJbXBsLnNoYTE9ZnVuY3Rpb24ocil7cmV0dXJuIiJ9Ow=='
  electron.session.defaultSession.webRequest.onBeforeRequest(
    (details, callback) => {
      if (
        /^devtools:\/\/devtools\/remote\/serve_file\/@[0-9a-f]{40}\/product_registry_impl\/product_registry_impl_module.js$/iu.test(
          details.url
        )
      ) {
        callback({ redirectURL })
        return
      }
      callback({})
    }
  )
}

app.on('ready', createWindow)
