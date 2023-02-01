<script lang="ts">
    export let CardData: any;
</script>

<a href={CardData.href}
    ><div
        class="dashboard-card m-3"
        style:--color1={CardData.fromColor}
        style:--color2={CardData.toColor}
    >
        <div class="h-100 d-flex justify-content-between py-1">
            <h2 class="display-2 align-self-start">{CardData.title}</h2>
            <i class="display-1 bi bi-chat-left align-self-end" />
        </div>
    </div></a
>

<style lang="sass">
    @function gradient($fromColor, $toColor)
        @return linear-gradient(172deg, $fromColor, $toColor)
    a
        color: white
        text-decoration: none
    .dashboard-card
        background: gradient(var(--color1), var(--color2))
        border-radius: 0.5rem
        height: 200px
        position: relative
        .bi
            color: #0000004f
</style>
