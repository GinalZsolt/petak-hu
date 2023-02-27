<script lang="ts">
    import Comment from "./subcomponents/Comment.svelte";
    import type {BlogPost, Comment} from '../../interfaces/Blogpost';
    import {db} from '../../services/dbForum';
    import { onMount } from "svelte";
    import {Token, userPerms} from '../../stores';
    import axios from "axios";
    export let ID:number;
    let Comments;
    async function GetPost():Promise<BlogPost>{
        console.log(await db.GetBlogpost($Token.token, ID)[0])
        return (await db.GetBlogpost($Token.token, ID))[0]
    }
    function RefreshComments(){
        Comments ;
    }
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
    #post
        border:1px solid black
        border-radius:0.25rem
        background-color: #ffcc95
        padding:10px
    #post_image
        width:15%
    .input-group>button
        border:1px solid black
        background-color: #ea9e60
        border-radius:0.25rem

</style>
<!-- Content -->

<main>
    {#await GetPost()}
        <div class="spinner-border m-auto"></div>
    {:then Data}
        <div id="post" class="col-lg-8 col-md-8 col-11 mx-auto ">
            <img src="http://localhost:8080/img/{Data.imagefile}" id="post_image" class="float-end" alt="kép">
            <h2>{Data.title}</h2>
            <div id="authorinfo">
                <span>{Data.userID} - {new Intl.DateTimeFormat('hu-HU').format(new Date(Data.date))}</span>
            </div>
            <p>{Data.description}</p>
            {#if $userPerms.id==Data.userID}
            <div class="dropdown d-flex flex-row-reverse">
                <a class="btn btn-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><button class="dropdown-item">Lezárás</button></li>
                    <li><button class="dropdown-item">Törlés</button></li>
                </ul>
            </div>
            {/if}
        </div>
    {/await}
    <div id="newcomment" class=" col-lg-8 col-md-8 col-11 mx-auto mt-3">
        <div class="input-group ">
            <input type="text" name="message" id="message" class="form-control">
            <button type="button" class="btn input-group-text" on:click={RefreshComments}><i class="bi bi-send"></i></button>
        </div>
    </div> 
    {#await Comments}
    <div class="spinner-border"></div>
        {:then CommentsData} 
            {#each CommentsData as comment}
                <Comment Data={{username:comment,date:"2023-01-30",text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vel sint sequi sit voluptate culpa id, similique natus minus odit, minima doloremque tenetur nostrum at eos! Necessitatibus explicabo aperiam illum."}}/>
            {/each}
    {/await}
</main>