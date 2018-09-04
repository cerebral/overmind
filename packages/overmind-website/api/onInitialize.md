# OnInitialize

If you need to run logic as the application initializes you can use the **onInitialize** hook. This is defined as an action.

```marksy
h(Example, { name: "api/onInitialize" })
```

Overmind will first run any module defined onInitialize in parallel. After that the main onInitialize runs. You can see this in the devtools as well. The reason it works this way is because you module defined onInitialize indicates that you want to prepare something related to that module specifically, you do not care about the rest. The root onInitialize covers all the modules and allows you to orchestrate logic when those are indeed ready.