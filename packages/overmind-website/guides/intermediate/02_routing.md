# State first routing

With Overmind you can use whatever routing solution your selected view layer provides. This will most likely intertwine routing state with your component state, which is something Overmind would discourage, but you know... whatever you feel productive in, you should use :-) In this guide we will look into how you can separate your router from your components and make it part of your application state instead. This is more in the spirit of Overmind and throughout this guide you will find benefits of doing it this way.

We are going to use [page js](https://www.npmjs.com/package/page) as the router and we will look at a complex routing example where we open a page with a link to a list of users. When you click a user in the list we will show that user in a modal with the url updating to the id of the user. In addition we will present a query parameter that reflects the current tab inside the modal.

We will start with a simple naive approach and then we are going to tweak our approach a little bit for the optimal solution.

And yeah... we are going fully functional on this one!

## Set up the app

Before we go into the router we want to set up the application. We have some state helping us express the UI explained above. In addition we have three actions.

1. **showHomePage** tells our application to set the current page to *home*
2. **showUsersPage** tells our application to set the current page to *users* and fetches the users as well
3. **showUserModal** tells our application to show the modal by setting an id of a user passed to the action. This action will also handle the switching of tabs later


```marksy
h(Example, { name: "guide/routing/setup" })
```

## Initialize the router

**Page js** is pretty straight forward. We basically want to map a url to trigger an action. To get started let us first add Page js as an effect and let us take the opportunity to create a custom API. When a url triggers we want to pass the params of the route to the action linked to the route:

```marksy
h(Example, { name: "guide/routing/effect" })
```

Now we can use Overminds **onInitialize** to configure the router. That way the initial url triggers before the UI renders and we get to set our initial state.

```marksy
h(Example, { name: "guide/routing/pagejs" })
```

Take notice here that we are actually passing in the params from the router, meaning that the id of the user will be passed to the action.

## The list of users

When we now go to the list of users the list loads up and is displayed. When we click a user the url changes, our **showUser** action runs and indeed, we see a user modal.


```marksy
h(Example, { name: "guide/routing/users" })
```


But what if we try to refresh now... we get an error. The router tries to run our user modal, but we are on the frontpage. The modal does not exist there. We want to make sure that when we open a link to a user modal we also go to the actual user list page.

## Composing actions

A straight forward way to solve this is to simply also change the page in the **showUserModal** action, though we would like the list of users to load in the background as well. The logic of **showUsers** might also be a lot more complex and we do not want to duplicate our code. When these scenarios occur, where you want to start calling actions from actions, it indicates you have reached a level of complexity where a functional approach might be better. We will explore that now. 

```marksy
h(Example, { name: "guide/routing/compose" })
```

By splitting up all our logic into operators we were able to make our actions completely declarative and at the same time reuse logic across them. The *operators* file gives use maintaineable code and the *actions* file gives us readable code.

We could actually make this better though. There is no reason to wait for the user of the modal to load before we load the users list in the background. We can fix this with the **parallel** operator. Now the list of users and the single user loads at the same time.

```marksy
h(Example, { name: "guide/routing/parallel" })
```

Now you are starting to see how the operators can be quite useful to compose flow. This flow is also reflected in the development tool of Overmind.

## The tab query param

**Page js** also allows us to manage query strings, the stuff after the **?** in the url. Page js does not parse it though, so we introduce a library which does just that, [query-string](https://www.npmjs.com/package/query-string). With this we can update our router to also pass in any query params.


```marksy
h(Example, { name: "guide/routing/query" })
```

Now we can simply add an operator which uses this **tab** query to set the current tab and then compose it into the action.

```marksy
h(Example, { name: "guide/routing/tab" })
```


## Summary

With little effort we were able to build a custom "**application state first**" router for our application. Like many common tools needed in an application, like talking to the server, local storage etc., there are often small differences in the requirements. And even more often you do not need the full implementation of the tool you are using. By using simple tools you can meet the actual requirements of the application more "head on" and this was an example of that.