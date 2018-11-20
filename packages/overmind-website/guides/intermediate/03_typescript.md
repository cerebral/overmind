# Typescript

Overmind is written in Typescript and it is written with a focus on your keeping as little time as possible helping Typescript understand what your app is all about. Typescript will spend a lot more time helping you. There are actually two approaches to typing in Overmind.

## 1. Declare module

The most straight forward way to type your application is to use the **declare module** approach. This will work for most applications, but might make you feel uncomfortable as a harcore Typescripter. The reason is that we are overriding an internal type, meaning that you can only have one instance of Overmind running inside your application.

```marksy
h(Example, { name: "guide/typescript/declare.ts" })
```

Now you can import any type directly from Overmind and it will understand the configuration of your application. Even the operators are typed.

```marksy
h(Example, { name: "guide/typescript/declare_imports.ts" })
```

## 2. Explicit typing
You can also explicitly type your application. This gives more flexibility.

```marksy
h(Example, { name: "guide/typescript/explicit.ts" })
```

If you use the **operators** api you just pass the config as the last type argument.

```marksy
h(Example, { name: "guide/typescript/explicit_operators.ts" })
```