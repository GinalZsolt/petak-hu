<script lang="ts">
    import { db } from "../../services/dbForum";
    import { Token } from "../../stores";
    import type { Topic } from "../../interfaces/Forum";
    import PostUpload from "./subcomponents/PostUpload.svelte";
    import { onMount } from "svelte";
    let Forum = db.GetForums($Token.token);
    let Topics:Topic[] = [];
    onMount(async ()=>{
        Topics = await db.GetForums($Token.token);
    })
    let topicID = -1;
</script>

<main>
{#await Forum}
    <div class="spinner-border"></div>
{:then Data}
    <div class="d-flex flex-row flex-wrap col-lg-7 col-md-8 col-11 mx-auto mt-5 justify-content-between align-items-center">
        <div/>
        <select class="form-select" bind:value={topicID}>
        {#if topicID == -1}
            <option value={topicID} disabled selected>Válasszon témát!</option>
            {/if}
                {#each Data as topic}
                    <option value={topic.ID}>{topic.name}</option>
                {/each}
        </select>
        <button type="button" title="Bejegyzés feltöltése" class="btn btn-add" data-bs-target="#ForumUpload" data-bs-toggle="modal"><i class="bi bi-plus"></i></button>
        </div> 
        <div class="posts">
        {#if Data.find(e=>e.ID==topicID)}
            {
            @const Posts = Data.find(e=>e.ID==topicID).posts.sort((a,b)=>
                                        (new Date(a.date)).getTime() + (new Date(b.date)).getTime())
                                        .filter(m=>m.isDeleted==false)
            }
                <div class="col-lg-7 col-md-8 col-11 mx-auto mt-3 table-responsive">
                {#if Posts.length>0}
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Lezárva</th>
                            <th>Cím</th>
                            <th>Dátum</th>
                            <th>Felhasználó</th>
                        </tr>
                    </thead>
                    <tbody>
                    {#each Posts as post}
                        {#if post.isDeleted==false}
                        <tr>
                            <td>
                                <i
                                    class="bi"
                                    class:bi-check-circle={post.isClosed}
                                    class:bi-dash-circle-dotted={!post.isClosed}
                                />
                            </td>
                            <td><a href={'/forums/'+post.ID}>{post.title}</a></td>
                            <td>{new Intl.DateTimeFormat('hu-HU').format(new Date(post.date))}</td>
                            <td><a href={'/profile/'+post.userID}>{post.username}</a></td>
                        </tr>
                        {/if}
                    {/each}
                    </tbody>
                    </table>
                    {:else}
                    <h2>
                        Ebben a fórumtémában még nincs bejegyzés, de 
                        <span class="link-primary"
                        data-bs-target="#ForumUpload"
                        data-bs-toggle="modal">hozzáadhat egyet!</span>
                    </h2>
                    {/if}
                </div>
            {:else}
            <h2 class="text-center mt-5">Kérem válasszon egy fórumtémát!</h2>
            {/if}
        </div>
    {/await}
    <PostUpload Topics={Topics} data={{topicID: topicID}} on:upload={()=>{Forum = db.GetForums($Token.token) }} />
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
</style>
