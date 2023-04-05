<script lang="ts">
  import { onMount } from "svelte";
  import { Post } from "../../services/dbQueries";
  import { GetBanned } from "../../services/dbUser";
  import { Token } from "../../stores";
  import ErrorAlert from "./ErrorAlert.svelte";

  export let User:any={}
  let err:ErrorAlert;
  let Error = {
    text: "",
    id: "",
    error: false
  }
  let alreadybanned
  function ErrorShow(text:string, id:string, error:boolean){
    Error = {
      text: text,
      id: id,
      error: error
    }
    err.showError();
  }
  function Ban(){
    if (User.datum==undefined || new Date(User.datum).getTime()<new Date().getTime()){
      ErrorShow("Kérem adjon egy érvényes dátumot!", "nodate", true);
    }
    else{
      Post($Token.token,"moderations",{userID:User.ID,banTime:User.datum}).then((res) => {
        ErrorShow("Sikeres kitiltás!", "success", false);
        alreadybanned=true
      })
    }
  }

  onMount(async ()=>{
    await GetBanned($Token.token).then(
     (res)=>{
      res.forEach(element => {
      if (element.userID==User.ID && new Date().getTime() < new Date(element.banTime).getTime()){
        ErrorShow("Ez a felhasználó már ki van tiltva!", "alreadybanned", true);
        alreadybanned=true
      }
    });
     } 
    )
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
        <ErrorAlert bind:this={err} {Error} />
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
  