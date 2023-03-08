<script lang="ts">
    import { onMount } from "svelte";
  import { Post } from "../../services/dbQueries";
    import { GetBanned } from "../../services/dbUser";
  import { Token } from "../../stores";
  import ErrorAlert from "./ErrorAlert.svelte";

  export let User:any={}

  let err1
  let err2
  let err3
  let alreadybanned

  async function Ban(){
    if (User.datum==undefined){
      err1.showError()
    }
    else{
      await Post($Token.token,"moderations",{userID:User.ID,banTime:User.datum}).then((res) => {
        err2.showError()
        alreadybanned=true
      })
    }
  }

  onMount(async ()=>{
    let banned = await GetBanned($Token.token)
    banned.forEach(element => {
      if (element.userID==User.ID){
        err3.showError()
        alreadybanned=true
      }
    });
  })

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
        <ErrorAlert bind:this={err2} Error={{id:"success",text:"Sikeresen kitiltva!",error:false}}/>
        <ErrorAlert bind:this={err2} Error={{id:"banned",text:"A felhasználó már ki van tiltva!",error:true}}/>
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
                <input type="date" bind:value={User.datum} min={new Date().toISOString().split('T')[0]} class="form-control" id="datum" name="datum" >
              </div>
            </form>
          </div>
          <div class="modal-footer">
          <button type="button" disabled={alreadybanned} on:click={()=>{Ban()}} class="btn">Felfüggesztés</button>
        </div>
      </div>
    </div>
  </div>
  