import { h } from 'overmind-components'
import { Component } from '../../app'
import { icon, icons } from './styles'

type Props = {
  children: keyof typeof icons
}

const Icon: Component<Props> = ({ children }) => (
  <span className={icon(String(children))} />
)

export default Icon
