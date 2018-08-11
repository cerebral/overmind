import * as React from 'react'
import { Wrapper, Guide } from './elements'
import { TGuide } from '../App'

type Props = {
  guides: TGuide[]
  isLoading: boolean
}

const Guides: React.SFC<Props> = ({ guides }) => (
  <Wrapper>
    {guides.map((guide) => (
      <Guide
        key={guide.fileName}
        href={`/guides/${guide.fileName.split('.')[0]}`}
      >
        {guide.title}
        <span>{guide.type}</span>
      </Guide>
    ))}
  </Wrapper>
)

export default Guides
