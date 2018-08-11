import * as React from 'react'
import { Wrapper, Video } from './elements'
import VideoPlayer from '../VideoPlayer'
import { TVideo } from '../App'

type Props = {
  currentPath: string
  videos: TVideo[]
  isLoading: boolean
}

class Videos extends React.Component<Props> {
  getVideo() {
    const paths = this.props.currentPath.split('/')
    const videoShortName = paths.length > 2 ? paths[2] : null

    if (videoShortName && this.props.videos.length) {
      return this.props.videos.find(
        (video) => video.shortName === videoShortName
      )
    }

    return null
  }
  render() {
    const video = this.getVideo()

    return (
      <Wrapper>
        {this.props.videos.map((video) => (
          <Video key={video.url} href={`/videos/${video.shortName}`}>
            {video.title}
            <span>{video.type}</span>
          </Video>
        ))}
        {video ? <VideoPlayer url={video.url} /> : null}
      </Wrapper>
    )
  }
}

export default Videos
