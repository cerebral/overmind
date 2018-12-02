import { h, Component, useOvermind } from 'overmind-components'
import * as styles from './styles'

const Guides: Component = () => {
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
