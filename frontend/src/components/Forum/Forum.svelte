<script lang="ts">
    import { onMount } from "svelte";
    import { db } from "../../services/dbForum";
    import { Token } from "../../stores";
    import PostUpload from "./subcomponents/PostUpload.svelte";
    let Forum = db.GetForums($Token.token);
    //Get every topic for the user
    function ChangeTopic() {
        Forum = db.GetForums($Token.token);
    }
    onMount(async()=>{
        console.log(await db.GetForums($Token.token).then(res=>res));
    })
</script>

<main>
{#await Forum}
    <!--{:then TopicData}
        <PostUpload on:upload={ChangeTopic} data={{ topicID: topicID }} Topics={TopicData} />
        <div class="d-flex justify-content-between mx-auto col-lg-8 col-md-8 col-11 mb-3">
            <div/>
            <h1>
                <select bind:value={topicID} on:change={ChangeTopic}>
                    {#each TopicData as topic}
                        <option value={topic.ID}>{topic.name} </option>
                    {/each}
                </select>
            </h1>
            <button class="btn" data-bs-toggle="modal" data-bs-target="#ForumUpload"><i class="bi bi-plus-lg" /></button>
        </div>
        <div id="contentholder" class="col-lg-8 col-md-8 col-11 mx-auto mb-3 p-3">
        {#await Posts}
            <div class="spinner-border" />
        {:then PostData}
            {#if PostData.filter(e=>!e.isDeleted).length>0}
            <table>
                <tbody>
                    {#each PostData.sort((a,b)=>new Date(a.startingdate).getTime()+new Date(b.startingdate).getTime()) as post}
                        {#if !post.isDeleted}
                            <tr>
                                <td><a class={post.isClosed?"text-success" : ""} href={`/forums/${post.postID}`}>{post.title}{#if post.isClosed}<i class="bi bi-check"/>{/if}</a></td>
                                <td><span>{new Date(post.startingdate).toLocaleDateString("hu-HU")}</span></td>
                                <td><a href={`/profile/${post.userID}`} class="d-none d-md-block">{post.username}</a></td>
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
            {:else}
                <h2 class="text-center">Ebben a fórumtémában még nincs bejegyzés!</h2>
            {/if}
        {:catch Error}
            <div>{Error}</div>
                {/await}
        </div>
            
    {:catch Err}
        <div>{Err}</div>-->
    {/await}
</main>

<style lang="sass">
    #contentholder
        border:1px solid black
        border-radius:0.25rem
        background-color: #ffcc95
    .btn
        background-color: #e99d60
    select
        border: none
        background-color: white
        text-align: center
        border-bottom: 1px solid black
    table
        width: 100%
    tr
        border-bottom: 1px solid gray
        td
            padding-bottom: 0.5rem
            padding-top: 0.5rem
            margin-bottom: 0.25rem
            margin-top: 0.25rem
            text-align: center
        td:first-of-type
            text-align: left
        td:last-of-type
            text-align: right
    tr:last-of-type
        border: none
</style>
