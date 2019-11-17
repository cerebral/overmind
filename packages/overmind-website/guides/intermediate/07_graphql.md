# Graphql

Using Graphql with Overmind gives you the following benefits:

- **Query:** The query for data is run with the rest of your application logic, unrelated to mounting components
- **Cache:** You integrate the data from Graphql with your existing state, allowing you to control when new data is needed
- **Optimistic updates:** With the data integrated with your Overmind state you can also optimistically update that state before running a mutation query

```marksy
h(Notice, null, "The Graphql package does not support **subscriptions** currently")
```

## Get up and running

Install the separate package:

```
npm install overmind-graphql
```

### Initial state

The Graphql package is a *configuration factory*. That means you need some existing configuration before going:

```marksy
h(Example, { name: "guide/graphql/config.ts" })
```

### The factory

Now let us introduce the factory:

```marksy
h(Example, { name: "guide/graphql/factory.ts" })
```

You define **queries** and **mutations** as part of the second argument to the factory, with what **endpoint** you want to connect to. These queries and mutations are converted into Overmind effects that you can call from your actions.

## Query

To call a query you will typically use an action. Let us create an action that uses our **posts** query.

```marksy
h(Example, { name: "guide/graphql/posts.ts" })
```

## Mutate

Mutation queries are basically the same as normal queries. You would typically also call these from an action.

```marksy
h(Example, { name: "guide/graphql/create_post.ts" })
```

## Cache

Now that we have the data from our query in the state, we can decide ourselves when we want this data to update. It could be related to moving back to a certain page, maybe you want to update the data in the background or maybe it is enough to just grab it once. You do not really think about it any differently here than with any other data fetching solution.

## Optimistic updates

Again, since our data is just part of our state we are in complete control of optimistically adding new data. Let us create an optimistic post.

```marksy
h(Example, { name: "guide/graphql/optimistic_post.ts" })
```

## Options

There are two points of options in the Graphql factory. The **headers** and the **options**.

The headers option is a function which receives the state of the application. That means you can produce request headers dynamically. This can be useful related to authentciation.

```marksy
h(Example, { name: "guide/graphql/headers.ts" })
```

The options are the options passed to [graphql-request](https://github.com/prisma-labs/graphql-request).

```marksy
h(Example, { name: "guide/graphql/options.ts" })
```

## Generate typings

It is possible to generate all the typings for the queries and mutations. This is done by using the [apollo](https://www.apollographql.com/) project CLI. Install it with:

```
npm install apollo --save-dev
```

Now you can create a script in your **package.json** file that looks something like:

```json
{
  "scripts": {
    "schema": "apollo schema:download --endpoint=http://some-endpoint.dev graphql-schema.json && apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --includes=src/overmind/**/*.ts --tagName=gql --no-addTypename --globalTypesFile=src/overmind/graphql-global-types.ts graphql-types"
  }
}
```

To update your types, simply run:

```
npm run schema
```

Apollo will look for queries defined with the **gql** template tag and automatically produce the typings. That means whenever you add, remove or update a query in your code you should run this script to update the typings. It also produces what is called **graphql-global-types**. These are types related to fields on your queries, which can be used in your state definition and/or actions.

## Optimize query

It is possible to transpile the queries from strings into code. This reduces the size of your bundle, though only noticeably if you have a lot of queries. This can be done with the [babel-plugin-graphql-tag](https://github.com/gajus/babel-plugin-graphql-tag).