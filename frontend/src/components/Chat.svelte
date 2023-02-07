<script lang="ts">
 import ChatMessage from "./subcomponents/Chat/chatMessage.svelte";
 import ChatBar from "./subcomponents/Chat/chatBar.svelte";
 let newMessage:string = "";
 let isOpened:boolean = false;
</script>
<style lang="sass">
    main
        height: 500px
    aside
        border-right: var(--bs-dark) 1px solid
        padding: 0
    .ChatOpener
        transition: transform 0.1s
    .closed
        transform: rotate(0deg)
    .opened
        transform: rotate(180deg)
</style>
<main>
    <div class="container-fluid row">
        <aside class={`col-lg-3 col-md-4 ${isOpened?"asideClose":"col-2"}`}>
            <ChatBar Profile={{
                name:"János",
                picUrl: "/test.png",
                isOpen:isOpened
            }} />
            <button on:click={()=>isOpened=!isOpened} class={`ChatOpener d-block d-md-none mx-auto ${isOpened?"opened":"closed"}`}><i class="bi bi-arrow-right-square"></i></button>
        </aside>
        <div id="chat" class={`col-lg-9 col-md-8 col-10 ${isOpened?"d-none":""}`}>
            <div class="input-group mx-auto">
                <input class="form-control" type="text" bind:value={newMessage}>
                <button class="input-group-text btn btn-primary"><i class="bi bi-send"></i></button>
            </div>  
        </div>
    </div>
</main>