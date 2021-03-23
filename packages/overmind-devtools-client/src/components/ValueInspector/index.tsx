import React, { FunctionComponent, useState } from 'react'

import Inspector from '../Inspector'

type Props = {
  value: any
  small?: boolean
  delimiter: string
}

const ValueInspector: FunctionComponent<Props> = ({
  value,
  small,
  delimiter,
}) => {
  const [expandedPaths, setExpandedPaths] = useState([])

  function onToggleExpand(path: string[]) {
    const pathString = path.join(delimiter)

    if (expandedPaths.includes(pathString)) {
      setExpandedPaths(
        expandedPaths.filter((currentPath) => currentPath !== pathString)
      )
    } else {
      setExpandedPaths(expandedPaths.concat(pathString))
    }
  }

  return (
    <Inspector
      delimiter={delimiter}
      value={value}
      expandedPaths={expandedPaths}
      onToggleExpand={onToggleExpand}
      small={small}
    />
  )
}

export default ValueInspector
