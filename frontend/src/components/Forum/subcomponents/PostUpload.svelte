<script lang="ts">
    import type {uploadData} from '../../../interfaces/Forum';
    import type { Topic } from "../../../interfaces/Forum";
    import {db} from '../../../services/dbForum';
    import { UploadImage } from "../../../services/fileService";
    import { Token, userPerms } from "../../../stores";
    export let data:uploadData;
    export let Topics:Topic[];
    async function Upload(){
        let upload = new FormData();
        upload.append('image', data.file);
        console.log(filledForm());
        if (filledForm()){
            if (data.file){
                console.error('file cannot be uploaded yet!');
            }
            else{
                console.log(await db.UploadPost($Token.token, {
                    description:data.description,
                    title:data.title,
                    topicID:data.topicID,
                    userID:$userPerms.id
                }));
            }
        }
        //console.log((await UploadImage($Token.token, upload)));
    }
    function filledForm(){
        return (data.description!=undefined&&data.title!=undefined&&data.topicID!=undefined) && (data.description!="" && data.title!=""&&(data.topicID>0&&data.topicID!=null));
    }
</script>
<style lang="sass">
    button
        background: #ea9e60
        border: 1px solid black
    button:hover
        background: #ea9e60
        border: 1px solid black
    textarea
        resize: none
</style>


<!-- Modal -->
<div class="modal fade" id="ForumUpload" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Bejegyzés írása</h1>
          <input type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
            <form action="">
                <div class="mb-3">
                    <label for="title" class="form-label">Bejegyzés címe</label>
                    <input type="text" bind:value={data.title} class="form-control" id="title" name="title" >
                </div>
                <div class="mb-3">
                    <label for="text">Tartalom</label>
                    <textarea class="form-control" bind:value={data.description} id="text" rows="5"></textarea>
                </div>
                <div class="mb-3">
                    <label for="forum">Fórum kiválasztása</label>
                    <select bind:value={data.topicID} class="form-select" id="forum" >
                        <option selected value={null}>Válasszon fórumot!</option>
                        {#each Topics as topic}
                            <option value={topic.ID}>{topic.name}</option>
                        {/each}
                    </select>
                </div>
                <input class="form-control mb-3" bind:value={data.file} name="file"  type="file" id="file">
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" on:click={Upload}>Közzététel</button>
        </div>
      </div>
    </div>
  </div>
  