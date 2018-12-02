import { h, Component } from 'overmind-components'
import { icon } from './styles'

type Props = {
  children: string
}

const Icon: Component<Props> = ({ children }) => (
  <span className={icon(String(children))} />
)

export default Icon
