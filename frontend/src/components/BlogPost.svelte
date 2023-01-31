<script lang="ts">
    import Comment from "./subcomponents/Comment.svelte";

</script>
<style lang="sass">
    #newcomment
        border:1px solid black
        border-radius:0.25rem
        background-color: #ffcc95
        padding:10px
    #newcomment input
        border:1px solid black
        border-radius: 0.25rem 0 0 0.25rem 
    #newcomment button
        border:1px solid black
        background-color: #ea9e60
        border-radius: 0 0.25rem 0.25rem 0
</style>
<!-- Content -->

<main>
    <div id="post">

    </div>
    <div id="newcomment" class=" col-lg-8 col-md-8 col-11 mx-auto mt-3">
        <div class="input-group ">
            <input type="text" name="message" id="message" class="form-control">
            <button type="button" class="btn bi bi-send input-group-text"></button>
        </div>
    </div> 
    <Comment Data={{username:"Béla",date:"2023-01-30",text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel sint sequi sit voluptate culpa id, similique natus minus odit, minima doloremque tenetur nostrum at eos! Necessitatibus explicabo aperiam illum."}}/>
</main>