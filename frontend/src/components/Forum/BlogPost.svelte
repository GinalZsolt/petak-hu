<script lang="ts">
    import CommentSvelte from "./subcomponents/Comment.svelte";
    import {db} from '../../services/dbForum';
    import {Token, userPerms} from '../../stores';
    import { router } from "tinro";
    let ID:number = Number(router.meta().params.id);
    let Comments = db.GetPostsComments($Token.token, ID);
    let Posts = db.GetBlogpost($Token.token, ID);
    let newMessage:string;
    function RefreshComments(){
        Comments = db.GetPostsComments($Token.token, ID);
    }
    function DeletePost(){
        db.DeletePost($Token.token, ID).then(()=>{
            Posts = db.GetBlogpost($Token.token, ID);
        })
    }
    function FinishPost(){
        db.ClosePost($Token.token, ID).then(()=>{Posts = db.GetBlogpost($Token.token, ID)});
    }
    function SendComment(){
        if (newMessage!=undefined && newMessage!=""){
            db.UploadComment($Token.token, {
                message: newMessage,
                postID: ID,
                userID: $userPerms.id,
                date: new Date().toISOString()
            }).then(()=>{RefreshComments()});
            newMessage = "";
        }
    }
</script>
<style lang="sass">
    #backbtn, #newcomment, #post, #newcomment button
        background-color: #ffcc95
    #newcomment
        border:1px solid black
        border-radius:0.25rem
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
        padding:10px
    #post_image
        width:50%
        margin-left: auto
    #backbtn
        border: 1px solid var(--bs-dark)
</style>
<main>
    {#await Posts}
        <div class="spinner-border m-auto"></div>
    {:then Data}
        {#if Data[0].isDeleted}
            <div class="mt-3 alert alert-dismissible alert-warning col-lg-8 col-md-8 col-11 mx-auto"><i class="bi bi-exclamation-circle"></i> Ez a poszt törölve lett! <i class="bi bi-x-lg" data-bs-dismiss="alert"></i></div>
        {/if}    
        {#if Data[0].isClosed}
            <div class="mt-3 alert alert-dismissible alert-primary col-lg-8 col-md-8 col-11 mx-auto"><i class="bi bi-exclamation-circle"></i> Ez a poszt le van zárva, így kommentet írni erre a posztra nem lehet! <i class="bi bi-x-lg" data-bs-dismiss="alert"></i></div>
        {/if}
        <div class="d-flex flex-row justify-content-between col-lg-8 col-md-8 col-11 mx-auto my-2">
            <a href="/forums" id="backbtn" class="btn"><i class="bi bi-arrow-left"></i></a>
            <div/>
            <div>
                {#if Data[0].userID == $userPerms.id || $userPerms.permission == 2}
                    {#if !Data[0].isDeleted}
                        <button class="btn btn-danger" on:click={DeletePost}><i class="bi bi-trash"></i></button>
                    {/if}
                    {#if !Data[0].isClosed && !Data[0].isDeleted}
                        <button class="btn btn-success" on:click={FinishPost}><i class="bi bi-check"></i></button>
                    {/if}
                {/if}
            </div>
        </div>
        <div id="post" class="col-lg-8 col-md-8 col-11 mx-auto d-flex flex-row justify-content-between">
            <div>
                <h2>{Data[0].title}</h2>
                <div id="authorinfo">
                    <span>{Data[0].userID} - {new Intl.DateTimeFormat('hu-HU').format(new Date(Data[0].date))}</span>
                </div>
                <p>{Data[0].description}</p>
            </div>
            <div>
                {#if Data[0].imagefile}
                <img src="http://localhost:8080/img/{Data[0].imagefile}" id="post_image" class="img-fluid" alt="kép">
                {/if}
            </div>
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
        {#if !Data[0].isClosed && !Data[0].isDeleted}
            <div id="newcomment" class=" col-lg-8 col-md-8 col-11 mx-auto mt-3">
                <div class="input-group">
                    <input type="text" name="message" id="message" class="form-control" bind:value={newMessage}>
                    <button type="button" class="btn input-group-text" disabled={newMessage==undefined} on:click={SendComment}><i class="bi bi-send"></i></button>
                </div>
            </div> 
        {/if}
        {#await Comments}
        <div class="spinner-border"></div>
            {:then CommentsData} 
                {#each CommentsData.sort((a,b)=>new Date(a.date).getTime()+new Date(b.date).getTime()) as comment}
                    <CommentSvelte Data={{username:comment.username,date:comment.date,text:comment.message, userID:comment.userID}}/>
                {/each}
        {/await}
    {/await}
</main>