const WebSocket = require('ws')

class DevtoolBackend {
  constructor(options) {
    this.options = options
    this.currentParse = Promise.resolve()
    this.clientSockets = {}
    this.onClientConnection = this.onClientConnection.bind(this)
    this.onDevtoolConnection = this.onDevtoolConnection.bind(this)
    this.onConnection = this.onConnection.bind(this)
    this.onClientMessage = this.onClientMessage.bind(this)
    this.onDevtoolMessage = this.onDevtoolMessage.bind(this)
  }

  connect(port) {
    if (this.devtoolServer) {
      this.devtoolServer.close()
    }

    return new Promise((resolve, reject) => {
      this.devtoolServer = new WebSocket.Server({
        port,
      })

      this.devtoolServer.on('connection', this.onConnection)
      this.devtoolServer.on('error', reject)
      this.devtoolServer.on('close', (reason) => {
        console.log('Devtools backend closed', reason)
      })
      this.devtoolServer.on('listening', resolve)
    })
  }

  close() {
    this.devtoolServer.close()
  }

  getQuery(url) {
    return url
      .split('?')[1]
      .split(',')
      .reduce((aggr, part) => {
        const parts = part.split('=')

        return Object.assign(aggr, {
          [parts[0]]: decodeURIComponent(parts[1]),
        })
      }, {})
  }

  onConnection(ws, req) {
    const query = this.getQuery(req.url)

    // devtools connects with ?devtools=1 in url
    if (query.devtools) {
      this.onDevtoolConnection(ws, req)
    } else {
      this.onClientConnection(query.name, ws)
    }
  }

  onDevtoolConnection(ws) {
    this.devtoolSocket = ws
    this.devtoolSocket.on('message', this.onDevtoolMessage)
  }

  onDevtoolMessage(message) {
    const parsedMessage = JSON.parse(message)

    switch (parsedMessage.type) {
      case 'ping':
        this.devtoolSocket.send(
          JSON.stringify({
            type: 'pong',
          })
        )
        break
      case 'storage:get':
        this.evaluateDevtoolMessage(parsedMessage, () =>
          this.options.storage.get(parsedMessage.data.key)
        )
        break
      case 'storage:set':
        this.evaluateDevtoolMessage(parsedMessage, () => {
          this.options.storage.set(
            parsedMessage.data.key,
            parsedMessage.data.data
          )
        })
        break
      case 'storage:clear':
        this.evaluateDevtoolMessage(parsedMessage, () =>
          this.options.storage.clear()
        )
        break
      case 'relaunch':
        this.options.onRelaunch()
        break
      case 'openChromeDevtools':
        this.options.openChromeDevtools()
        break
      default:
        console.log('DEVTOOL MESSAGE', message)
        this.clientSockets[parsedMessage.data.appName].send(
          JSON.stringify(parsedMessage.data)
        )
    }
  }

  onClientConnection(name, ws) {
    if (this.clientSockets[name]) {
      this.clientSockets[name].terminate()
    }

    this.clientSockets[name] = ws

    ws.on('message', this.onClientMessage)

    const self = this
    ws.on('close', function onClose() {
      ws.removeEventListener('message', self.onClientMessage)
      ws.removeEventListener('close', onClose)

      self.devtoolSocket.send(
        JSON.stringify({
          type: 'disconnect',
          data: name,
        })
      )
    })
  }

  onClientMessage(message) {
    this.devtoolSocket.send(`{"type":"message","data":${message}}`)
  }

  async evaluateDevtoolMessage(message, cb) {
    const result = await cb()

    if ('evaluate' in message) {
      this.devtoolSocket.send(
        JSON.stringify({
          type: 'evaluated',
          data: {
            id: message.evaluate,
            data: result,
          },
        })
      )
    }
  }

  getChangePortMarkup(port, onPortSubmit, onRestart) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:400,700"
          rel="stylesheet"
        />
        <script type="text/javascript">
          ${onPortSubmit.toString()}
  
          ${onRestart.toString()}
  
          function handleFormSubmit(event) {
            event.preventDefault()
            var input = document.querySelector('#port-input')
            input.setAttribute('disabled', true)
            ${onPortSubmit.name}(input.value)
          }
        </script>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100vh;
            background-color: hsl(206, 57%, 13%);
          }
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
          .inner-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 {
            color: white;
          }
          input {
            border: 0;
            border-radius: 3px;
            width: 200px;
            padding: 1rem;
            font-size: 18px;
            outline: none;
          }
          button {
            padding: 1rem;
            border: 0;
            outline: 0;
            color: white;
            background-color: #fac863;
            margin: 1rem;
            font-size: 18px;
            border-radius: 3px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="inner-wrapper">
            <h1>The port ${port} is in use</h1>
            <form onsubmit="handleFormSubmit(event)">
              <input id="port-input" type="text" placeholder="New port..." />
            </form>
            <button onclick="${onRestart.name}()">restart</button>
          </div>
        </div>
      </body>
    </html>
    `
  }

  getMarkup(scriptSource, port, onPortSubmit, onRestart) {
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <link
        href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:400,700"
        rel="stylesheet"
      />
      <script type="text/javascript">
        window['__OVERMIND_DEVTOOLS_BACKEND_PORT__'] = "${port}";
      </script>
      <script type="text/javascript">
        ${onPortSubmit.toString()}

        ${onRestart.toString()}

        function handleFormSubmit(event) {
          event.preventDefault()
          var input = document.querySelector('#port-input')
          input.setAttribute('disabled', true)
          ${onPortSubmit.name}(input.value)
        }
      </script>
    </head>
    <body>
      <script type="text/javascript" src="${scriptSource}"></script>
    </body>
  </html>
  `
  }
}

DevtoolBackend.create = (options) => new DevtoolBackend(options)

module.exports = DevtoolBackend
