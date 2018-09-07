import * as React from 'react'
import { IconElement } from './elements'

type Props = {
  children: string
}

const Icon: React.SFC<Props> = ({ children }) => <IconElement icon={children} />

export default Icon
