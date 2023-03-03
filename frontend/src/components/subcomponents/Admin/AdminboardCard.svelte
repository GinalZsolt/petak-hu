<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let CardData: any;
    let dispatch = createEventDispatcher();
    function SendType(){
        dispatch("clicked",{
            title:CardData.title
        });
    }
</script>
<div
    class="dashboard-card m-3"
    style:--color1={CardData.fromColor}
    style:--color2={CardData.toColor}
    data-bs-toggle="modal" data-bs-target="#statisticsModal"
    on:click={SendType}
    on:keypress={()=>{}}
>
    <div class="h-100 d-flex justify-content-between p-2">
        <h2 class="fs-1 align-self-start">{CardData.title}</h2>
        <i class={`display-1 bi bi-${CardData.icon} align-self-end`} />
    </div>
</div>
<style lang="sass">
    @function gradient($fromColor, $toColor)
        @return linear-gradient(172deg, $fromColor, $toColor)
    .dashboard-card
        color: white
        text-decoration: none
        cursor: pointer !important
        background: gradient(var(--color1), var(--color2))
        border-radius: 0.5rem
        height: 200px
        .bi
            color: #0000004f
        h2
            max-width: 123px
</style>