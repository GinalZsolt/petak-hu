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
        transition: transform 0.3s
    .closed
        transform: rotate3d(0, 1, 0, 0deg)
    .opened
        transform: rotate3d(0, 1, 0, 180deg)
    #messages
        height: 90%
        p
            margin-bottom:0
            border-radius: 50%
        .incoming
            background: #f48a18
        .outgoing
            background: #f4f4f4
</style>
<main>
    <div class="container-fluid row h-100">
        <aside class={`col-lg-3 col-md-4 ${isOpened?"asideClose":"col-2"}`}>
            <ChatBar Profile={{
                name:"János",
                picUrl: "/test.png",
                isOpen:isOpened
            }} />
            <hr class="my-0">
            <ChatBar Profile={{
                name:"János",
                picUrl: "/test.png",
                isOpen:isOpened
            }} />
            <button on:click={()=>isOpened=!isOpened} class={`ChatOpener d-block d-md-none mx-auto ${isOpened?"opened":"closed"}`}><i class="bi bi-arrow-right-square"></i></button>
        </aside>
        <div id="chat" class={`col-lg-9 col-md-8 col-10 mb-2 ${isOpened?"d-none":""}`}>
            <div class="mt-2" id="messages">
                <p class="incoming">asd</p>
                <p class="outgoing">asd</p>
            </div>
            <div class="input-group mx-auto mb-2">
                <input class="form-control" type="text" bind:value={newMessage}>
                <button class="input-group-text btn btn-primary"><i class="bi bi-send"></i></button>
            </div>  
        </div>
    </div>
</main>