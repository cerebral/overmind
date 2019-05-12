# Get started with Overmind

If you are moving from an existing state management solution, please read the release article [Reducing the pain of developing apps](https://medium.com/@christianalfoni/reducing-the-pain-of-developing-apps-cd10b2e6a83c).

To get started with Overmind you have to set up a project. You can do this with whatever tool your framework of choice provides or you can use [webpack](https://webpack.js.org/) or [parceljs](https://parceljs.org/). You can also use [codesandbox.io](https://codesandbox.io/) to play around with Overmind directly in the browser.

```marksy
h(Notice, null, "Due to using the Proxy feature of JavaScript, Overmind does not support **Internet Explorer 11**.")
```


When you have your project up and running install the Overmind dependency by using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/):

```marksy
h(Example, { name: "guide/getstarted/install" })
```

```marksy
h(TypescriptNotice, null, "Overmind requires Typescript version **3.2** or above")
```

Great, we are good to go!

## Our first state

Applications are about state and we are going to introduce our first state, **count**. But we are not going to introduce this state through a component. We are going to take on the perspective of [UI as an implementation detail](). That means we will run the Overmind development tool and connect to our application from that. There is no need to open up the browser.

But first we have to create an instance of Overmind in our code. We define our application configuration in an **overmind** folder and instantiate Overmind in our main **entry** file:

```marksy
h(Example, { name: "guide/getstarted/createapp" })
```

Now that we have our instance make sure the application is running and open up the Overmind devtool by:

```marksy
h(Example, { name: "guide/getstarted/run_devtool" })
```

This will install and open up the development tool. You should see something like this when you connect to your application:

![open_devtool](/images/devtool_count.png)

Now that we have our state in place, lets change it.

## Changing state

In Overmind you define your logic as **actions**. The action we are going to create should receive a number that we use to change the current count state.

```marksy
h(Example, { name: "guide/getstarted/changestate" })
```

To trigger this action, go to the **actions** tab in the development tool and run it by passing a number. As we can see, the count state changed as expected.

![open_devtool](/images/devtool_change.png)


## Creating effects

 State management tools has a tendency to end their introduction here, but Overmind helps you manage one more important ingredient, **effects**. An effect, or side effect, is everything from doing http requests to storing data in local storage. What Overmind helps you with is separating the generic low level APIs of using effects from your actual application logic inside actions. Let us look at an example. We are going to add a sound when we change the count:

```marksy
h(Example, { name: "guide/getstarted/effect" })
```

As you can see we separated the low level generic code of creating a sound from our actual application logic in the action. Think of effects as the API you custom tailor to your application. This improves the readability of your application logic inside actions, you can easily test effects and they can also be mocked out in tests.

With our effect in place, let us run the action again:

![open_devtool](/images/devtool_effect.png)

You most likely heard a "bip" and we can also see that the effect was called as expected. Great! Click several times and you should hear the bip changing.

## Implementing UI

Now that we know our application works as expected we can actually produce the UI for it, though maybe this application does not have a UI? Maybe it is just an app running on some embedded device that creates an increasingly annoying sound when you hit a button? Nevertheless, let us see how you would consume the state and actions of this application in your UI framework of choice.

First let us disconnect the devtools from our application so that when we fire up the browser we rather debug from the browser runtime:

![open_devtool](/images/devtool_disconnect.png)

Now open your browser and implement a UI something like this:

```marksy
h(Example, { name: "guide/getstarted/connectapp" })
```

When you now opened the application in the browser it automatically connected to the devtools and the debugging experience continues.


## Devtools

You can also explicitly install the devtools with

`npm install overmind-devtools`

and rather:

```marksy
h(Example, { name: "guide/getstarted/devtools_explicit" })
```

This allows you to control the version you want to use.

You can even:

```marksy
h(Example, { name: "guide/getstarted/devtools_concurrent" })
```

By installing the [concurrently](https://www.npmjs.com/package/concurrently) package you can start your development process and the devtools at the same time.

The Overmind devtools provides us with a pretty amazing experience. We get insights into all the state, changes to that state, actions run, which side effects are run and general stats. This visual overview becomes more and more valuable as complexity increases. 

To connect to the devtools simply start the devtools application and connect directly to your app, or open the app in a browser. If you need to configure where it connects, please look at the [API section](/api/overmind).

## Hot Module Replacement

A popular concept introduced by Webpack is [HMR](https://webpack.js.org/concepts/hot-module-replacement/). It allows you to make changes to your code without having to refresh. Overmind automatically supports HMR. That means when **HMR** is activated Overmind will make sure it updates and manages its state, actions and effects. Even the devtools will be updated as you make changes.

## Summary

You have now stepped your toes into Overmind. We introduced Overmind with the concept of thinking the UI as an implementation detail. If this does not rock your boat you can of course develop your application as normal with the browser, but now you know that it can be separated. Please continue reading guides to learn more about how Overmind scales.
