<script lang="ts">
    import type { Coin } from "../../interfaces/Coin";
    import type { Category, TagInterface } from "../../interfaces/Tags";
    import { Get } from "../../services/dbQueries";
    import {Token} from '../../stores';
    export let Coin:Coin;
    let headfile:FileList;
    let tailfile:FileList;
    let categoriesPromise = Get($Token.token, 'tagcategories') as Promise<Category[]>;
    let toBeDeleted:TagInterface[] = [];
    let newID:number;
    function ResetTags(){
        Coin.tags = [...Coin.tags, ...toBeDeleted];
        toBeDeleted = [];
        toBeDeleted = toBeDeleted;
    }
    function AddTag(){

    }
    function CommenceMod(){
        console.log(Coin);
    }
    function DeleteTag(tag:TagInterface, index:number){
        toBeDeleted = [...toBeDeleted, tag];
        Coin.tags.splice(index, 1);
        Coin.tags = Coin.tags;
        console.log(toBeDeleted, Coin.tags);
    }
</script>
<style lang="sass">
    .btn-danger
        background: var(--bs-danger) !important
    .tag
        background-color: var(--bg)
        padding: 0.25rem
        border-radius: 0.25rem
    #addtag
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
            
            <select name="tagtype" class="form-select" bind:value={newID}>
                {#await categoriesPromise then categories}
                    {#each categories as category}
                        <option value={category.ID}>{category.name}</option>
                    {/each}
                {/await}
            </select>
            <input type="text" name="tagname" class="form-control">

            <input type="button" class="btn" value="Hozzáadás" on:click={AddTag}>
            <input type="button" class="btn" value="Reset" on:click={ResetTags}>
            <div id="tags">
                {#each Coin.tags as tag, i}
                <div class="tag" style={`--bg:${tag.color}`}>
                    <span>{tag.name}: {tag.description}</span>
                    <button id="addtag" on:click={()=>DeleteTag(tag, i)}><i class="bi bi-x-lg"></i></button>
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
  