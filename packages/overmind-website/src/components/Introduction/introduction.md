# Welcome to Overmind

In this introduction you will get an overview of Overmind and how you can think about application development. We will be using [React](https://reactjs.org/) to write the UI, but you can use Overmind with [Vue](https://vuejs.org/) and [Angular](https://angular.io) if either of those is your preference.

```marksy
h(Notice, null, "If you rather want to go right ahead and set up a local project, please have a look at the [quickstart](/guides/beginner/01_quickstart) guide.")
```

Before we move on, have a quick look at this sandbox. It is a simple counter application and it gives you some foundation before talking more about Overmind and building applications.

```marksy
h(Sandbox, {
  id: 'overmind-counter-c4tuh',
  module: '/src/index.js'
})
```

## Application state VS Component state

First of all we have to talk about **application** and **component** state. In the counter example above we chose to define our **count** state as application state, outside of the component. We could have defined the count inside the component instead and the application would work exactly the same. So why did we choose application state?

If the count example above was the entire application it would not make any sense to introduce application state and Overmind. But if you were to increase the scope of this simple application you would be surprised how quickly you get into the following scenarios:

1. **You want to introduce an other component that needs to know about the current state of the count.** This new component can not be a parent of the component owning the count state. It can not be a sibling either. It has to be a child. If it is not an immediate child the count state has to be passed down the component tree until it reaches your new component.
2. **You want to remember the count, even though it is not shown in the UI**. Your count is behind one of multiple tabs in the UI. When the user changes the tabs you do not want the count to reset. The only way to ensure this is to move the count state up to a parent component that is no longer a child of the tab and then pass the count state back down again.
3. **You want to change the count from a side effect**. You have a websocket connection which changes the count when a message is received. If you want to avoid this websocket connection to open and close as the component mounts and unmounts you will have to move the websocket connection up the component tree.
4. **You want to change the count as part of a flow**. When you click the increase count button you need to change both the count state and an other state related to a different part of the UI. To be able to change both states at the same time, they have to live inside the same component, which has to be a parent of both components using the state.

Introducing these scenarios we said: **You want**. In reality we rarely know exactly what we want. We do not know how our state and components will evolve. And this is the most important point. By using application state instead of component state you get flexibility to manage whatever comes down the road without having to refactor wrong assumptions.

**So is component state bad?** No, certainly not. You do not want to overload your application state with state that could just as well have been component state. The tricky thing is to figure out when that is absolutely the case. For example:

1. **Modals should certainly be component state?** Not all modals are triggered by a user interaction. A profile modal might be triggered by clicking a profile picture, but also open up when a user opens the application and is missing information.
2. **The active tab should certainly be component state?** The active tab might be part of the url query, `/user?tab=count`. That means it should rather be a hyperlink where your application handles the routing and provides state to identify the active tab.
3. **Inputs should certainly be component state?** If the input is part of an application flow, you might want to empty out the content of that input, or even change it to something else.

How you want to go about this is totally up to you. We are not telling you exactly how to separate application and component state. What we can tell you though; **"If you lean towards application state your are more flexible to future changes"**.

## Defining state

As you can see in the count example we added a state object when we created the instance.

```ts
createOvermind({
  state: {
    count: 0
  },
  ...
})
```

This state object will hold all the application state, we call it a *single state tree*. That does not mean you define all the state in one file and we will talk more about that later. For now lets talk about what you put into this state tree.

A single state tree favours serializable state. That means state that can be `JSON.parse` and `JSON.stringify` back and forth. It can be safely passed between the client and the server, localStorage or to web workers. You will use **strings**, **numbers**, **booleans**, **arrays**, **objects** and **null**. Overmind does not prevent you from using other complex objects, but it is encouraged to use these core data types.

## Defining actions

When you need to change your state you define actions. Overmind only allows changing the state of the application inside the actions. An error will be thrown if you try to change the state inside a component. The actions are plain functions/methods. The only thing that makes them special is that they all receieve a preset first argument, called **the context**:

```ts
createOvermind({
  state: {
    count: 0
  },
  actions: {
    increaseCount({ state }) {
      state.count++;
    },
    decreaseCount({ state }) {
      state.count--;
    }
  }
})
```

Here we can see that we [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the context to grab the **state**. You can also access other actions on the context:

```ts
createOvermind({
  state: {
    count: 0
  },
  actions: {
    increaseCount({ state, actions }) {
      state.count++;
      actions.decreaseCount()
    },
    decreaseCount({ state }) {
      state.count--;
    }
  }
})
```

And as we will see later you will also be using **effects** from the context.

## Increasing complexity

Now we will move to a more complex example. Please have a look:

```marksy
h(Sandbox, {
  id: 'overmind-todomvc-simple-097zs',
  module: '/src/app.js'
})
```

We have now separated out the Overmind related logic into its own file, **app.js**. This file creates the Overmind instance and also exports how the components will interact with the state and the actions, the hook called **useApp**. Vue and Angular has other mechanisms conventional to those frameworks where application state and actions can be accessed. 

## References

What to take notice of is how we store the **todos** of this application.

```ts
createOvermind({
  state: {
    ...
    todos: {},
    ...
  },
  ...
})
```

It is just an empty object. You might intuitively think of a list of todos as an array. Not blaming you, it makes total sense. That said, when you work with entities that has a unique identifier, typically an *id* property, you are better off storing them in an object. Each key in this object will be the unique identifier of a todo. For example:

```ts
{
  'todo-1': {
    id: 'todo-1',
    title: 'My Todo',
    completed: false
  },
  'todo-2': {
    id: 'todo-2',
    title: 'My Other Todo',
    completed: true
  },
}
```

When you need to reference a todo, for example a component wants to reference a todo to toggle its completed state or maybe delete one, you will pass "todo-1" or "todo-2" as a reference instead of the todo itself.

Working with references this way avoids logic where you need to **find** a todo in an array or **filter**/**splice** out a todo to delete it from an array. You simply just point to the todos state to grab or delete it:

```ts
state.todos[myReference]

delete state.todos[myReference]
```

Using references also ensures that only one instance of any todo will live in your state tree. The todo itself lives on the **todos** state, while everything else in the state tree references a todo by using its id. For example our **editingTodoId** state uses the id of a todo to reference which todo is currently being edited.

## Deriving state

Looking through the example you have probably noticed these:

```ts
createOvermind({
  state: {
    ...,
    currentTodos: ({ todos, filter }) => {
      return Object.values(todos).filter(todo => {
        switch (filter) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      });
    },
    activeTodoCount: ({ todos }) => {
      return Object.values(todos).filter(todo => !todo.completed).length;
    },
    hasCompletedTodos: ({ todos }) => {
      return Object.values(todos).some(todo => todo.completed);
    },
    isAllTodosChecked: ({ currentTodos }) => {
      return currentTodos.every(todo => todo.completed);
    },
  },
  ...
})
```

Our state tree is concerned with state values that you will change using actions. But you can also automatically produce state values based on existing state. An example of this would be to list the **currentTodos**. It uses the todos and filter state to figure out what todos to actually display. Sometimes this is called computed state. We call it **derived** state.

Any function you insert into the state tree is treated as derived state. That means these functions receives a preset first argument which is the immediate state, the state object the derived is attached to. In bigger applications you might also need to use the second argument, which is the root state of the application. It will automatically track whatever state you use and then flag itself as dirty whenever it changes. If derived state is used while being dirty, the function will run again. If it is not dirty a cached value is returned.

## Effects

Now let us move into an even more complex application. Here we have added **effects**. Specifically effects to handle routing, storing todos to local storage and producing unique ids for the todos. We have added an **onInitialize** hook which is a special function Overmind runs when the application starts.

```marksy
h(Sandbox, {
  id: 'overmind-todomvc-2im6p',
  module: '/src/app.js'
})
```

You can think of effects as a contract between your application and the outside world. You write an effect API of **what** your application needs and some 3rd party tool or native JavaScript API will implement **how** to provide it. Let us look at the router:

```ts
createOvermind({
  ...,
  effects: {
    ...,
    router: {
      initialize(routes) {
        Object.keys(routes).forEach(url => {
          page(url, ({ params }) => routes[url](params));
        });
        page.start();
      },
      goTo(url) {
        page.show(url);
      },
    },
  }
})
```

The router uses the [Page](https://www.npmjs.com/package/page) tool to manage routing. It takes a "url to action" option that makes sense for this application, but you could define this however you wanted.

```ts
effects.router.initialize({
  '/': () => actions.changeFilter('all'),
  '/active': () => actions.changeFilter('active'),
  '/completed': () => actions.changeFilter('completed'),
});
```

This argument passed is transformed into something Page can understand. What this means is that we can easily switch out Page with some other tool later if we wanted to, or maybe if the app ran in different environments you could change out the implementation of the router dynamically. We were also able to combine **page** and **page.start** behind one method, which cleans up our application code. We did the same for the **storage** effect. We use localStorage and JSON.parse/JSON.stringify behind a single method.

## Scaling up the application

Defining all the state, actions and effects on one object would not work very well for a large application. A convention in Overmind is to split these concepts into different files behind folders representing a domain of the application. In this next sandbox you can see how we split up state, actions and effects into different files. They are all exposed through a main file representing that domain, in this case "the root domain":

```marksy
h(Sandbox, {
  id: 'overmind-todomvc-split-xdh41',
  module: '/src/app/index.js'
})
```

Also notice that we have split up the instantiation of Overmind from the definition of the application. What this allows us to do is reuse the same application configuration for testing purposes and/or server side rendering. We separate the definition from the instantiation.

To scale up your code even more you can split it into **namespaces**. You can read more about that in the [structuring the app](/guides/beginner/06_structuringtheapp?view=react&typescript=true) guide.

## Get to know Typescript

Now that we have insight into the building blocks of Overmind it is time to introduce typing. If you are already familar with [Typescript](https://www.typescriptlang.org/) you will certainly enjoy the minimal typing required to get full type safety across your application. If you are unfamiliar with Typescript Overmind is a great project to start using it, for the very same reason.

Have a look at this new project where we have typed the application:

```marksy
h(Notice, null, "You have to **OPEN IN EDITOR** to get the full Typescript experience.")
```

```marksy
h(Sandbox, {
  id: 'overmind-todomvc-typescript-39h7y',
  module: '/src/app/actions.ts'
})
```

As you can see we only have to add an **Action** type to our functions and optionally give it an input type. This is enough for the action to give you all information about the application. Try changing some code and even add some code to see how Typescript helps you to explore the application and ensure that you implement new functionality correctly.

If you go to the **state.ts** file and change the type:

```ts
export type State = {
  ...,
  newTodoTitle: string
  ...
}
```

to:

```ts
export type State = {
  ...,
  todoTitle: string
  ...
}
```

You can now visit the **actions.ts** file and the **AddTodo.tsx** component. As you can see Typescript yells because the typing is now wrong. This is very powerful in complex projects which moves fast. The reason being that you can safely rename and refactor without worrying about breaking the code. 

To learn more about Overmind and Typescript read the [Typescript](/guides/beginner/05_typescript) guide.

## Development tool

Overmind also ships with its own development tool. It can be installed as a [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=christianalfoni.overmind-devtools-vscode) or installed as an NPM package. The development tool knows everything about what is happening inside the application. It shows you all the state, running actions and connected components. By default Overmind connects automatically to the devtool if it is running. Try now by going to the **index.tsx** file and change:

```ts
export const overmind = createOvermind(config, {
  devtools: false,
});
```

to:

```ts
export const overmind = createOvermind(config, {
  devtools: true,
});
```

Go to your terminal and use the NPM executor to instantly fire up the development tool.

```
npx overmind-devtools@latest
```

Refresh the sandbox preview and you should see the devtools populated with information from the application.

```marksy
h(Notice, null, "This only works in **CHROME** when running on codesandbox.io, due to domain security restrictions. It works on all browsers when running your project locally.")
```

![TodoMvc State](/images/todomvc_state.png)

Here we get an overview of the current state of the application, including our derived state. If we move to the next tab we get an overview of the execution. We have not triggered any actions yet, but our **onInitialized** hook has run and triggered some logic.

![TodoMvc Actions](/images/todomvc_actions.png)

Here we can see that we grabbing todos from local storage and initializing our router. We can also see that the router instantly fires off our **changeFilter** action causing a state change on the filter. At the end we can see that our reaction triggered, saving the todos.

```marksy
h(Notice, null, "You might wonder why the reaction triggered when it was defined after we changed the **todos** state. Overmind batches up changes to state and *flushes* at optimal points in the execution. For example when an action ends or some asynchronous code starts running. The reaction reacts to these flushes, just like components do.")
```

Moving on we also get insight into components looking at our application state:

![TodoMvc Components](/images/todomvc_components.png)

Currently two components are active in the application and we can also see what state they are looking at.

A chronological list of all state changes and effects run is available on the next tab. This can be useful with asynchronous code where actions changes state "in between" each other.

![TodoMvc History](/images/todomvc_history.png)

Now, let us try to add a new todo and see what happens.

![TodoMvc State](/images/todomvc_state2.png)

Our todo has been added and we can even see how the derived state was affected by this change. Looking at our actions tab we can see what state changes were performed and by hovering the mouse on the yellow label up right you get information about what components and derived were affected by state changes in this action.

![TodoMvc State](/images/todomvc_actions2.png)

## Managing complexity

Overmind gives you a basic foundation with its **state**, **actions** and **effects**. As mentioned previously you can split these up into multiple namespaces to organize your code. This manages the complexity of scaling. There is also a complexity of reusability and managing execution over time. The **operators** API allows you to split your logic into many different composable parts. With operators like **debounce**, **waitUntil** etc. you are able to manage execution over time. With the latest addition of **statecharts** you have the possiblity to manage the complexity of state and interaction. What interactions should be allowed in what states.

The great thing about Overmind is that none of these concepts are forced upon you. If you want to build your entire app in the root namespace, only using actions, that is perfectly fine. You want to bring in operators for a single action to manage time complexity, do that. Or do you have a concept where you want to safely control what actions can run in certain states, use a statechart. Overmind just gives you tools, it is up to you to determine if they are needed or not.

## Moving from here

We hope this introduction got you excited about developing applications and working with Overmind. From this point you can continue working with [codesandbox.io](https://codesandbox.io) or set up a local development flow. It is highly encouraged to use Overmind with Typescript, it does not get any more complex than what you see in this simple TodoMvc application.

Move over to the [quickstart](/guides/beginner/01_quickstart) to get help setting up your project. The other guides will give you a deeper understanding of how Overmind works. If you are lost please talk to us on [discord](https://discord.gg/YKw9Kd) and we are happy to help. And yeah... have fun! :-)