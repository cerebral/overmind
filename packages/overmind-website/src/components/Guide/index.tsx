import { createElement, SFC, useState, useEffect } from 'react'
import { useOvermind } from '../../overmind'
import GuideToc from '../GuideToc'
import Doc from '../Doc'
import * as styles from './styles'
import { compile, getGithubBaseUrl } from '../../utils'

function getGithubUrl(guide) {
  return (
    getGithubBaseUrl() + '/guides/' + guide.type + '/' + guide.title + '.md'
  )
}

const Guide: SFC = () => {
  const { state } = useOvermind()
  const [content, setContent] = useState(null)

  useEffect(() => {
    import('../../../guides/' +
      state.currentGuide.type +
      '/' +
      state.currentGuide.title +
      '.md').then((module) => setContent(module))
  }, [])

  if (!content) {
    return null
  }

  const compiled = compile(content)

  return (
    <div className={styles.wrapper}>
      <Doc url={getGithubUrl(state.currentGuide)}>{compiled.tree}</Doc>
      <GuideToc toc={compiled.toc} />
    </div>
  )
}

export default Guide
