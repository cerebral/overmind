import { createElement, SFC, useEffect, useState } from 'react'
import { useOvermind } from '../../overmind'
import * as styles from './styles'
import { compile, getGithubBaseUrl } from '../../utils'
import Doc from '../Doc'
import GuideToc from '../GuideToc'

const Introduction: SFC = () => {
  const { state } = useOvermind()
  const [content, setContent] = useState(null)

  useEffect(() => {
    import('./introduction.md').then((module) => setContent(module.default))
  }, [])

  if (!content) {
    return null
  }

  const compiled = compile(content)

  return (
    <div className={styles.wrapper}>
      <Doc url={getGithubBaseUrl() + '/guides/gestarted.md'}>
        {compiled.tree}
      </Doc>
      <GuideToc toc={compiled.toc} />
    </div>
  )
}

export default Introduction
