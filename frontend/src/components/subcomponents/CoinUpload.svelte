<script lang="ts">
    //majd adatbázisból kell lekérni
    let tagtypes:any=[
        {name:"Anyag",ID:0},
        {name:"Dinasztia",ID:1},
        {name:"Birodalom/Ország",ID:2},
        {name:"Kor",ID:3}
    ]

    let tagdel:boolean=true;

    let data:any={}
    let newtag:any={}

    let tags:any=
    [
        {ID:1,category:"Anyag",content:"bronz"},
        {ID:2,category:"Anyag",content:"bronz"},
        {ID:3,category:"Anyag",content:"bronz"},
        {ID:4,category:"Anyag",content:"bronz"},
        {ID:5,category:"Anyag",content:"bronz"},
        {ID:6,category:"Anyag",content:"bronz"},
        {ID:7,category:"Anyag",content:"bronz"},
        {ID:8,category:"Anyag",content:"bronz"}
    ]

    function Delete(delid){

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
    .tag-creator
        border: 2px solid black
        border-radius:0.25rem
        padding: 7px
    .tag
        background: #ea9e60
        border-radius:0.5rem
        padding: 5px
        border: 1px solid black
</style>


<!-- Modal -->
<div class="modal fade" id="CoinUpload" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Érme feltöltése</h1>
          <input type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
            <form action="">
                
                <div class="mb-3">
                    <label for="name" class="form-label">Érme neve</label>
                    <input type="text" bind:value={data.name} class="form-control" id="name" name="name" >
                </div>
                <div class="mb-3">
                    <label for="description">Leírás</label>
                    <textarea class="form-control" bind:value={data.description} id="description" rows="5"></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Érme névleges értéke</label>
                    <input type="number" bind:value={data.price} class="form-control" id="price" name="price" >
                </div>
                <div class="tag-creator row mb-3 col-12 mx-auto" >
                    <div class="col-5">
                        <label for="tagtype" class="form-label">Címke kategóriája</label>
                        <select bind:value={newtag.category} class="form-select" name="tagtype" id="tagtype">
                            <option selected value={null}></option>
                            {#each tagtypes as tagtype}
                                <option value={tagtype.ID}>{tagtype.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="col-4">
                        <label for="tagcontent" class="form-label">Címke tartalma</label>
                        <input type="text" bind:value={newtag.content} class="form-control" id="tagcontent" name="tagcontent" >
                    </div>
                    <button type="button" class="btn col-3">Hozzáadás</button>
                </div>  
                <div class="tag-container d-flex flex-wrap mb-3">
                    {#each tags as tag}
                        <div class="tag m-auto mb-1"><span>{tag.category}</span>:<span>{tag.content}</span> {#if tagdel}<input type="button" class="btn-close" on:click={()=>{Delete(tag.ID)}}>{/if} </div>
                    {/each}
                </div>
                <div class=" mb-3">
                    <label for="fej">Fej:</label>
                    <input class="form-control" bind:value={data.heads} name="fej"  type="file" id="fej">
                </div>
                <div class="mb-3">
                    <label for="iras">Írás:</label>
                    <input class="form-control" bind:value={data.tails} name="iras"  type="file" id="iras">
                </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn">Feltöltés</button>
        </div>
      </div>
    </div>
  </div>
  