import * as React from 'react'
import { Content, Edit } from './elements'

type Props = {
  url: string
}

const Doc: React.SFC<Props> = ({ url, children }) => (
  <Content>
    <Edit href={url} target="_blank">
      edit on github
    </Edit>
    {children}
  </Content>
)

export default Doc
