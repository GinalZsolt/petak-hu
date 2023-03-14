<script>
    export let component;
</script>
<style lang="sass">
    .spinner-border
        position: absolute
        top: 50%
        left: 50%
</style>
{#await component.then ? component : component()}
    <div class="spinner-border"></div>
{:then Cmp}
   <svelte:component this={Cmp.default} />
{/await}