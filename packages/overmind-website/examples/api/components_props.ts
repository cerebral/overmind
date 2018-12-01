export default (ts) =>
  ts
    ? [
        {
          code: `
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
