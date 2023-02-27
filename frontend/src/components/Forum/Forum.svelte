<script lang="ts">
    import { onMount } from "svelte";
    import type { Forum, ForumPost } from "../../interfaces/Forum";
    import { db } from "../../services/dbForum";
    import { Token } from "../../stores";
    import { fade } from "svelte/transition";
    import PostUpload from "./subcomponents/PostUpload.svelte";
    interface Topic {
        ID: number;
        name: string;
    }
    let topicID = 1;
    let Posts = db.GetForums($Token.token, topicID);
    let Topics = db.GetTopics($Token.token);
    //Get every topic for the user
    function ChangeTopic() {
        Posts = db.GetForums($Token.token, topicID);
    }
</script>

<main>
{#await Topics}
    {:then TopicData}
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
                {#each PostData as post}
                    <div in:fade="{{duration:100}}" out:fade="{{duration:100}}" class="post d-flex justify-content-between align-items-center">
                        <a href={`/forums/${post.postID}`}>{post.title}</a>
                        <div class="d-md-none d-flex flex-column ">
                            <span>{new Date(post.startingdate).toLocaleDateString("hu-HU")}</span>
                            <span>{post.username}</span>
                        </div>
                        <span class="d-none d-md-block">
                            {new Date(post.startingdate).toLocaleDateString("hu-HU")}
                        </span>
                        <a href={`/profile/${post.userID}`} class="d-none d-md-block">{post.username}</a>
                    </div>
                    <hr class="w-100 mb-0" />
                {/each}
                {:catch Error}
                <div>{Error}</div>
                {/await}
            </div>
            
    {:catch Err}
        <div>{Err}</div>
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

</style>
