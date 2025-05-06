const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronEnv', {
  isRenderer: process.type === 'renderer',
  electronVersion: process.versions.electron,
})
contextBridge.exposeInMainWorld('electronAPI', {
  setNewPort: (newPort) => ipcRenderer.send('newPort', newPort),
  restart: () => ipcRenderer.send('restart'),
  onZoomIn: (callback) => ipcRenderer.on('zoom-in', () => callback()),
  onZoomOut: (callback) => ipcRenderer.on('zoom-out', () => callback()),
  onZoomReset: (callback) => ipcRenderer.on('zoom-reset', () => callback()),
})
