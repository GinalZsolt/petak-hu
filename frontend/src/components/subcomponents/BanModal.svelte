<script lang="ts">

export let User:any={}
import ErrorAlert from "./ErrorAlert.svelte";

let err1
function Ban(){
  if (User.datum==undefined){
    err1.showError()
  }
}

</script>

<style lang="sass">
  .btn
        background-color: #ea9e60
</style>

<!-- Modal -->

<div class="modal fade" id="Ban" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">{User.name} felhasználó kitiltása</h1>
        <input type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
      </div>
      <div class="modal-body">
        <ErrorAlert bind:this={err1} Error={{id:"nodate",text:"Nem adtál meg dátumot!",error:true}}/>
            <form action="">
              <div class="mb-3">
                <label for="username" class="form-label">Felhasználó név</label>
                <input type="text" bind:value={User.name} disabled class="form-control" id="username" name="username" >
              </div> 
              <div class="mb-3">
                <label for="email" class="form-label">Email cím</label>
                <input type="email" bind:value={User.email} disabled class="form-control" id="email" name="email" >
              </div>
              <div class="mb-3">
                <label for="datum" class="form-label">Felfüggesztés lejáratának dátuma</label>
                <input type="date" bind:value={User.datum} class="form-control" id="datum" name="datum" >
              </div>
            </form>
          </div>
          <div class="modal-footer">
          <button type="button" on:click={()=>{Ban()}} class="btn">Felfüggesztés</button>
        </div>
      </div>
    </div>
  </div>
  