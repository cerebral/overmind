import { createElement, SFC } from 'react'
import { icon } from './styles'

type Props = {
  children: string
}

const Icon: SFC<Props> = ({ children }) => (
  <span className={icon(String(children))} />
)

export default Icon
