import * as React from 'react'
import { Wrapper, Video, Backdrop, Loader, Iframe } from './elements'

type Props = {
  url: string
}

// https://www.youtube.com/watch?v=RA1_cCgEWws

class VideoPlayer extends React.Component<Props> {
  node: HTMLElement
  componentDidMount() {
    setTimeout(() => {
      this.node.style.opacity = '1'
    })
  }
  render() {
    return (
      <Wrapper
        innerRef={(node) => {
          this.node = node
        }}
      >
        <Backdrop href="/videos" />
        <Video>
          <Loader>loading video...</Loader>
          <Iframe
            width="560"
            height="315"
            src={
              this.props.url.replace('watch?v=', 'embed/') +
              '?rel=0&amp;showinfo=0'
            }
            frameBorder="0"
            // @ts-ignore
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Video>
      </Wrapper>
    )
  }
}

export default VideoPlayer
