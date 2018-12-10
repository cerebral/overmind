import { createElement, SFC } from 'react'
import { useOvermind } from '../../app'
import * as styles from './styles'

const Guides: SFC = () => {
  const { state } = useOvermind()

  return (
    <div className={styles.wrapper}>
      {state.guides.map((guide) => (
        <a
          className={styles.guide}
          key={guide.fileName}
          href={`/guides/${guide.type}/${guide.fileName.split('.')[0]}`}
        >
          {guide.title}
          <span>{guide.type}</span>
        </a>
      ))}
    </div>
  )
}

export default Guides
