# Structuring the app

You will quickly see the need to give more structure to your application. The base structure of

`{ state, actions, effects }`

does not scale very well.

The abovementioned base structure is called **the configuration** of your application and tools are provided to create more complex configurations. But before we look at those tools, let's talk about file structure.

## Domains

As your application grows you start to separate it into different domains. A domain might be closely related to a page in your application, or maybe it is strictly related to managing some piece of data. It does not matter. You define the domains of your application and they probably change over time as well. What matters in the context of Overmind though is that each of these domains will contain their own state, actions and effects. So imagine a file structure of:

```marksy
h(Example, { name: "guide/structuringtheapp/files" })
```

In this structure we are splitting up the different components of the base structure. This is a good first step. The **index** file acts as the file that brings the state, actions and effects together.

But if we want to split up into actual domains it would look more like this:

```marksy
h(Example, { name: "guide/structuringtheapp/domains" })
```

In this case each domain **index** file bring its own state, actions and effects together and the **overmind/index** file is responsible for bringing the configuration together.

```marksy
h(TypescriptNotice, null, "Note that you do not define a **Config**, **Action** etc. type for each domain of your application. Only the main file that instantiates Overmind has this typing. This allows all the domains of the application to know about each other.")
```

## The state file

You will typically define your **state** file by exporting a single constant named *state*.

```marksy
h(Example, { name: "guide/structuringtheapp/state" })
```

## The actions file

The actions are exported individually by giving them a name and a definition. Actions that are considered private are typically put into their own file named **internalActions**.

```marksy
h(Example, { name: "guide/structuringtheapp/actions" })
```

```marksy
h(TypescriptNotice, null, "Note that there are two action types, **Action** and **AsyncAction**")
```

## The effects file

The effects are also exported individually where you would typically organize the methods in an object, but this could have been a class instance or just a plain function as well.

```marksy
h(Example, { name: "guide/structuringtheapp/effects" })
```

## Bring it together

Now let us export the state, actions and effects for each module and bring it all together into a **namespaced** configuration.

```marksy
h(Example, { name: "guide/structuringtheapp/namespaced" })
```

We used the **namespaced** function to put the state, actions and effects from each domain behind a key. In this case the key is the same as the name of the domain itself. This is an effective way to split up your app. 

You can also combine this with the **merge** tool to have a top level domain.

```marksy
h(Example, { name: "guide/structuringtheapp/merge_namespaced" })
```

```marksy
h(Notice, null, "Even though you split up into different domains each domain has access to the state of the whole application. This is an important feature of Overmind which allows you to scale up and explore the domains of the application without having to worry about isolation.")
```
