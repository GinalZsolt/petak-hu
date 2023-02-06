<div class={ isOwn?"own chatmessage":"enduser chatmessage"}>
    {#if isOwn}
        <div class="spacer"></div>
    {/if}
    <div>
        <h6>{ Message.username }</h6>
        <p class="rounded-pill">{ Message.message }</p>
    </div>
    {#if !isOwn}
        <div class="spacer"></div>
    {/if}
</div>


<style lang="sass">
    .own
        text-align: right
        p
            background: linear-gradient(135deg, #ea9e60, #fb8b30)
    .enduser
        text-align: left
    .chatmessage
        display: flex
        h6
            color: #7c7c7c
            margin-bottom: 0
            margin-left:0.75rem
            padding-right: 0.75rem
        p
            background-color: #e0e0e0
            border: 2px solid #0000000f
            padding-left: 0.75rem
            padding-right: 0.75rem
            padding-top: 0.25rem
            padding-bottom: 0.25rem

        .spacer
            flex-grow: 1
            width: 67px
</style>


<script lang="ts">
    interface Chat{
        username:string;
        message:string;
    }

    export let Message:Chat, isOwn:boolean;

</script>