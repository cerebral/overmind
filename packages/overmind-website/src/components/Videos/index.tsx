import { createElement, SFC } from 'react'
import { useOvermind } from '../../app'
import * as styles from './styles'
import VideoPlayer from '../VideoPlayer'

const Videos: SFC = () => {
  const { state } = useOvermind()
  const video = state.videos.find(
    (video) => video.shortName === state.currentVideo
  )

  return (
    <div className={styles.wrapper}>
      {state.videos.map((video) => (
        <a
          className={styles.video}
          key={video.url}
          href={`/videos/${video.shortName}`}
        >
          {video.title}
          <span>{video.type}</span>
        </a>
      ))}
      {video ? <VideoPlayer url={video.url} /> : null}
    </div>
  )
}

export default Videos
