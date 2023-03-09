<script lang="ts">
    import { onMount } from "svelte";
    import { db } from "../../services/dbForum";
    import { Token } from "../../stores";
    import type { Topic } from "../../interfaces/Forum";
    import PostUpload from "./subcomponents/PostUpload.svelte";
    let Forum = db.GetForums($Token.token);
    let topics = [] as Topic[];
    let topicID = -1;
    //Get every topic for the user
    function ChangeTopic() {
        console.log(topicID);
    }
    onMount(async()=>{
        topics = await Forum;
    })
</script>

<main>
    {#await Forum}
        <div class="spinner-border"></div>
    {:then Data}
        <div class="d-flex flex-row flex-wrap col-lg-7 col-md-8 col-11 mx-auto justify-content-between align-items-center mt-3">
            <div></div>
            <select class="form-select" bind:value={topicID}>
                {#if topicID == -1}
                    <option value={topicID} disabled selected>Válasszon témát!</option>
                {/if}
                {#each Data as topic}
                    <option value={topic.ID}>{topic.name}</option>
                {/each}
            </select>
            <button type="button" class="btn btn-add" data-bs-target="#ForumUpload" data-bs-toggle="modal"><i class="bi bi-plus"></i></button>
        </div> 
        <div class="posts">
            {#if Data.find(e=>e.ID==topicID)}
                {@const Posts = Data.find(e=>e.ID==topicID).posts.sort((a,b)=>(new Date(a.date)).getTime() + (new Date(b.date)).getTime()).filter(m=>m.isDeleted==false)}
                <div class="col-lg-7 col-md-8 col-11 mx-auto mt-5">
                    {#if Posts.length>0}
                    <table>
                        <tbody>
                            {#each Posts as post}
                                {#if post.isDeleted==false}
                                <tr>
                                    <td>{#if post.isClosed==true}<i class="bi-check2-circle text-success"></i>{/if}</td>
                                    <td><a href={'/forums/'+post.ID}>{post.title}</a></td>
                                    <td>{new Intl.DateTimeFormat('hu-HU').format(new Date(post.date))}</td>
                                    <td><a href={'/profile/'+post.userID}>{post.username}</a></td>
                                </tr>
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                    {:else}
                    <h2>Ebben a fórumtémában még nincs bejegyzés, de <span class="link-primary" data-bs-target="#ForumUpload" data-bs-toggle="modal">hozzáadhat egyet!</span></h2>
                    {/if}
                </div>
            {:else}
            <h2 class="text-center mt-5">Kérem válasszon egy fórumtémát!</h2>
            {/if}
        </div>
    {/await}
    <PostUpload Topics={topics} data={{topicID: topicID}} on:upload={()=>{Forum = db.GetForums($Token.token) }} />
</main>

<style lang="sass">
    table
        width: 100%
        background-color: #ffcc95
        border: 1px solid black
    tr
        border: 1px solid #0000007f
    select
        width: initial
    .link-primary
        cursor: pointer
    .btn-add
        background-color: #ffcc95
    .btn-add:active
        background-color: #ffcc95
        box-shadow: 0 0 0 0.25rem (#ffcc957f)
</style>
