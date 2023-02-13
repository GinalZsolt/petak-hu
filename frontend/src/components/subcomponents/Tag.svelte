  
<script lang="ts">
    export let Tag:any={}
    export let TagDel:boolean=false

    function Delete(){

    }
</script>

<style lang="sass">
    .tag
        background: #ea9e60
        border-radius:0.5rem
        padding: 5px
        border: 1px solid black
</style>

<div class="tag m-auto mb-1">
    <span>{Tag.category}</span>:<span>{Tag.content}</span> {#if TagDel}<input type="button" class="btn-close" on:click={Delete}>{/if} 
</div>
