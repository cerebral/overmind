import { h } from 'overmind-components'
import * as styles from './styles'
import { Component } from '../../app'

const Guides: Component = ({ state }) => (
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

export default Guides
