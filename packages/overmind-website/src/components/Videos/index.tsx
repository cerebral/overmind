import { h } from 'overmind-components'
import * as styles from './styles'
import VideoPlayer from '../VideoPlayer'
import { Video as TVideo } from '../../app/types'
import { Component } from '../../app'

const Videos: Component = ({ state }) => {
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
