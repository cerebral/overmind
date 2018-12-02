export default (ts) =>
  ts
    ? [
        {
          code: `
import { h, Component, useState } from 'overmind-components'

const ChooseColor: Component = () => {
  const [color, setColor] = useState('blue')

  function changeColor () {
    if (color === 'blue') {
      setColor('red')
    } else {
      setColor('blue')
    }
  }

  return <ShowColor color={color} onClick={changeColor} />
}
`,
        },
      ]
    : [
        {
          code: `
import { h, useState } from 'overmind-components'
        
const ChooseColor = () => {
  const [color, setColor] = useState('blue')

  function changeColor () {
    if (color === 'blue') {
      setColor('red')
    } else {
      setColor('blue')
    }
  }

  return <ShowColor color={color} onClick={changeColor} />
}
`,
        },
      ]
