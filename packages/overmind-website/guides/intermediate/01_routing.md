# Routing

With Overmind you can use whatever routing solution your selected view layer provides. This will most likely intertwine routing state with your component state, which is something Overmind would discourage, but you know... whatever you feel productive in, you should use :-) In this guide we will look into how you can separate your router from your components and make it part of your application state instead. This is more in the spirit of Overmind and throughout this guide you will find benefits of doing it this way.

We are going to use [page js](https://www.npmjs.com/package/page) as the router and we will look at a complex routing example where we open a page with a link to a list of users. When you click a user in the list we will show that user in a modal with the url updating to the id of the user. In addition we will present a query parameter that reflects the current tab inside the modal.

We will start with a simple naive approach and then we are going to tweak our approach a little bit for the optimal solution.

## Set up the app

Before we go into the router we want to set up the application. We have some state helping us express the UI explained above. In addition we have four actions.

1. **showHomePage** tells our application to set the current page to *home*
2. **showUsersPage** tells our application to set the current page to *users* and fetches the users as well
3. **showUserModal** tells our application to show the modal by setting an id of a user passed to the action
4. **changeUserModalTab** tells our application to change the current tab of the user modal using the passed index

```marksy
h(Example, { name: "guide/routing/setup" })
```

We are not going into details on exactly how the state is set and how the data is fetched, that is the beauty of having a declarative concept to describe logic. We can talk about logic without implementing.

## Initialize the router

**Page js** is pretty straight forward. We basically want to map a url to trigger an action. We can do so simply by:

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

A straight forward way to solve this is to simply compose in the **showUsers** action to the **showUser** action. This will ensure that we get to the correct page, we get our list of users to be displayed and then the logic for our modal runs.

```marksy
h(Example, { name: "guide/routing/compose" })
```

But we could actually make this better. There is no reason to wait for the list of users to load before we load the specific user for the modal. We can do that in **parallel**. Let us change out the logic a little bit so that we run both actions. Now the list of users and the single user loads at the same time. That makes sense as loading a single user is probably faster than loading the whole list.

```marksy
h(Example, { name: "guide/routing/parallel" })
```

## The tab query param

**Page js** also allows us to manage query strings, the stuff after the **?** in the url. Page js does not parse it though, so we introduce a library which does just that, [query-string](https://www.npmjs.com/package/query-string). With this we can update our route to also pass in any query params.


```marksy
h(Example, { name: "guide/routing/query" })
```

## Summary

With very little effort we were able to build a custom "**application state first**" router for our application. Like many common tools needed in an application, like talking to the server, local storage etc., there are often small differences in the requirements. And even more often you do not need the full implementation of the tool you are using. By using simple tools you can meet the actual requirements of the application more "head on".