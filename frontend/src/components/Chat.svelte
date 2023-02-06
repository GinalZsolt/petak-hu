<script lang="ts">
 import ChatMessage from "./subcomponents/Chat/chatMessage.svelte";
 import ChatBar from "./subcomponents/Chat/chatBar.svelte";
 let newMessage:string = "";
</script>
<style lang="sass">
    main
        height: 500px
    aside
        border-right: var(--bs-dark) 1px solid
        padding: 0
</style>
<main>
    <div class="container-fluid row">
        <aside class="col-lg-3 col-md-4 col-2">
            <ChatBar Profile={{
                name:"János",
                picUrl: "/test.png"
            }} />
        </aside>
        <div id="chat" class="col-lg-9 col-md-8 col-10">
            <div class="input-group mx-auto">
                <input class="form-control" type="text" value={newMessage}>
                <label class="input-group-text"><i class="bi bi-send"></i></label>
            </div>  
        </div>
    </div>
</main>