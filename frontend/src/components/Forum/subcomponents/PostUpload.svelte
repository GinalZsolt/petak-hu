<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import type {uploadData} from '../../../interfaces/Forum';
    import type { Topic } from "../../../interfaces/Forum";
    import {db} from '../../../services/dbForum';
    import { UploadImage } from "../../../services/fileService";
    import { Token, userPerms } from "../../../stores";
    interface ErrorMessage{
        text:string;
        type:string;
    }
    export let data:uploadData;
    export let Topics:Topic[];
    let gotError = false;
    let error:ErrorMessage = {} as ErrorMessage;
    let dispatch = createEventDispatcher();
    async function Upload(){
        if (filledForm()){
            if (data.file){
                let upload = new FormData();
                console.log(data.file[0]);
                upload.append('image', data.file[0]);
                await (UploadImage($Token.token, upload)).then(dt=>{
                    if (dt.status){
                        ShowError("A Fájl rossz!", "danger");
                    }
                    else{
                        db.UploadPost($Token.token, {
                            description:data.description,
                            title:data.title,
                            topicID:data.topicID,
                            userID:$userPerms.id,
                            imagefile:dt.filename
                        }).then(rs=>{ if (rs.insertId>0){
                            data = {} as uploadData;
                            ShowError('Sikeres feltöltés!', 'success');
                            dispatch('upload')
                        }});
                    }
                });
            }
            else{
                if ((await db.UploadPost($Token.token, {
                    description:data.description,
                    title:data.title,
                    topicID:data.topicID,
                    userID:$userPerms.id
                })).insertId>0){
                    data = {} as uploadData;
                    ShowError('Sikeres feltöltés!', 'success');
                    dispatch('upload');
                }
            }
        }
        else{
            ShowError("Nem töltött ki minden kötelező adatot! (Cím, leírás, fórumtéma)!", "danger");
        }
    }
    function ShowError(text:string, type:string){
        error.text = text;
        error.type = type;
        gotError = true;
    }
    function DismissError(){
        gotError = false;
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
    #alertbtn
        border: none
        background: none
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
            {#if gotError}
                <div class={`alert alert-${error.type} alert-dismissible fade show`}><span>{error.text}</span><button type="button" class="btn-close" id="alertbtn" on:click={DismissError} data-bs-dismiss="alert" aria-label="Close"><i class="bi bi-x-lg"></i></button></div>
            {/if}
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Bejegyzés címe</label>
                    <input type="text" bind:value={data.title} class="form-control" id="title" name="title" >
                </div>
                <div class="mb-3">
                    <label for="text">Tartalom</label>
                    <textarea class="form-control" bind:value={data.description} id="text"></textarea>
                </div>
                <div class="mb-3">
                    <label for="forum">Fórum kiválasztása</label>
                    <select bind:value={data.topicID} class="form-select" id="forum" >
                        <option selected value="-1">Válasszon fórumot!</option>
                        {#each Topics as topic}
                            <option value={topic.ID}>{topic.name}</option>
                        {/each}
                    </select>
                </div>
                <input class="form-control mb-3" bind:files={data.file} name="file"  type="file" id="file">
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" on:click={Upload}>Közzététel</button>
        </div>
      </div>
    </div>
  </div>
  