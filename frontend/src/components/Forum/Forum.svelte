<script lang="ts">
    import { onMount } from "svelte";
    import type { Forum, ForumPost } from "../../interfaces/Forum";
    import { db } from "../../services/dbForum";
    import { Token} from "../../stores";
    import PostUpload from './subcomponents/PostUpload.svelte';
    interface Topic {
        ID: number;
        name: string;
    }
    let Data: ForumPost[];
    let Topics: Topic[] = [];
    let TopicName: string;
    //Get every topic for the user
    onMount(async () => {
        Topics = await db.GetTopics($Token.token);
        topicID = Topics[0].ID;
        TopicName = await (await db.GetTopic($Token.token, topicID)).name;
        ChangeTopic();
    });
    async function refresh(){
        Topics = await db.GetTopics($Token.token);
        topicID = Topics[0].ID;
        TopicName = await (await db.GetTopic($Token.token, topicID)).name;
        ChangeTopic();
    }
    async function ChangeTopic() {
        if (topicID) {
            await db.GetForums($Token.token, topicID).then(rs=>{
                Data = rs;
                TopicName = Topics.find(e=>e.ID==topicID).name;
                console.log(Data);
            });
        }
    }
    let topicID:number|undefined;
</script>

<main>
    
    {#if topicID && Data}
    <div class="d-flex justify-content-between mx-auto col-lg-8 col-md-8 col-11 mb-3">
        <div></div>
        <h1>
            <select on:change={ChangeTopic} bind:value={topicID}>
                {#each Topics as topic}
                    <option value={topic.ID}>{topic.name} </option>
                {/each}
            </select>
        </h1>
        <button class="btn" data-bs-toggle="modal" data-bs-target="#ForumUpload"><i class="bi bi-plus-lg"></i></button>
    </div>
    <div id="contentholder" class="col-lg-8 col-md-8 col-11 mx-auto mb-3 p-3">
        {#each Data as post}
            <div class="post d-flex justify-content-between align-items-center">
                <a href={`/forums/${post.postID}`}>{post.title}</a>
                <div class="d-md-none d-flex flex-column ">
                    <span>{new Date(post.startingdate).toLocaleDateString('hu-HU')}</span>
                    <span>{post.username}</span>
                </div>
                <span class="d-none d-md-block">{new Date(post.startingdate).toLocaleDateString('hu-HU')}</span>
                <a href={`/profile/${post.userID}`} class="d-none d-md-block">{post.username}</a>
            </div>
            <hr class="w-100">
        {/each}
    </div>
    <div class="mx-auto w-100 d-flex justify-content-center">
        <div>
            <button class="btn border-dark me-2"><i class="bi bi-arrow-left" /></button> /  <button class="btn border-dark me-2"><i class="bi bi-arrow-right" /></button>
        </div>
    </div>
    {/if}
    <PostUpload on:upload={refresh} Topics={Topics} data={{topicID:topicID}}/>
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
