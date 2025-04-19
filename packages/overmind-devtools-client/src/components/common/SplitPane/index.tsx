import * as React from 'react'
import { useRef, useEffect, useCallback } from 'react'
import { useAppState, useActions, useEffects } from '../../../overmind'
import * as styles from './styles'

interface PaneProps {
  minSize?: number
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Pane: React.FC<PaneProps> = ({ minSize, children, style }) => {
  return (
    <div
      className={styles.paneBase}
      style={{
        minWidth: minSize,
        minHeight: minSize,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

interface SplitPaneProps {
  split: 'vertical' | 'horizontal'
  sizes: number[]
  onChange?: (sizes: number[]) => void
  children: React.ReactNode
  sashRender?: () => React.ReactNode
}

const SplitPane: React.FC<SplitPaneProps> = ({
  split,
  sizes: initialSizes,
  onChange,
  children,
  sashRender,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const state = useAppState()
  const actions = useActions()
  const effects = useEffects()

  // Convert children to array
  const childrenArray = React.Children.toArray(children)

  // Extract minSize values from Pane children
  const minSizes = childrenArray.map((child) => {
    if (
      React.isValidElement(child) &&
      typeof child.type !== 'string' &&
      child.props
    ) {
      const props = child.props as { minSize?: number }
      return typeof props.minSize !== 'undefined' ? props.minSize : 0
    }
    return 0
  })

  // Initialize current sizes from initialSizes or use from Overmind state
  const currentSizes =
    state.splitPane.isDragging && state.splitPane.splitType === split
      ? state.splitPane.currentSizes
      : initialSizes

  const isDragging =
    state.splitPane.isDragging && state.splitPane.splitType === split

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    actions.startSplitPaneDrag({
      startPos: split === 'vertical' ? e.clientX : e.clientY,
      sizes: currentSizes,
      split,
      minSizes,
    })
  }

  // Define handlers with useCallback to maintain reference equality
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!state.splitPane.isDragging || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerSize =
        split === 'vertical' ? containerRect.width : containerRect.height
      const currentPos = split === 'vertical' ? e.clientX : e.clientY

      actions.handleSplitPaneMove({
        currentPos,
        containerSize,
        onChange,
        minSizes,
      })
    },
    [split, onChange, actions, state.splitPane.isDragging, minSizes]
  )

  const handleMouseUp = useCallback(() => {
    actions.stopSplitPaneDrag()
  }, [actions])

  // Effect for attaching/detaching global event listeners
  useEffect(() => {
    if (state.splitPane.isDragging && state.splitPane.splitType === split) {
      effects.splitPane.addDragListeners(handleMouseMove, handleMouseUp)
    }

    return () => {
      if (state.splitPane.splitType === split) {
        effects.splitPane.removeDragListeners(handleMouseMove, handleMouseUp)
      }
    }
  }, [
    state.splitPane.isDragging,
    state.splitPane.splitType,
    split,
    handleMouseMove,
    handleMouseUp,
    effects.splitPane,
  ])

  // Effect to add VSCode-like body class when dragging
  useEffect(() => {
    if (isDragging) {
      document.body.classList.add('react-split--disabled')
    } else {
      document.body.classList.remove('react-split--disabled')
    }

    return () => {
      document.body.classList.remove('react-split--disabled')
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={`${styles.container(split)} ${isDragging ? 'dragging' : ''}`}
    >
      <div className={styles.paneFirst(currentSizes[0])}>
        {childrenArray[0]}
      </div>
      <div
        className={styles.divider(split, isDragging)}
        onMouseDown={handleMouseDown}
      >
        {sashRender ? sashRender() : null}
      </div>
      <div className={styles.paneSecond}>{childrenArray[1]}</div>
    </div>
  )
}

export default SplitPane
