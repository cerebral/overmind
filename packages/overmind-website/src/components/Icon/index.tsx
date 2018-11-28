import { h } from 'overmind-components'
import { Component } from '../../app'
import { icon, icons } from './styles'

const Icon: Component<{}, keyof typeof icons> = ({ children }) => (
  <span className={icon(String(children))} />
)

export default Icon
