# Components

Overmind ships with its own view layer, called **overmind-components**. It delivers an experience where the connection and tracking of state between Overmind and the components is completely transparent.

## component

All components are defined as plain functions.

```marksy
h(Example, { name: "api/components_component"})
```

## events

Overmind components uses event delegation to optimize event management. There is only a single event listener for each type of event, but the event acts as if it was triggered on the element you defined it. That means **currentTarget** points to the element where you registered the listener and **target** points to the element that caused the event to trigger.

Any event you want to manage you just prefix with **on**, like *onClick*, *onInput* or *onSubmit*.

```marksy
h(Example, { name: "api/components_events"})
```

```marksy
h(Notice, null, "Even though event delegation is used **stopPropagation** still acts as expected")
```

## jsx

The syntax used to define UI composition is called **jsx**. This is included in Typescript and can be added with the [babel plugin for jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) if using traditional Javascript.

Jsx is **not** html. Actually jsx is transformed into the following Javascript:

```marksy
h(Example, { name: "api/components_jsx"})
```

That means everything is Javascript at the end of the day and that is exactly what makes jsx so powerful. There is no special template syntax and limitations of that. You can use plain Javascript to do whatever you want. Jsx is just a more declarative way of expressing the element and component composition.

## keys

Keys is a way to uniquely identify elements and components. This becomes useful in two scenarios:

1. To cache elements and components in lists to reduce amount of reconciliation required. It is a good convention to always give keys when you work with lists
2. Force a component to unmount and mount a new one every time the key change

```marksy
h(Example, { name: "api/components_keys"})
```

## props

You can pass properties to components. The component is optimized in such a way that it will only update if any of the props change, or if any accessed state changes. You can also pass functions as props.

```marksy
h(Example, { name: "api/components_props"})
```

## render

The render function allows you to render your UI structure to a target element. You also pass the render function an Overmind application instance which is how state and actions is exposed to all components.

```marksy
h(Example, { name: "api/components_render"})
```

## style

With **jsx** you define styles as an object. That does not mean you should define all the styling of your application this way. There are several solutions for managing CSS and styling, though when you do want to inline styles you define it as an object.

```marksy
h(Example, { name: "api/components_style"})
```

## useEffect

The **useEffect** hook allows you to run arbitrary logic when the component mounts and optionally whenever it rerenders. You can also control when the effect runs again by referencing one or multiple values. If the values change, the effect runs again. You can return a function from the effect which runs whenever the effect is rererun or the component unmounts. This is typically used to clean up the effect.

```marksy
h(Example, { name: "api/components_useEffect"})
```

## useOvermind

To expose Overmind state and actions to your component use this hook.

```marksy
h(Example, { name: "api/components_useOvermind"})
```

## useRef

Sometimes you need to reference an actual element. Maybe you need to mount something from a library on the element or you want to mutate it directly. To get a reference to the element use **useRef**.

```marksy
h(Example, { name: "api/components_useRef"})
```

## useState

To define and manage internal state in components you can use the **useState** hook.

```marksy
h(Example, { name: "api/components_useState"})
```

