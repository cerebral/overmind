<script>

    export let store

    const state = store.state

    $: count = $state.count
    let doubled = undefined
    store.reaction(
        (state) => state.count,
        (value) => {
            doubled = value * 2
        },
        {
            immediate: true
        }
    )
    
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>
<button id="increase" on:click={() => store.actions.increase()}>Increase</button>
<button id="decrease" on:click={() => store.actions.decrease()}>Increase</button>