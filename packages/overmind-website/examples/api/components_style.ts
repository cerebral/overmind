export default (ts) =>
  ts
    ? [
        {
          code: `
const MyComponent: Component = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    const onMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      })
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])
  
  return (
    <h1 style={{
      top: position.y + 'px',
      left: position.x + 'px'
    }}>
      I follow the mouse
    </h1>
  )
}
`,
        },
      ]
    : [
        {
          code: `
const MyComponent = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    const onMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      })
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])
  
  return (
    <h1 style={{
      top: position.y + 'px',
      left: position.x + 'px'
    }}>
      I follow the mouse
    </h1>
  )
}
`,
        },
      ]
