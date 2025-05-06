import * as React from 'react'
import { useAppState, useActions, useEffects } from '../../../overmind'

type ZoomContextType = {
  zoomLevel: number
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
}

export const ZoomContext = React.createContext<ZoomContextType>({
  zoomLevel: 1,
  zoomIn: () => {},
  zoomOut: () => {},
  resetZoom: () => {},
})

export const ZoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const state = useAppState()
  const actions = useActions()
  const effects = useEffects()

  const zoomIn = React.useCallback(() => {
    actions.zoomIn()
  }, [actions])

  const zoomOut = React.useCallback(() => {
    actions.zoomOut()
  }, [actions])

  const resetZoom = React.useCallback(() => {
    actions.resetZoom()
  }, [actions])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault()
          zoomIn()
        } else if (e.key === '-') {
          e.preventDefault()
          zoomOut()
        } else if (e.key === '0') {
          e.preventDefault()
          resetZoom()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Set up Electron IPC listeners
    if (effects.platform.isElectron()) {
      window.electronAPI.onZoomIn(zoomIn)
      window.electronAPI.onZoomOut(zoomOut)
      window.electronAPI.onZoomReset(resetZoom)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [zoomIn, zoomOut, resetZoom])

  const value = React.useMemo(
    () => ({
      zoomLevel: state.zoom.level,
      zoomIn,
      zoomOut,
      resetZoom,
    }),
    [state.zoom.level, zoomIn, zoomOut, resetZoom]
  )

  return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>
}

export const useZoom = () => React.useContext(ZoomContext)
