import * as React from 'react'

import { AppMessage } from '../../overmind/types'
import Inspector from '../Inspector'
import * as styles from './styles'

type Props = {
  message: AppMessage<any>
  delimiter: string
}

const ConsoleRow: React.FunctionComponent<Props> = ({ message, delimiter }) => {
  const [expandedPaths, setExpandedPaths] = React.useState<string[]>([])

  function onToggleExpand(pathArray: string[]) {
    const expandedPathsCopy = expandedPaths.slice()
    const path = pathArray.join('.')

    if (expandedPathsCopy.includes(path)) {
      expandedPathsCopy.splice(expandedPathsCopy.indexOf(path), 1)
    } else {
      expandedPathsCopy.push(path)
    }

    setExpandedPaths(expandedPathsCopy)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.type}>{message.type}</div>
      <Inspector
        delimiter={delimiter}
        value={message.data}
        expandedPaths={expandedPaths}
        onToggleExpand={onToggleExpand}
      />
    </div>
  )
}

export default ConsoleRow
