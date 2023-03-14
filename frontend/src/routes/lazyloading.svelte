<script>
    export let component;
</script>

{#await component.then ? component : component()}
    <div class="spinner-border"></div>
{:then Cmp}
   <svelte:component this={Cmp.default} />
{/await}