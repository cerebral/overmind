import * as React from 'react'
import * as styles from './styles'
import { ZoomProvider, useZoom } from './ZoomContext'
import Workspace from '../Workspace'

// Wrapper component that applies the zoom level
const ZoomableContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { zoomLevel } = useZoom()

  return <div className={styles.container(zoomLevel)}>{children}</div>
}

const Zoomable: React.FC = () => {
  return (
    <ZoomProvider>
      <ZoomableContainer>
        <Workspace />
      </ZoomableContainer>
    </ZoomProvider>
  )
}

export default Zoomable
