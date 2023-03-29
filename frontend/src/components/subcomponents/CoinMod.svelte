<script lang="ts">
    import type { Coin } from "../../interfaces/Coin";
    import type { Category, TagInterface } from "../../interfaces/Tags";
    import { UploadCoin, UploadTag } from "../../services/dbCoin";
    import { Delete, Get, Patch, Post } from "../../services/dbQueries";
    import { UploadImage } from "../../services/fileService";
    import {Token} from '../../stores';
    import ErrorAlert from "./ErrorAlert.svelte";
    export let Coin:Coin;
    let headfile:FileList;
    let tailfile:FileList;
    let categoriesPromise = Get($Token.token, 'tagcategories') as Promise<Category[]>;
    let toBeDeleted:TagInterface[] = [];
    let newTags: TagInterface[] = [];
    let newID:number;
    let tagdescription:string;
    let Error = {
        text: "",
        id: "",
        error: false
    }
    let errorsvelte:ErrorAlert;

    function ResetTags(){
        toBeDeleted = [];
        toBeDeleted = toBeDeleted;
        newTags = [];
        newTags = newTags;
    }
    function AddTag(cat:Category){
        newTags = [...newTags, {
            ID: Coin.tags.length*10,
            coinID: Coin.ID,
            color: cat.color,
            description: tagdescription, 
            name: cat.name,
            categoryID: cat.ID,
        }]
        console.log(newTags);
    }
    async function CommenceMod(){
        await Promise.all(toBeDeleted.map(e=>Delete($Token.token, 'cointags', 'ID', e.ID))).then(res=>res);
        await Promise.all(newTags.map(e=>UploadTag({coinID: e.coinID, description: e.description, nameID:e.categoryID}, $Token.token))).then(res=>res);
        let potheadfile: undefined|string = undefined;
        let pottailfile: undefined|string = undefined;
        if (headfile && headfile.length>0){
            let form = new FormData();
            form.append('image', headfile[0]);
            potheadfile = await UploadImage($Token.token, form).then(res=>res.filename);
        }
        if (tailfile && tailfile.length>0){
            let form = new FormData();
            form.append('image', tailfile[0]);
            pottailfile = await UploadImage($Token.token, form).then(res=>res.filename);
        }
        let update = await Patch($Token.token, 'coins', 'ID', Coin.ID, {
            name:Coin.name,
            worth:Coin.worth,
            description:Coin.description,
            headfile: potheadfile,
            tailfile: pottailfile
        }).then(res=>res);
        if (update.affectedRows>0){
            seterror('success', 'Sikeres módosítás', false);
        }
    }

    function seterror(iD:string, message:string, isError:boolean){
        Error = {
            id: iD,
            text: message,
            error: isError
        }
        errorsvelte.showError();
    }


    function DeleteNewTag(index:number){
        newTags.splice(index, 1);
        newTags = newTags;
    }
    function DeleteTag(tag:TagInterface, index:number){
        toBeDeleted = [...toBeDeleted, tag];
    }
</script>
<style lang="sass">
    .btn-danger
        background: var(--bs-danger) !important
    .tag
        background-color: var(--bg)
        padding: 0.25rem
        border-radius: 0.25rem
    .removetag
        background: none
        border: 0
    #tags
        display: flex        
        flex-flow: row wrap
        justify-content: flex-start
        .tag
            margin-left: 0.25rem
</style>

<div class="modal fade" id="CoinMod" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{Coin.name} | Módosítás</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <ErrorAlert bind:this={errorsvelte} {Error} />
            <div class="mb-3">
                <label for="name" class="form-label">Név</label>
                <input type="text" class="form-control" name="name" bind:value={Coin.name}>
            </div>
            <div class="mb-3">
                <label for="worth" class="form-label">Becsült érték</label>
                <input type="number" min="0" step="5" class="form-control" name="worth" bind:value={Coin.worth}>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Leírás</label>
                <textarea name="description" class="form-control" bind:value={Coin.description}></textarea>
            </div>
            <hr>
            <h4>Címkék</h4>
            
            {#await categoriesPromise then categories}
            <select name="tagtype" class="form-select" bind:value={newID}>
                    {#each categories as category}
                        <option value={category.ID}>{category.name}</option>
                    {/each}
            </select>
            <input type="text" name="tagname" bind:value={tagdescription} class="form-control">
            <input type="button" class="btn" value="Hozzáadás" on:click={()=>AddTag(categories.find(e=>e.ID==newID))}>
            <input type="button" class="btn" value="Reset" on:click={ResetTags}>
            {/await}
            <div id="tags">
                {#each Coin.tags as tag, i}
                    {#if !toBeDeleted.find(e=>e.ID==tag.ID)}
                    <div class="tag" style={`--bg:${tag.color}`}>
                        <span>{tag.name}: {tag.description}</span>
                        <button class="removetag" on:click={()=>DeleteTag(tag, i)}><i class="bi bi-x-lg"></i></button>
                    </div>
                    {/if}
                {/each}
                {#each newTags as tag, i}
                <div class="tag" style={`--bg:${tag.color}`}>
                    <span>{tag.name}: {tag.description}</span>
                    <button class="removetag" on:click={()=>DeleteNewTag(i)}><i class="bi bi-x-lg"></i></button>
                </div>
                {/each}
            </div>
            <hr>
            <div class="mb-3">
                <label for="headfile" class="form-label">Fej képe</label>
                <input type="file" class="form-control" name="headfile" bind:files={headfile}>
            </div>
            <div class="mb-3">
                <label for="tailfile" class="form-label">Írás képe</label>
                <input type="file" class="form-control" name="headfile" bind:files={tailfile}>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger">Törlés</button>
            <button type="button" class="btn btn-secondary" on:click={CommenceMod}>Módosítás</button>
        </div>
      </div>
    </div>
  </div>
  