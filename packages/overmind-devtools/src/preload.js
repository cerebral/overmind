const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronEnv', {
  isRenderer: process.type === 'renderer',
  electronVersion: process.versions.electron,
})
contextBridge.exposeInMainWorld('electronAPI', {
  setNewPort: (newPort) => ipcRenderer.send('newPort', newPort),
  restart: () => ipcRenderer.send('restart'),
})
