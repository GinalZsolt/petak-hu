<script lang="ts">
    //majd adatbázisból kell lekérni
    let forums:any=[
        {value:"azonositas",Text:"Érmeazonosítás"},
        {value:"becsles",Text:"Értékbecslés"},
        {value:"egyeb",Text:"Egyéb"}
    ]

    let data:any={}
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
                    <textarea class="form-control" bind:value={data.text} id="text" rows="5"></textarea>
                </div>
                <div class="mb-3">
                    <label for="forum">Fórum kiválasztása</label>
                    <select bind:value={data.selectedforum} class="form-select" id="forum" >
                        <option selected value={null}>Válasszon fórumot!</option>
                        {#each forums as forum}
                            <option value={forum.value}>{forum.Text}</option>
                        {/each}
                    </select>
                </div>
                <input class="form-control mb-3" bind:value={data.file} name="file"  type="file" id="file">
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn">Közzététel</button>
        </div>
      </div>
    </div>
  </div>
  