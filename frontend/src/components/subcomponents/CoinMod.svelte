<script lang="ts">
    import { Delete, Patch, Get, Post } from "../../services/dbQueries";
    import {userPerms, Token} from './../../stores';
    import type { Coin } from "../../interfaces/Coin";
    import { onMount } from "svelte";
    import type { TagInterface } from "../../interfaces/Tags";

    let tagdel:boolean=true;
    export let Coin:Coin | undefined={
        ID: 0,
        name:"",
        worth: 0,
        description: "",
        headfile: "",
        tailfile: "",    
        userID: 0,
        uploadDate: ""
    };
    let newtag:TagInterface={
        description:"",
        name:"",
        color:"",
        Category:"",
        CoinID:Coin.ID
    };
    let category:any=[];

    let tags: TagInterface[]=[];

    async function DelCoin(ID){
        await Delete($Token.token, "coins", "ID", `${ID}`).then(r=>console.log(r));
    }

    async function UpdateCoin(ID){
       await Patch($Token.token, "coins", "ID", ID, Coin).then(r=>console.log(r));
    }
    
    async function GetTags() {
        let tagsarray: any[];
        await Get($Token.token, "cointags", "coinID", Coin.ID).then((res)=> console.log(res));
        return tagsarray;
    }

    async function GetCategories(){
        await await Get($Token.token, "tagcategories").then((res)=> {category=res; category = category});
    }

    function addTag(){
        let tag:TagInterface={
            Category:category[Number(newtag.Category)-1].name,
            description:newtag.description,
            CoinID:Coin.ID,
            name:Coin.name, 
            color:category[Number(newtag.Category)-1].color
        };
        tags.push(tag);
        tags=tags;
        tagdesup(tag);
    }

    async function tagdesup(tag: TagInterface) {
        let desID:Number;       //TODO
        await await Post($Token.token, "tagdescriptions", {description: tag.description}).then((res)=>desID=res.insertId);
    //     tagup(tag, desID);
    }

    // async function tagup(tag: TagInterface, desID: Number) {
    //     await await Post($Token.token, "cointags", {coinID: tag.CoinID, nameID: gettagID(tag.Category), descID: desID}).then((res)=>console.log(res));

    // }

    // function gettagID(categoryname: String){
    //     for (let i = 0; i < category.length; i++) {
    //         if(category[i].name ==  categoryname) return category[i].ID; 
    //     }
    //     return 0;
    // }

    function DeleteTag(del){
        tags.splice(tags.findIndex(e=>e.name==del.name&&e.description==del.description),1)
        tags=tags
    }

    onMount(async()=>{
        await GetCategories();
        category = category;
        // tags = await GetTags();
        // tags = tags;
    });

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
    .tag-creator
        border: 2px solid black
        border-radius:0.25rem
        padding: 7px
    .tag
        background: var(--color)
        border-radius:0.5rem
        padding: 5px
        border: 1px solid black
    .modal-header
        background-color: #f59445
        background-image: linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))  
</style>


<!-- Modal -->
<div class="modal fade" id="CoinMod" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Érme módosítása</h1>
          <input type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
            <form action="">
                
                <div class="mb-3">
                    <label for="name" class="form-label">Érme neve</label>
                    <input type="text" bind:value={Coin.name} class="form-control" id="name" name="name" >
                </div>
                <div class="mb-3">
                    <label for="description">Leírás</label>
                    <textarea class="form-control" bind:value={Coin.description} id="description" rows="5"></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Érme névleges értéke</label>
                    <input type="number" bind:value={Coin.worth} class="form-control" id="price" name="price" >
                </div>
                <div class="tag-creator row mb-3 col-12 mx-auto" >
                    <div class="col-5">
                        <label for="tagtype" class="form-label">Címke kategóriája</label>
                        <select bind:value={newtag.Category} class="form-select" name="tagtype" id="tagtype">
                            <option selected value={null}></option>
                            {#if category!=undefined}
                                 {#each category as tagtype}
                                    <option value={tagtype.ID}>{tagtype.name}</option>
                                {/each} 
                            {/if}
                        </select>
                    </div>
                    <div class="col-4">
                        <label for="tagcontent" class="form-label">Címke tartalma</label>
                        <input type="text" bind:value={newtag.description} class="form-control" id="tagcontent" name="tagcontent" >
                    </div>
                    <button type="button" on:click={addTag} class="btn col-3">Hozzáadás</button>
                </div>  
                <div class="tag-container d-flex flex-wrap mb-3">
                    <!-- {#each tags as tag}
                        <div style={"--color:"+tag.color} class="tag m-auto mb-1">
                            <span>{tag.Category}</span>:<span>{tag.description}</span> 
                            {#if tagdel}<input type="button" class="btn-close" on:click={()=>{DeleteTag(tag)}}>{/if} 
                        </div>
                    {/each}  -->
                </div>
                <div class=" mb-3">
                    <label for="fej">Fej:</label>
                    <input class="form-control" bind:value={Coin.headfile} name="fej"  type="file" id="fej">
                </div>
                <div class="mb-3">
                    <label for="iras">Írás:</label>
                    <input class="form-control" bind:value={Coin.tailfile} name="iras"  type="file" id="iras">
                </div>
            </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
            <input type="button" class="btn btn-danger" on:click={()=>{DelCoin(Coin.ID)}} value="Törlés">
            <button type="button" class="btn" on:click={()=>{UpdateCoin(Coin.ID)}}>Feltöltés</button>
        </div>
      </div>
    </div>
  </div>
  